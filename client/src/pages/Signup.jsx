import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import heroImage from '../assets/obsidian-hero.png'

const Signup = () => {
  const { backendUrl, setUser, addNotification } = useAppContext()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch(`${backendUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })

      const data = await res.json()
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token)
        const userData = data.user || data;
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
        addNotification('Access provisioned')
        navigate('/')
      } else {
        addNotification(data.message || 'Provisioning failure')
      }
    } catch (error) {
      console.error(error)
      addNotification('Infrastructure connection error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-black text-white flex flex-col font-sans'>
      {/* Top Navigation Bar */}
      <header className='flex justify-between items-center px-8 py-6 border-b border-white/5'>
        <div className='flex items-center gap-2'>
          <span className='font-bold text-xl tracking-tight'>Obsidian AI</span>
        </div>
        <nav className='flex gap-8 text-sm font-medium text-gray-500'>
          <a href="#" className='hover:text-white transition-colors'>Product</a>
          <a href="#" className='hover:text-white transition-colors'>Intelligence</a>
          <button className='text-gray-400 hover:text-white'>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
          </button>
        </nav>
      </header>

      <main className='flex-1 flex justify-center items-center p-6'>
        <div className='w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0a] shadow-2xl'>
          {/* Left Side: Branding & Image */}
          <div className='relative hidden md:flex flex-col justify-end p-12 bg-linear-to-br from-[#111] to-[#000] border-r border-white/5'>
            <div className='absolute inset-0 opacity-40 mix-blend-luminosity bg-cover bg-center' style={{ backgroundImage: `url(${heroImage})` }}></div>
            <div className='relative z-10 space-y-4'>
              <h2 className='text-4xl font-bold leading-tight tracking-tight'>
                ARCHITECTING <br />
                A NEW <br />
                INTELLIGENCE.
              </h2>
              <p className='text-gray-400 text-sm max-w-[280px] leading-relaxed'>
                Join the Onyx Logic ecosystem. Provision your workspace for high-fidelity cognitive interaction.
              </p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className='p-12 md:p-16 flex flex-col justify-center space-y-10'>
            <div className='space-y-2'>
              <h3 className='text-2xl font-bold'>Create Access</h3>
              <p className='text-gray-500 text-sm'>Enter your credentials to initialize your node.</p>
            </div>

            <form onSubmit={onSubmitHandler} className='space-y-4'>
              <div className='space-y-2'>
                <label className='text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1'>Full Identity</label>
                <input
                  type='text'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Full Name'
                  className='w-full obsidian-input h-14 px-5 rounded-lg text-sm placeholder:text-gray-700'
                />
              </div>

              <div className='space-y-2'>
                <label className='text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1'>Email Interface</label>
                <input
                  type='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='name@domain.com'
                  className='w-full obsidian-input h-14 px-5 rounded-lg text-sm placeholder:text-gray-700'
                />
              </div>

              <div className='space-y-2'>
                <label className='text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1'>Security Key</label>
                <input
                  type='password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='••••••••'
                  className='w-full obsidian-input h-14 px-5 rounded-lg text-sm placeholder:text-gray-700'
                />
              </div>

              <button
                type='submit'
                disabled={isLoading}
                className='w-full h-14 obsidian-button-primary mt-6 text-sm tracking-wide disabled:opacity-50'
              >
                {isLoading ? 'PROVISIONING...' : 'INITIALIZE ACCESS'}
              </button>
            </form>

            <div className='text-center'>
              <p className='text-gray-500 text-xs'>
                Existing user? <Link to='/login' className='text-white hover:underline underline-offset-4'>Return to Access</Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className='px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5'>
        <p className='text-[10px] text-gray-600 font-bold tracking-widest uppercase'>© 2024 Obsidian Lens. All rights reserved.</p>
        <div className='flex gap-8 text-[10px] text-gray-600 font-bold tracking-widest uppercase'>
          <a href="#" className='hover:text-white transition-colors'>Privacy</a>
          <a href="#" className='hover:text-white transition-colors'>Terms</a>
          <a href="#" className='hover:text-white transition-colors'>Support</a>
        </div>
      </footer>
    </div>
  )
}

export default Signup