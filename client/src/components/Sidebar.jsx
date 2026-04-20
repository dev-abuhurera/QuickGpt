import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { Link, useLocation } from 'react-router-dom'
import Modal from './Modal'

const Sidebar = () => {
  const { user, chats, setChats, selectedChat, setSelectedChat, backendUrl, logout, addNotification } = useAppContext()
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
        body: JSON.stringify({ title: 'New Session' })
      })
      const data = await res.json()
      if (res.ok && data.result) {
        setChats(prev => [data.result, ...prev])
        setSelectedChat(data.result)
        addNotification('Node initialized')
      } else {
        addNotification(data.message || 'Node failure')
      }
    } catch (error) {
      console.error(error)
      addNotification('Infrastructure error')
    }
  }

  if (!user) return null

  const navItems = [
    { name: 'Intelligence', path: '/', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg> },
    { name: 'Visual Studio', path: '/visual-studio', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg> }, // Placeholder icon
    { name: 'Credit Hub', path: '/credits', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19V5" /></svg> } // Placeholder icon
  ]

  return (
    <div className='w-72 bg-black border-r border-white/5 flex flex-col h-full py-10 px-6 font-sans'>
      {/* Logo */}
      <div className='mb-10 px-2'>
        <h1 className='text-lg font-bold tracking-tight'>Obsidian</h1>
        <p className='text-[10px] font-bold text-gray-700 uppercase tracking-[0.2em]'>Digital Curator</p>
      </div>

      {/* New Session Button */}
      <div className='mb-12'>
        <button 
          onClick={createNewChat}
          className='w-full h-11 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all border border-white/5'
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          New Session
        </button>
      </div>

      {/* Primary Navigation */}
      <nav className='flex-1 space-y-1'>
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all text-xs font-bold uppercase tracking-wider ${
              location.pathname === item.path 
                ? 'bg-[#111] text-white border border-white/5 shadow-lg' 
                : 'text-gray-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className={`${location.pathname === item.path ? 'text-white' : 'text-gray-600'}`}>
              {item.name === 'Intelligence' && (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              )}
              {item.name === 'Visual Studio' && (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
              )}
              {item.name === 'Credit Hub' && (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
              )}
            </span>
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Secondary Navigation */}
      <footer className='space-y-1 pt-6 border-t border-white/5'>
        <button className='w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all text-xs font-bold uppercase tracking-wider'>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          Settings
        </button>
        <button 
          onClick={() => setIsLogoutModalOpen(true)}
          className='w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all text-xs font-bold uppercase tracking-wider'
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Account
        </button>
      </footer>

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