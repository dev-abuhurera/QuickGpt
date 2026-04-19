import React from 'react'
import { createPortal } from 'react-dom'

const Modal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', type = 'default' }) => {
  if (!isOpen) return null

  return createPortal(
    <div className='fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm'>
      <div className='formal-card w-full max-w-sm p-8 animate-fade-in shadow-2xl'>
        <h3 className='text-lg font-bold mb-3'>{title}</h3>
        <p className='text-sm opacity-60 mb-8 leading-relaxed'>{message}</p>
        <div className='flex gap-3 justify-end'>
          <button 
            onClick={onClose}
            className='formal-btn-outline py-2 px-4 text-xs'
          >
            Cancel
          </button>
          <button 
            onClick={() => { onConfirm(); onClose(); }}
            className={`formal-btn py-2 px-4 text-xs ${type === 'danger' ? 'bg-red-600' : ''}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Modal
