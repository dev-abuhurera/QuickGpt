import React from 'react'
import Sidebar from './components/Sidebar'
import { Route, Routes, Navigate } from 'react-router-dom'
import Chatbox from './components/Chatbox'
import Credits from './pages/Credits'
import VisualStudio from './pages/VisualStudio'
import Community from './pages/Community'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useAppContext } from './context/AppContext'

const App = () => {
  const { user, notifications = [] } = useAppContext();

  return (
    <div className='h-screen w-screen overflow-hidden bg-black text-white selection:bg-white selection:text-black'>
      {/* Notifications Layer */}
      <div className='fixed top-8 right-8 z-100 flex flex-col gap-4 pointer-events-none'>
        {notifications.map(n => (
          <div key={n.id} className='pointer-events-auto bg-[#111] border border-white/5 px-6 py-4 shadow-2xl animate-fade-in text-[10px] font-bold uppercase tracking-widest text-white min-w-[280px]'>
            {n.message}
          </div>
        ))}
      </div>

      <div className='h-full w-full relative'>
        {user ? (
          <div className='flex h-full w-full overflow-hidden'>
            <Sidebar />
            <main className='flex-1 overflow-hidden relative flex flex-col h-full bg-[#050505]'>
              <Routes>
                <Route path='/' element={<Chatbox />} />
                <Route path='/visual-studio' element={<VisualStudio />} />
                <Route path='/credits' element={<Credits />} />
                <Route path='/community' element={<Community />} />
                <Route path='*' element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        ) : (
          <div className='h-full w-full'>
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
