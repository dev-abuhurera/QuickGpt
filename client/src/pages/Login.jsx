import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const Login = () => {
  const { backendUrl, setUser, addNotification } = useAppContext()
  const navigate = useNavigate()

  const [state, setState] = useState('Login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmitHandler = async (e) => {
      e.preventDefault()
      setIsLoading(true)
      try {
        const endpoint = state === 'Login' ? '/api/auth/login' : '/api/auth/register'
        const payload = state === 'Login' ? { email, password } : { name, email, password }
        
        const res = await fetch(`${backendUrl}${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })

        const data = await res.json()

        if (res.ok && data.token) {
          localStorage.setItem('token', data.token)
          const userData = data.user || data;
          localStorage.setItem('user', JSON.stringify(userData))
          setUser(userData)
          addNotification(state === 'Login' ? 'Session initialized' : 'Account provisioned')
          navigate('/')
        } else {
          addNotification(data.message || 'Authentication failure')
        }
      } catch (error) {
        console.error(error)
        addNotification('Network infrastructure error')
      } finally {
        setIsLoading(false)
      }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#f8fafc] p-6 page-enter'>
      <div className='w-full max-w-md'>
        {/* Branding */}
        <div className='flex flex-col items-center mb-12'>
          <div className='w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[24px] flex items-center justify-center shadow-2xl shadow-purple-500/20 mb-6'>
            <span className='text-white font-black text-3xl'>Q</span>
          </div>
          <h1 className='text-xs font-black uppercase tracking-[0.4em] text-gray-900'>QuickGpt</h1>
          <span className='text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 mt-2 opacity-60'>Operational Intelligence</span>
        </div>

        <div className='bg-white border border-gray-100 rounded-[40px] p-12 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)]'>
          <div className='mb-10 text-center'>
            <h2 className='text-2xl font-black text-gray-900 mb-2'>{state === 'Login' ? 'Sign In' : 'Create Account'}</h2>
            <p className='text-[11px] font-black uppercase tracking-widest text-gray-400'>Enter your credentials</p>
          </div>

          <form onSubmit={onSubmitHandler} className='space-y-6'>
            {state === 'Sign Up' && (
              <div className='space-y-2'>
                <label className='text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1'>Name</label>
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all text-sm font-medium'
                  placeholder='Full name'
                  required
                />
              </div>
            )}
            <div className='space-y-2'>
              <label className='text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1'>Email Node</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all text-sm font-medium'
                placeholder='name@example.com'
                required
              />
            </div>
            <div className='space-y-2'>
              <label className='text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1'>Security Key</label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all text-sm font-medium'
                placeholder='••••••••'
                required
              />
            </div>

            <button
              type='submit'
              disabled={isLoading}
              className='w-full btn-3d mt-4 bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all'
            >
              {isLoading ? 'Authenticating...' : (state === 'Login' ? 'Access Workspace' : 'Initialize Account')}
            </button>
          </form>

          <p className='text-center text-sm text-[var(--text-muted)] mt-10'>
            New to QuickGpt? <Link to='/signup' className='text-[var(--accent)] font-bold hover:underline underline-offset-4 decoration-2'>Create free account</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login