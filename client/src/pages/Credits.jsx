import React, { useState } from 'react'

const Credits = () => {
  const [billingCycle, setBillingCycle] = useState('ONE-TIME')

  const topupPlans = [
    { name: 'STARTER PACK', price: '$29', credits: '5K', features: ['Priority Queue access', 'Standard Image Gen', '1-month credit expiry'], button: 'Select Starter' },
    { name: 'PRO CURATOR', price: '$79', credits: '20K', featured: true, features: ['Ultra-Priority access', 'Raw 4K Visual Export', 'Infinite Rollover', 'Custom Model Fine-tuning'], button: 'Upgrade to Pro' },
    { name: 'ENTERPRISE', price: 'Custom', credits: '', features: ['Dedicated GPU allocation', 'On-premise deployment', 'SSO & SAML Integration'], button: 'Contact Sales' }
  ]

  const invoices = [
    { id: 'INV-2024-0082', date: 'AUG 12, 2024', method: 'STRIPE PAYMENT', amount: '$79.00', status: 'PAID' },
    { id: 'INV-2024-0041', date: 'JUL 12, 2024', method: 'STRIPE PAYMENT', amount: '$79.00', status: 'PAID' }
  ]

  return (
    <div className='flex-1 h-full bg-[#050505] flex flex-col relative overflow-hidden font-sans'>
      {/* Header */}
      <header className='flex justify-between items-center px-10 py-6 border-b border-white/5 bg-black/50 backdrop-blur-xl z-20'>
        <div className='flex items-center gap-2'>
            <span className='text-[10px] font-bold text-gray-600 uppercase tracking-widest'>Lens // Billing</span>
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

      <main className='flex-1 overflow-y-auto p-10 space-y-20 custom-scrollbar'>
        <div className='max-w-6xl mx-auto'>
          {/* Page Hero */}
          <div className='mb-12'>
            <h1 className='text-4xl font-bold tracking-tight mb-4'>Credit Hub</h1>
            <p className='text-gray-400 text-sm max-w-2xl leading-relaxed'>
              Manage your digital assets and model permissions. Your usage is calculated based on token complexity and inference time.
            </p>
          </div>

          {/* Usage Cards */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* Balance */}
            <div className='bg-[#111] border border-white/5 p-8 rounded-2xl flex flex-col justify-between min-h-[220px] shadow-2xl relative overflow-hidden'>
               <div className='space-y-1 relative z-10'>
                 <p className='text-[10px] font-bold text-gray-600 uppercase tracking-widest'>Available Balance</p>
                 <p className='text-4xl font-bold font-metric'>12,450</p>
               </div>
               <div className='absolute right-8 top-12 opacity-10 bg-white/10 rounded-xl p-4'>
                 <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
               </div>
               <div className='space-y-4 relative z-10'>
                  <div className='h-1.5 w-full bg-white/5 rounded-full overflow-hidden'>
                    <div className='h-full bg-white w-1/4'></div>
                  </div>
                  <p className='text-[10px] text-gray-600 font-bold uppercase'>Used 3,550 of 16,000 monthly allotment</p>
               </div>
            </div>

            {/* Intelligence Usage */}
            <div className='bg-[#111] border border-white/5 p-8 rounded-2xl flex flex-col justify-between min-h-[220px] shadow-2xl'>
               <div className='flex justify-between items-start'>
                  <div className='space-y-1'>
                    <p className='text-[10px] font-bold text-gray-600 uppercase tracking-widest'>Intelligence Usage</p>
                    <p className='text-3xl font-bold font-metric'>8.2k Credits</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
               </div>
               <div className='space-y-3'>
                  <div className='flex justify-between items-center text-[11px] font-bold'>
                    <span className='text-gray-500'>GPT-4o Obsidian</span>
                    <span className='text-gray-400 font-metric'>5,400</span>
                  </div>
                  <div className='flex justify-between items-center text-[11px] font-bold'>
                    <span className='text-gray-500'>Claude 3.5 Sonnet</span>
                    <span className='text-gray-400 font-metric'>2,800</span>
                  </div>
                  <button className='text-[10px] font-bold text-gray-600 hover:text-white flex items-center gap-2 pt-2 transition-colors uppercase tracking-widest'>
                    View detail logs 
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
               </div>
            </div>

            {/* Visual Studio Usage */}
            <div className='bg-[#111] border border-white/5 p-8 rounded-2xl flex flex-col justify-between min-h-[220px] shadow-2xl'>
               <div className='flex justify-between items-start'>
                  <div className='space-y-1'>
                    <p className='text-[10px] font-bold text-gray-600 uppercase tracking-widest'>Visual Studio Usage</p>
                    <p className='text-3xl font-bold font-metric'>4.2k Credits</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3 1.912 5.813a2 2 0 0 0 1.272 1.272L21 12l-5.813 1.912a2 2 0 0 0-1.272 1.272L12 21l-1.912-5.813a2 2 0 0 0-1.272-1.272L3 12l5.813-1.912a2 2 0 0 0 1.272-1.272L12 3Z"/></svg>
               </div>
               <div className='space-y-3'>
                  <div className='flex justify-between items-center text-[11px] font-bold'>
                    <span className='text-gray-500'>Stable Diffusion XL</span>
                    <span className='text-gray-400 font-metric'>3,100</span>
                  </div>
                  <div className='flex justify-between items-center text-[11px] font-bold'>
                    <span className='text-gray-500'>DALL-E 3 High Res</span>
                    <span className='text-gray-400 font-metric'>1,150</span>
                  </div>
                  <button className='text-[10px] font-bold text-gray-600 hover:text-white flex items-center gap-2 pt-2 transition-colors uppercase tracking-widest'>
                    View gallery history 
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
               </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className='mt-32 space-y-12'>
            <div className='flex justify-between items-end'>
              <h2 className='text-3xl font-bold'>Top-up Balance</h2>
              <div className='bg-[#111] p-1 rounded-lg flex border border-white/5'>
                {['ONE-TIME', 'SUBSCRIPTION'].map(type => (
                  <button 
                    key={type}
                    onClick={() => setBillingCycle(type)}
                    className={`px-4 py-2 rounded-md text-[9px] font-bold tracking-widest uppercase transition-all ${billingCycle === type ? 'bg-[#222] text-white' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {topupPlans.map(plan => (
                <div key={plan.name} className={`bg-[#111] border ${plan.featured ? 'border-white/20' : 'border-white/5'} p-10 rounded-2xl flex flex-col relative shadow-2xl`}>
                  {plan.featured && (
                    <div className='absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-widest'>
                      Most Popular
                    </div>
                  )}
                  <p className='text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-10'>{plan.name}</p>
                  <div className='flex items-baseline gap-2 mb-10'>
                     <span className='text-5xl font-bold tracking-tighter'>{plan.price}</span>
                     {plan.credits && <span className='text-gray-600 text-sm font-bold'>/ {plan.credits} Credits</span>}
                  </div>
                  <ul className='space-y-4 mb-12 flex-1'>
                    {plan.features.map(feat => (
                      <li key={feat} className='flex items-start gap-4'>
                         <svg className="w-4 h-4 text-white/40 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                         <span className='text-xs font-bold text-gray-400'>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${plan.featured ? 'bg-white text-black hover:bg-gray-200' : 'bg-[#1a1a1a] text-gray-300 hover:text-white border border-white/5'}`}>
                    {plan.button}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Invoices */}
          <div className='mt-32 space-y-8'>
            <div className='flex justify-between items-end'>
              <h2 className='text-2xl font-bold'>Recent Invoices</h2>
              <button className='text-[9px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors'>Download All (CSV)</button>
            </div>
            <div className='space-y-2'>
              {invoices.map(inv => (
                <div key={inv.id} className='bg-[#111] border border-white/5 p-6 rounded-2xl flex items-center group hover:bg-[#151515] transition-colors'>
                  <div className='w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-gray-600 mr-8'>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
                  </div>
                  <div className='flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4 items-center'>
                     <div className='flex flex-col'>
                        <span className='text-xs font-bold text-white'>{inv.id}</span>
                        <span className='text-[9px] font-bold text-gray-600 uppercase tracking-widest'>{inv.date} • {inv.method}</span>
                     </div>
                     <div className='text-right lg:text-left'>
                        <span className='text-xs font-bold font-metric'>{inv.amount}</span>
                     </div>
                     <div className='hidden lg:flex justify-center'>
                        <span className='px-3 py-1 bg-white/5 rounded-md text-[9px] font-bold tracking-widest text-gray-400 border border-white/10'>{inv.status}</span>
                     </div>
                     <div className='flex justify-end'>
                        <button className='text-gray-600 hover:text-white transition-colors p-2'>
                           <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>
                        </button>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Compliance Footer */}
      <footer className='border-t border-white/5 px-10 py-10'>
         <div className='max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 opacity-40'>
            <div className='flex gap-10'>
               <span className='text-[9px] font-bold text-gray-600 uppercase tracking-widest flex items-center gap-2'>
                 <svg className="w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                 Secure Checkout by Stripe
               </span>
               <span className='text-[9px] font-bold text-gray-600 uppercase tracking-widest'>Data Encrypted (AES-256)</span>
            </div>
            <div className='flex gap-10 text-[9px] font-bold text-gray-600 uppercase tracking-widest'>
               <a href="#" className='hover:text-white'>Privacy Policy</a>
               <a href="#" className='hover:text-white'>Terms of Service</a>
               <a href="#" className='hover:text-white'>Refund Policy</a>
            </div>
         </div>
      </footer>
    </div>
  )
}

export default Credits