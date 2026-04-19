import React from 'react'
import ReactMarkdown from 'react-markdown'

const Message = ({ message }) => {
  if (!message) return null
  const isUser = message.role === 'user'

  return (
    <div className={`flex items-start gap-6 animate-fade-in ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`text-[8px] font-black uppercase tracking-widest mt-1 min-w-[30px] ${isUser ? 'text-right' : 'text-left opacity-30'}`}>
        {isUser ? 'User' : 'Sys'}
      </div>
      <div className={`max-w-[85%] text-[13px] leading-relaxed markdown-content ${isUser ? 'opacity-80' : 'opacity-60'}`}>
        <ReactMarkdown>{message.content}</ReactMarkdown>
      </div>
    </div>
  )
}

export default Message