import React from 'react'

const Community = () => {
    return (
        <div className='flex-1 h-full bg-[#050505] flex flex-col items-center justify-center p-12 overflow-hidden font-sans'>
            <div className='max-w-4xl w-full text-center space-y-12 animate-fade-in'>
                <div className='space-y-4'>
                    <p className='text-xs font-bold text-gray-700 uppercase tracking-widest'>Intelligence Frontier // Collaborative Nodes</p>
                    <h1 className='text-7xl font-bold tracking-tight text-white/10'>Shared <br />Knowledge.</h1>
                </div>

                <div className='bg-[#111] border border-white/5 p-16 rounded-3xl relative overflow-hidden group'>
                    <div className='absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000'></div>
                    <div className='relative z-10 space-y-8'>
                        <div className='w-20 h-20 bg-white/5 border border-white/10 rounded-2xl mx-auto flex items-center justify-center mb-8'>
                            <svg className="w-10 h-10 text-white/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </div>
                        <h2 className='text-3xl font-bold tracking-tight'>Development in Progress</h2>
                        <p className='text-gray-500 text-base max-w-md mx-auto leading-relaxed'>
                            We are architecting a decentralized environment for professional knowledge exchange and prompt engineering refinement.
                        </p>
                        
                        <div className='flex gap-4 justify-center pt-8'>
                            <div className='bg-black border border-white/5 px-6 py-2.5 rounded-full flex items-center gap-3'>
                                <span className='w-2 h-2 rounded-full bg-white/20 animate-pulse'></span>
                                <span className='text-[10px] font-bold uppercase tracking-widest text-gray-500'>Infrastructure Phase 1.0</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000'>
                    <div className='text-left space-y-4'>
                        <h3 className='text-[10px] font-bold text-white uppercase tracking-widest'>Collaborative Synthesis</h3>
                        <p className='text-xs text-gray-400 leading-relaxed font-bold'>Exporting curated conversations for community review and collective model fine-tuning.</p>
                    </div>
                    <div className='text-left space-y-4'>
                        <h3 className='text-[10px] font-bold text-white uppercase tracking-widest'>Benchmark Engineering</h3>
                        <p className='text-xs text-gray-400 leading-relaxed font-bold'>Standardizing interaction patterns across high-fidelity industrial applications.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Community