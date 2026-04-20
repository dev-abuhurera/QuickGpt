import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import heroImage from '../assets/obsidian-login-hero.png'

const Login = () => {
  const { backendUrl, setUser, addNotification } = useAppContext()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch(`${backendUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token)
        const userData = data.user || data;
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
        addNotification('Session synchronized')
        navigate('/')
      } else {
        addNotification(data.message || 'Authentication failure')
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
          <div className='relative hidden md:flex flex-col justify-end p-12 bg-gradient-to-br from-[#111] to-[#000] border-r border-white/5'>
            <div className='absolute inset-0 opacity-40 mix-blend-luminosity bg-cover bg-center' style={{ backgroundImage: `url(${heroImage})` }}></div>
            <div className='relative z-10 space-y-4'>
              <h2 className='text-4xl font-bold leading-tight tracking-tight'>
                THE FUTURE <br />
                THROUGH A <br />
                DARKENED LENS.
              </h2>
              <p className='text-gray-400 text-sm max-w-[280px] leading-relaxed'>
                Access the Onyx Logic ecosystem. A digital curator for high-fidelity intelligence.
              </p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className='p-12 md:p-16 flex flex-col justify-center space-y-10'>
            <div className='space-y-2'>
              <h3 className='text-2xl font-bold'>Welcome Back</h3>
              <p className='text-gray-500 text-sm'>Sign in to your Obsidian account.</p>
            </div>

            <div className='space-y-6'>
              <button className='w-full h-14 obsidian-button-secondary flex items-center justify-center gap-3 font-semibold text-sm'>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                CONTINUE WITH GOOGLE
              </button>

              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-white/5'></div>
                </div>
                <div className='relative flex justify-center text-[10px] font-bold tracking-[0.2em] uppercase'>
                  <span className='bg-[#0a0a0a] px-4 text-gray-600'>Or Use Email</span>
                </div>
              </div>

              <form onSubmit={onSubmitHandler} className='space-y-4'>
                <div className='space-y-2'>
                  <label className='text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1'>Email Address</label>
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
                  <div className='flex justify-between items-center px-1'>
                    <label className='text-[10px] font-bold text-gray-500 uppercase tracking-wider'>Password</label>
                    <button type='button' className='text-[10px] font-bold text-gray-400 hover:text-white uppercase tracking-wider'>Forgot?</button>
                  </div>
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
                  {isLoading ? 'AUTHORIZING...' : 'AUTHORIZE SESSION'}
                </button>
              </form>
            </div>

            <div className='text-center'>
              <p className='text-gray-500 text-xs'>
                Don't have an account? <Link to='/signup' className='text-white hover:underline underline-offset-4'>Create Access</Link>
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

export default Login