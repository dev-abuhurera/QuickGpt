import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'

const VisualStudio = () => {
    const [prompt, setPrompt] = useState('')
    const [quality, setQuality] = useState('Standard')

    const recentVisuals = [
      { id: 1, url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', ratio: '1:1', main: true },
      { id: 2, url: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2670&auto=format&fit=crop', ratio: '16:9' },
      { id: 3, url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop', ratio: '16:9' }
    ]

    return (
        <div className='flex-1 h-full bg-[#050505] flex flex-col relative overflow-hidden font-sans'>
            {/* Header */}
            <header className='flex justify-between items-center px-10 py-6 border-b border-white/5 bg-black/50 backdrop-blur-xl z-20'>
                <div className='flex items-center gap-2'>
                    <span className='text-[10px] font-bold text-gray-600 uppercase tracking-widest'>Project: Lens V2.4</span>
                </div>
                <div className='flex items-center gap-6'>
                    <div className='flex gap-4 items-center mr-4'>
                         <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                         <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    </div>
                    <button className='bg-white/10 hover:bg-white/15 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all'>Add Credits</button>
                    <div className='w-8 h-8 rounded-full bg-linear-to-br from-gray-700 to-gray-900 border border-white/10'></div>
                </div>
            </header>

            <main className='flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar'>
                <div className='max-w-6xl mx-auto'>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                        {/* Prompt Area */}
                        <div className='lg:col-span-2 space-y-6'>
                            <div className='bg-[#111] border border-white/5 p-8 rounded-2xl relative min-h-[160px] flex flex-col justify-between shadow-2xl'>
                                <textarea 
                                    className='bg-transparent border-none focus:ring-0 text-xl text-gray-300 placeholder:text-gray-700 w-full resize-none'
                                    placeholder='Describe the visual landscape of your imagination...'
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    rows={3}
                                />
                                <div className='flex justify-end items-center gap-4 pt-4 border-t border-white/5'>
                                    <span className='text-[10px] font-bold text-gray-600 uppercase tracking-widest flex items-center gap-2'>
                                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                                        2 Credits
                                    </span>
                                    <button className='bg-white text-black px-6 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]'>Generate</button>
                                </div>
                            </div>
                        </div>

                        {/* Configuration Card */}
                        <div className='bg-[#111] border border-white/5 p-8 rounded-2xl shadow-2xl space-y-8'>
                            <p className='text-[10px] font-bold text-gray-500 uppercase tracking-widest'>Model Configuration</p>
                            
                            <div className='space-y-4'>
                                <div className='flex justify-between items-center'>
                                    <span className='text-xs font-bold text-gray-400'>Ratio</span>
                                    <div className='flex gap-2'>
                                        <div className='w-4 h-4 border border-white bg-white rounded-sm'></div>
                                        <div className='w-6 h-4 border border-white/20 rounded-sm'></div>
                                        <div className='w-4 h-6 border border-white/20 rounded-sm translate-y-[-4px]'></div>
                                    </div>
                                </div>
                                
                                <div className='flex justify-between items-center pt-2'>
                                    <span className='text-xs font-bold text-gray-400'>Quality</span>
                                    <div className='flex items-center gap-4'>
                                        <span className='text-[10px] font-bold text-gray-500 uppercase'>Standard</span>
                                        <div 
                                            onClick={() => setQuality(q => q === 'Standard' ? 'Ultra HD' : 'Standard')}
                                            className='w-10 h-5 bg-[#222] rounded-full p-1 cursor-pointer relative'
                                        >
                                            <div className={`w-3 h-3 bg-white rounded-full transition-all ${quality === 'Ultra HD' ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                        </div>
                                        <span className='text-[10px] font-bold text-gray-500 uppercase'>Ultra HD</span>
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-between items-center pt-8 border-t border-white/5'>
                                <span className='text-[10px] font-bold text-gray-600 uppercase tracking-widest'>Estimated Time</span>
                                <span className='text-xs font-bold font-metric'>~12s</span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Visuals */}
                    <div className='mt-20 space-y-8'>
                        <div className='flex justify-between items-end'>
                            <h2 className='text-2xl font-bold tracking-tight'>Recent Visuals</h2>
                            <div className='flex gap-6 items-center'>
                                <div className='flex gap-2'>
                                    <div className='w-4 h-4 bg-white/20 rounded-sm'></div>
                                    <div className='w-4 h-1 bg-white/10 rounded-sm self-center'></div>
                                </div>
                                <span className='text-[10px] font-bold text-gray-500 uppercase tracking-widest'>Filter: Cinematic</span>
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                            <div className='md:col-span-2 lg:col-span-2 aspect-square relative group overflow-hidden rounded-2xl border border-white/5'>
                                <img src={recentVisuals[0].url} className='w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105' alt='' />
                                <div className='absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all'>
                                     <button className='bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest'>View Details</button>
                                </div>
                            </div>
                            <div className='lg:col-span-2 grid grid-cols-1 gap-6'>
                                <div className='aspect-video relative group overflow-hidden rounded-2xl border border-white/5'>
                                    <img src={recentVisuals[1].url} className='w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0' alt='' />
                                    <span className='absolute top-4 right-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-black/50 px-2 py-1 rounded'>16:9</span>
                                </div>
                                <div className='aspect-video relative group overflow-hidden rounded-2xl border border-white/5'>
                                    <img src={recentVisuals[2].url} className='w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0' alt='' />
                                    <span className='absolute top-4 right-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-black/50 px-2 py-1 rounded'>16:9</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Fixed Balance Pill */}
            <div className='fixed bottom-10 right-10 z-30'>
                <div className='bg-[#111] border border-white/10 pl-6 pr-2 py-2 rounded-2xl flex items-center gap-6 shadow-[0_0_40px_rgba(0,0,0,0.5)]'>
                    <div className='flex flex-col'>
                        <span className='text-[8px] font-bold text-gray-600 uppercase tracking-widest'>Balance</span>
                        <span className='text-xs font-bold font-metric'>1,240 <span className='text-[8px] text-gray-500'>CR</span></span>
                    </div>
                    <button className='w-10 h-10 bg-[#222] border border-white/5 rounded-xl flex items-center justify-center hover:bg-[#2a2a2a] transition-all'>
                        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VisualStudio
