import React from 'react'

const Community = () => {
  return (
    <div className='flex-1 p-16 overflow-y-auto custom-scrollbar bg-[var(--bg)]'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-20'>
            <h1 className='text-4xl font-bold mb-4 tracking-tight uppercase text-center'>Community Hub</h1>
            <p className='opacity-40 text-sm font-medium text-center'>Exploring the frontier of collaborative intelligence.</p>
        </div>

        <div className='formal-border p-24 flex flex-col items-center text-center bg-[var(--sidebar)]'>
          <div className='w-16 h-16 formal-border rounded-full flex items-center justify-center text-xl mb-10'>...</div>
          <h2 className='text-3xl font-bold mb-4 tracking-tight uppercase'>Development in Progress</h2>
          <p className='opacity-40 text-sm max-w-[320px] mx-auto mb-10 leading-relaxed italic'>We are architecting a professional environment for knowledge exchange and prompt engineering refinement.</p>
          
          <div className='flex gap-4 justify-center'>
              <div className='formal-border px-6 py-2 rounded-full flex items-center gap-2'>
                  <span className='w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse'></span>
                  <span className='text-[10px] font-black uppercase tracking-widest opacity-60'>Build Phase 1.0</span>
              </div>
          </div>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-20 opacity-40'>
            <div className='space-y-2'>
                <h3 className='font-bold text-sm uppercase tracking-tight'>Shared Knowledge</h3>
                <p className='text-xs leading-relaxed'>Exporting curated conversations for community review and collaborative refinement.</p>
            </div>
            <div className='space-y-2'>
                <h3 className='font-bold text-sm uppercase tracking-tight'>Prompt Engineering</h3>
                <p className='text-xs leading-relaxed'>Benchmarking state-of-the-art interaction patterns across industrial applications.</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Community