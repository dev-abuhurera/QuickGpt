import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { Link, useLocation } from 'react-router-dom'
import Modal from './Modal'

const Sidebar = () => {
  const { user, chats, setChats, selectedChat, setSelectedChat, backendUrl, logout, toggleTheme, addNotification } = useAppContext()
  const location = useLocation()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const createNewChat = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${backendUrl}/api/chats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title: 'New Chat' })
      })
      const data = await res.json()
      if (res.ok && data.result) {
        setChats(prev => [data.result, ...prev])
        setSelectedChat(data.result)
        addNotification('Session Prepared')
      } else {
        addNotification(data.message || 'Node failure')
      }
    } catch (error) {
      console.error(error)
      addNotification('Infrastructure error')
    }
  }

  const deleteChat = async (id, e) => {
    e.stopPropagation()
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${backendUrl}/api/chats/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        setChats(prev => prev.filter(c => c._id !== id))
        if (selectedChat?._id === id) setSelectedChat(null)
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (!user) return null

  return (
    <div className='w-80 glass-sidebar flex flex-col p-8 h-full relative z-20'>
      {/* Branding */}
      <div className='mb-12 flex items-center gap-4 px-2'>
        <div className='w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30'>
             <span className='text-white font-black text-xl'>Q</span>
        </div>
        <div>
            <h1 className='text-xs font-black uppercase tracking-[0.3em] text-white'>QuickGpt</h1>
            <span className='text-[8px] font-black uppercase tracking-[0.4em] text-purple-400 opacity-80'>Premium AI</span>
        </div>
      </div>

      {/* Main Actions */}
      <div className='mb-10'>
        <button 
            onClick={createNewChat}
            className='w-full btn-3d'
        >
            + New Chat
        </button>
      </div>

      {/* Sessions Container */}
      <div className='flex-1 flex flex-col min-h-0 mb-8'>
        <div className='flex items-center justify-between mb-4 px-2'>
          <span className='text-[9px] uppercase tracking-[0.3em] text-gray-500 font-black'>Infrastructure Nodes</span>
          <span className='text-[9px] bg-white/5 px-2.5 py-1 rounded-full border border-white/10 text-gray-400 font-bold'>{chats.length}</span>
        </div>
        
        <div className='flex-1 sidebar-history-box flex flex-col overflow-hidden'>
          <div className='flex-1 overflow-y-auto space-y-1.5 custom-scrollbar'>
              {chats.length === 0 && (
                  <div className='py-16 px-4 text-[9px] text-gray-600 font-black uppercase tracking-widest text-center opacity-40'>
                      No Sessions Active
                  </div>
              )}
              {chats.map((chat) => (
              <div
                  key={chat._id}
                  onClick={() => setSelectedChat(chat)}
                  className={`group px-5 py-4 rounded-2xl cursor-pointer flex justify-between items-center transition-all duration-500 ${
                  selectedChat?._id === chat._id 
                      ? 'sidebar-item-active' 
                      : 'hover:bg-white/5 text-gray-400 hover:text-white'
                  }`}
              >
                  <div className='flex items-center gap-4 truncate'>
                    <div className={`w-1.5 h-1.5 rounded-full ${selectedChat?._id === chat._id ? 'bg-indigo-400 shadow-[0_0_10px_#6366f1]' : 'bg-gray-700'}`}></div>
                    <span className='truncate text-[11px] font-black uppercase tracking-wider leading-none'>{chat.title}</span>
                  </div>
                  <button
                  onClick={(e) => deleteChat(chat._id, e)}
                  className={`opacity-0 group-hover:opacity-100 transition-all p-1.5 rounded-lg ${selectedChat?._id === chat._id ? 'text-white/40 hover:text-white' : 'text-gray-600 hover:text-red-400'}`}
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  </button>
              </div>
              ))}
          </div>
        </div>
      </div>

      {/* Identity & Nav */}
      <div className='pt-8 border-t border-white/5'>
        <div className='flex items-center gap-4 mb-8 px-2'>
            <div className='w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-black text-sm text-[var(--accent)] shadow-inner'>
                {user?.name?.[0] || 'U'}
            </div>
            <div className='flex-1 min-w-0'>
                <div className='text-[10px] font-black truncate text-white uppercase tracking-wider'>{user?.name}</div>
                <div className='mt-2.5'>
                  <div className='flex justify-between items-center text-[8px] font-black text-gray-500 mb-1.5 uppercase tracking-widest'>
                    <span>Credits</span>
                    <span className='text-purple-400'>{user?.credits} / 20</span>
                  </div>
                  <div className='progress-3d'>
                    <div 
                      className='progress-bar-3d' 
                      style={{ width: `${Math.min((user?.credits / 20) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
            </div>
        </div>

        <nav className='space-y-1'>
            <button 
              onClick={toggleTheme}
              className='w-full px-5 py-4 hover:bg-white/5 text-gray-400 hover:text-white rounded-2xl flex items-center transition-all text-[9px] font-black uppercase tracking-[0.2em]'
            >
              Toggle Environment
            </button>
            <Link 
              to='/credits' 
              className={`px-5 py-4 rounded-2xl flex items-center transition-all text-[9px] font-black uppercase tracking-[0.2em] ${
                location.pathname === '/credits' 
                  ? 'bg-white/10 text-white shadow-xl shadow-white/5 border border-white/10' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Billing Nodes
            </Link>
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className='w-full px-5 py-4 hover:bg-red-500/10 text-red-400/60 hover:text-red-400 rounded-2xl flex items-center transition-all text-[9px] font-black uppercase tracking-[0.2em]'
            >
              Sign Out
            </button>
        </nav>
      </div>

      <Modal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={logout}
        title="Sign Out"
        message="Are you sure you want to terminate your session?"
        confirmText="Sign Out"
        type="danger"
      />
    </div>
  )
}

export default Sidebar