import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const Credits = () => {
  const { user, setSelectedChat } = useAppContext()

  const plans = [
    { name: 'Basic', credits: 100, price: '$4.99', desc: 'Reliable capacity for individual query analysis.' },
    { name: 'Pro', credits: 500, price: '$14.99', featured: true, desc: 'Advanced features for consistent production workflows.' },
    { name: 'Ultra', credits: 1500, price: '$39.99', desc: 'Maximum throughput for enterprise-grade intelligence.' },
  ]

  return (
    <div className='flex-1 p-12 lg:p-24 overflow-y-auto custom-scrollbar bg-white page-enter'>
      <div className='max-w-6xl mx-auto'>
        {/* Navigation Layer */}
        <div className='flex justify-between items-center mb-20'>
            <Link 
              to="/" 
              onClick={() => setSelectedChat(null)}
              className='px-8 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all shadow-sm hover:shadow-md'
            >
              ← Return to Chat
            </Link>
            <div className='px-6 py-3 rounded-2xl bg-indigo-50 border border-indigo-100 shadow-inner'>
              <span className='text-[10px] font-black tracking-[0.3em] text-indigo-600 uppercase'>Current Balance: {user?.credits} Credits</span>
            </div>
        </div>

        <div className='mb-24 text-center'>
            <div className='w-12 h-1 bg-indigo-600 mx-auto mb-10 rounded-full'></div>
            <span className='text-[10px] font-black uppercase tracking-[0.5em] text-gray-400 mb-6 inline-block'>Infrastructure Scaling</span>
            <h1 className='text-6xl font-black mb-8 tracking-tighter text-gray-900'>Fuel your intelligence.</h1>
            <p className='text-gray-400 text-sm font-medium max-w-xl mx-auto leading-relaxed'>
                Select an infrastructure package that aligns with your operational throughput requirements.
            </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mb-24'>
          {plans.map((plan) => (
            <div key={plan.name} className={`relative flex flex-col p-12 rounded-[40px] border transition-all duration-500 group ${
                plan.featured 
                ? 'bg-[var(--accent)] border-transparent text-white shadow-[0_30px_60px_rgba(124,58,237,0.25)] scale-105 z-10' 
                : 'bg-white border-gray-100 hover:border-gray-200 shadow-xl hover:shadow-2xl'
            }`}>
              {plan.featured && (
                <div className='absolute -top-5 left-1/2 -translate-x-1/2 bg-white text-indigo-600 text-[9px] font-black uppercase tracking-[0.3em] px-6 py-2.5 rounded-full shadow-2xl'>
                  Most Populated Choice
                </div>
              )}

              <h2 className={`text-[11px] font-black uppercase tracking-[0.3em] mb-10 ${plan.featured ? 'text-white/60' : 'text-gray-400'}`}>{plan.name}</h2>
              
              <div className='mb-10'>
                  <div className='text-7xl font-black tracking-tighter mb-2'>{plan.credits}</div>
                  <div className={`text-[10px] font-black uppercase tracking-[0.3em] opacity-60 ${plan.featured ? 'text-white' : 'text-indigo-600'}`}>Operational Units</div>
              </div>

              <p className={`text-[13px] mb-14 leading-relaxed font-medium ${plan.featured ? 'text-white/80' : 'text-gray-500'}`}>
                {plan.desc}
              </p>
              
              <div className='mt-auto pt-12 border-t border-white/10'>
                  <div className='flex items-baseline gap-1.5 mb-12'>
                    <span className='text-4xl font-black tracking-tight'>{plan.price}</span>
                    <span className='text-[10px] uppercase font-black tracking-[0.2em] opacity-40'>/ allocation</span>
                  </div>
                  <button className={`w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all ${
                    plan.featured 
                    ? 'bg-white text-indigo-600 hover:bg-gray-100 shadow-2xl' 
                    : 'bg-gray-900 text-white hover:bg-black shadow-lg hover:shadow-xl'
                  }`}>
                    Deploy Module
                  </button>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Specifications */}
        <div className='mb-24 bg-gray-50/50 border border-gray-100 rounded-[48px] p-16 flex flex-col md:flex-row items-center justify-between gap-16 px-20'>
            <div className='max-w-sm'>
                <h3 className='text-xs font-black uppercase tracking-[0.3em] mb-4 text-gray-900'>Resource Breakdown</h3>
                <p className='text-[12px] text-gray-500 font-medium leading-relaxed'>Clear metrics on credit expenditure across different computational modes.</p>
            </div>
            <div className='flex items-center gap-20'>
                <div className='text-center'>
                    <div className='text-3xl font-black text-gray-900 mb-1'>1</div>
                    <div className='text-[9px] font-black uppercase tracking-[0.3em] text-indigo-500'>Text Logic</div>
                </div>
                <div className='w-px h-12 bg-gray-200'></div>
                <div className='text-center'>
                    <div className='text-3xl font-black text-gray-900 mb-1'>2</div>
                    <div className='text-[9px] font-black uppercase tracking-[0.3em] text-pink-500'>Visual Gen</div>
                </div>
            </div>
        </div>
        
        {/* Compliance Footer */}
        <div className='text-center opacity-20 grayscale transition-all duration-700 hover:opacity-100 hover:grayscale-0'>
            <div className='flex items-center justify-center gap-16 text-[9px] font-black tracking-[0.4em] uppercase text-gray-400'>
                <span>Secure SSL Processing</span>
                <span>PCI DSS Compliant</span>
                <span>Stripe Verified Partner</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Credits