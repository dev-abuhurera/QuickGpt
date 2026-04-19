import React from 'react'
import Sidebar from './components/Sidebar'
import { Route, Routes, Navigate } from 'react-router-dom'
import Chatbox from './components/Chatbox'
import Credits from './pages/Credits'
import Community from './pages/Community'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useAppContext } from './context/AppContext'

const App = () => {
  const { user, notifications = [] } = useAppContext();

  return (
    <div className='h-screen w-screen overflow-hidden bg-[var(--bg)] text-[var(--text)] transition-colors duration-300'>
      {/* Notifications Layer */}
      <div className='fixed top-6 right-6 z-50 flex flex-col gap-3 pointer-events-none'>
        {notifications.map(n => (
          <div key={n.id} className='pointer-events-auto formal-card px-6 py-4 shadow-xl animate-fade-in text-sm font-medium min-w-[300px] border-l-4 border-[var(--accent)]'>
            {n.message}
          </div>
        ))}
      </div>

      <div className='h-full w-full relative z-10'>
        {user ? (
          <div className='flex h-full w-full overflow-hidden p-0 gap-0'>
            <Sidebar />
            <div className='flex-1 overflow-hidden bg-[var(--bg)] relative flex flex-col h-full'>
              <Routes>
                <Route path='/' element={<div className="flex-1 flex flex-col min-h-0"><Chatbox /></div>} />
                <Route path='/credits' element={<div className="flex-1 flex flex-col min-h-0"><Credits /></div>} />
                <Route path='/community' element={<div className="flex-1 flex flex-col min-h-0"><Community /></div>} />
                <Route path='*' element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        ) : (
          <div className='flex items-center justify-center min-h-screen'>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='*' element={<Navigate to="/login" />} />
            </Routes>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
