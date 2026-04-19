import React, { useState, useEffect, useRef } from 'react'
import { useAppContext } from '../context/AppContext'
import Message from './Message'

const Chatbox = () => {
    const { 
        user, 
        selectedChat, 
        messages, 
        setMessages, 
        backendUrl, 
        addNotification,
        refreshUser
    } = useAppContext()

    const [input, setInput] = useState('')
    const [mode, setMode] = useState('text') // 'text' or 'image'
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
            } catch (error) {
                console.error(error);
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
                // Backend returns { message, aiMessage, chatTitle }
                if (data.aiMessage) {
                    setMessages(prev => {
                        // Remove the optimistic user message and add both from server for consistency
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
            <div className='flex-1 flex flex-col items-center justify-center bg-white p-10 page-enter'>
                <div className='w-24 h-24 bg-gray-50 border border-gray-100 rounded-[32px] flex items-center justify-center mb-10 shadow-inner'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </div>
                <h2 className='text-xl font-black text-gray-900 mb-3 tracking-tight'>Initialize Intelligence</h2>
                <p className='text-[11px] font-black uppercase tracking-[.3em] text-gray-400'>Select an operational node from the infrastructure</p>
            </div>
        )
    }

    return (
        <div className='flex-1 flex flex-col bg-white overflow-hidden relative page-enter'>
            {/* Header */}
            <div className='px-12 py-6 border-b border-gray-50 flex justify-between items-center bg-white/80 backdrop-blur-md z-10'>
                <div className='flex items-center gap-4'>
                    <div className='w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]'></div>
                    <h2 className='text-[11px] font-black uppercase tracking-[.3em] text-gray-900'>{selectedChat.title}</h2>
                </div>
                <div className='flex items-center gap-6'>
                   <div className='px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100'>
                        <span className='text-[9px] font-black uppercase tracking-widest text-gray-400'>Quota: {user?.credits} Units</span>
                   </div>
                </div>
            </div>

            {/* Messages */}
            <div className='flex-1 overflow-y-auto p-12 space-y-10 custom-scrollbar'>
                {messages.length === 0 && (
                    <div className='h-full flex flex-col items-center justify-center opacity-20 grayscale'>
                         <div className='w-16 h-1 w-gray-200 rounded-full mb-8'></div>
                         <p className='text-[10px] font-black uppercase tracking-[.5em] text-gray-400'>Ready for Input</p>
                    </div>
                )}
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-page-enter`}>
                        <div className={`max-w-[75%] px-8 py-6 ${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}>
                            <div className='text-[13px] leading-relaxed font-medium prose prose-slate max-w-none'>
                                <Message message={msg} />
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className='flex justify-start animate-pulse'>
                        <div className='chat-bubble-ai px-8 py-4'>
                             <div className='flex gap-1.5'>
                                <div className='w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce'></div>
                                <div className='w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]'></div>
                                <div className='w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]'></div>
                             </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className='p-12 bg-gradient-to-t from-white via-white to-transparent'>
                <div className='max-w-4xl mx-auto'>
                    <form onSubmit={handleSend} className='input-card flex flex-col gap-4 p-2 bg-gray-50 border border-gray-100 rounded-[32px] shadow-2xl shadow-gray-200/50'>
                        <div className='flex items-center gap-2 px-4 pt-2'>
                            <button 
                                type='button'
                                onClick={() => setMode('text')}
                                className={`px-5 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${mode === 'text' ? 'bg-white text-indigo-600 shadow-md border border-indigo-50' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                Text Logic
                            </button>
                            <button 
                                type='button'
                                onClick={() => setMode('image')}
                                className={`px-5 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${mode === 'image' ? 'bg-white text-pink-600 shadow-md border border-pink-50' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                Visual Gen
                            </button>
                        </div>
                        <div className='flex items-center gap-4 bg-white m-1 rounded-[24px] p-2 border border-gray-100 shadow-inner'>
                            <input
                                type='text'
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={mode === 'text' ? 'Specify requirements...' : 'Describe visual output...'}
                                className='flex-1 px-4 py-3 bg-transparent focus:outline-none text-sm font-medium text-gray-900'
                                disabled={isLoading}
                            />
                            <button
                                type='submit'
                                disabled={isLoading || !input.trim()}
                                className='btn-3d flex items-center justify-center w-12 h-12 p-0 rounded-2xl'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                </svg>
                            </button>
                        </div>
                    </form>
                    <p className='mt-6 text-center text-[9px] font-black uppercase tracking-[0.4em] text-gray-300'>
                        {mode === 'text' ? '1 Credit per operation' : '2 Credits per operation'}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Chatbox