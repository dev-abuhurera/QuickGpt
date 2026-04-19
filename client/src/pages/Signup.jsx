import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

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
                addNotification('Account provisioned successfully')
                navigate('/')
            } else {
                addNotification(data.message || 'Registration failure')
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
                        <h2 className='text-2xl font-black text-gray-900 mb-2'>Initialize Node</h2>
                        <p className='text-[11px] font-black uppercase tracking-widest text-gray-400'>Provision your premium workspace</p>
                    </div>

                    <form onSubmit={onSubmitHandler} className='space-y-6'>
                        <div className='space-y-2'>
                            <label className='text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1'>Name Tag</label>
                            <input
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all text-sm font-medium'
                                placeholder='Full identity'
                                required
                            />
                        </div>
                        <div className='space-y-2'>
                            <label className='text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1'>Email Interface</label>
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
                            className='w-full btn-3d mt-4 bg-gray-900 text-white font-bold py-4 rounded-2xl hover:bg-gray-800 transition-all'
                        >
                            {isLoading ? 'Processing...' : 'Bootstrap Account'}
                        </button>
                    </form>

                    <div className='mt-10 text-center'>
                        <Link 
                            to='/login'
                            className='text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-purple-600 transition-colors'
                        >
                            Existing user? Return to Access
                        </Link>
                    </div>
                </div>
                
                <p className='mt-12 text-center text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 opacity-40'>
                    Provisioning includes 20 complimentary credits
                </p>
            </div>
        </div>
    )
}

export default Signup