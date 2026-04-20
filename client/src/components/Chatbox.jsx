import React, { useState, useEffect, useRef } from 'react'
import { useAppContext } from '../context/AppContext'
import Message from './Message'

const Chatbox = () => {
    const { 
        selectedChat, 
        messages, 
        setMessages, 
        backendUrl, 
        addNotification,
        refreshUser
    } = useAppContext()

    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        if (!selectedChat?._id) return;
        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`${backendUrl}/api/chats/${selectedChat._id}/messages`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (res.ok) setMessages(data);
                else setMessages([]);
            } catch (err) {
                console.error(err);
                setMessages([]);
            }
        };
        fetchMessages();
    }, [selectedChat, backendUrl, setMessages]);

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = async (e) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return
        if (!selectedChat) {
            addNotification('Select a node to begin', 'info')
            return
        }

        const userMsg = { role: 'user', content: input }
        setMessages(prev => [...prev, userMsg])
        setInput('')
        setIsLoading(true)

        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${backendUrl}/api/chats/${selectedChat._id}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    content: input 
                })
            })

            const data = await res.json()
            if (res.ok) {
                if (data.aiMessage) {
                    setMessages(prev => {
                        const filtered = prev.filter(m => m !== userMsg);
                        return [...filtered, data.message, data.aiMessage];
                    });
                }
                refreshUser()
            } else {
                addNotification(data.message || 'Transmission failure')
            }
        } catch (error) {
            addNotification('Computational error')
        } finally {
            setIsLoading(false)
        }
    }

    if (!selectedChat) {
        return (
            <div className='flex-1 h-full bg-[#050505] flex flex-col items-center justify-center p-12'>
                <div className='w-full max-w-4xl text-left'>
                    <p className='text-xs font-bold text-gray-700 uppercase tracking-widest mb-4'>Infrastructure // Active Node Search</p>
                    <h1 className='text-7xl font-bold tracking-tight text-white/5'>Refined <br />Intelligence.</h1>
                    <div className='mt-12 p-8 border border-white/5 bg-[#0a0a0a] rounded-2xl'>
                        <p className='text-sm text-gray-500'>No active session selected. Initiate a new thread or select an existing operation from the navigation node.</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='flex-1 h-full bg-[#050505] flex flex-col relative overflow-hidden font-sansSelection'>
            {/* Header */}
            <header className='flex justify-between items-center px-10 py-6 border-b border-white/5 bg-black/50 backdrop-blur-xl z-20'>
                <div className='flex items-center gap-2'>
                    <span className='text-[10px] font-bold text-gray-600 uppercase tracking-widest'>Obsidian // {selectedChat.title}</span>
                </div>
                <div className='flex items-center gap-6'>
                    <button className='bg-white/10 hover:bg-white/15 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all'>Add Credits</button>
                    <div className='flex gap-4 items-center'>
                         <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                         <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                         <div className='w-8 h-8 rounded-full bg-linear-to-br from-gray-700 to-gray-900 border border-white/10'></div>
                    </div>
                </div>
            </header>

            {/* Messages Feed */}
            <div className='flex-1 overflow-y-auto pt-16 px-10 pb-32 space-y-12 custom-scrollbar'>
                <div className='max-w-4xl mx-auto w-full'>
                    {messages.length === 0 && (
                        <div className='animate-fade-in'>
                            <h1 className='text-7xl font-bold tracking-tight text-white mb-6'>Refined <br />Intelligence.</h1>
                            <p className='text-gray-400 text-lg leading-relaxed max-w-xl'>
                                Welcome back. The Obsidian Lens is calibrated for deep reasoning and creative synthesis. Select a thread or initiate a new prompt below.
                            </p>
                        </div>
                    )}
                    
                    <div className='space-y-12'>
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`${msg.role === 'user' ? 'bg-[#111] border border-white/5 p-6 rounded-2xl max-w-xl shadow-2xl' : 'w-full'}`}>
                                    <Message message={msg} />
                                    
                                    {/* Mocking the cards for the design fidelity if it's the first AI response */}
                                    {!msg.role === 'user' && idx === 1 && (
                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-8'>
                                            <div className='bg-[#111] border border-white/5 p-6 rounded-xl space-y-2'>
                                                <p className='text-[10px] font-bold text-gray-500 uppercase tracking-widest'>Demand Metric</p>
                                                <p className='text-3xl font-bold font-metric'>94.2%</p>
                                                <p className='text-[10px] text-gray-600 font-bold'>Utilization of globally distributed nodes.</p>
                                            </div>
                                            <div className='bg-[#111] border border-white/5 p-6 rounded-xl space-y-2'>
                                                <p className='text-[10px] font-bold text-gray-500 uppercase tracking-widest'>Cost Projection</p>
                                                <p className='text-3xl font-bold font-metric text-white'>+$1.2k</p>
                                                <p className='text-[10px] text-gray-600 font-bold'>Per TFLOPS/month (Est. increase).</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {isLoading && (
                        <div className='flex justify-start pt-8'>
                            <div className='flex gap-2 items-center'>
                                <div className='w-2 h-2 bg-gray-700 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                                <div className='w-2 h-2 bg-gray-700 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                                <div className='w-2 h-2 bg-gray-700 rounded-full animate-bounce'></div>
                                <span className='text-[10px] font-bold text-gray-600 uppercase tracking-widest ml-2'>Synthesizing...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Floating Input */}
            <div className='absolute bottom-10 left-0 right-0 px-10 pointer-events-none'>
                <div className='max-w-4xl mx-auto w-full pointer-events-auto'>
                    <form onSubmit={handleSend} className='relative group'>
                        <div className='absolute inset-0 bg-white/5 blur-xl group-focus-within:bg-white/10 transition-all rounded-2xl'></div>
                        <div className='relative bg-[#111] border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-2xl'>
                            <button type='button' className='p-2 text-gray-500 hover:text-white transition-colors'>
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.51a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                            </button>
                            <input 
                                type='text'
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder='Message Obsidian...'
                                className='flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 placeholder:text-gray-600'
                                disabled={isLoading}
                            />
                            <button 
                                type='submit'
                                disabled={isLoading || !input.trim()}
                                className='bg-white p-2 rounded-xl text-black hover:bg-gray-200 transition-all disabled:opacity-30'
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
                            </button>
                        </div>
                        <div className='flex justify-between items-center mt-4 px-2'>
                            <div className='flex gap-4 items-center'>
                                <span className='text-[9px] font-bold text-gray-600 uppercase tracking-widest flex items-center gap-2'>
                                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                                    Model: Obsidian-3.5-Turbo
                                </span>
                                <span className='text-[9px] font-bold text-gray-600 uppercase tracking-widest flex items-center gap-2'>
                                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                                    Web Access: Active
                                </span>
                            </div>
                            <span className='text-[9px] font-bold text-gray-700 uppercase tracking-widest'>0 / 2000 Tokens</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Chatbox