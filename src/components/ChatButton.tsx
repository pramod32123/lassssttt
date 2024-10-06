import React, { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import AIChatbot from './AIChatbot'

const ChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Chat With Us</span>
      </button>
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-white rounded-lg shadow-xl overflow-hidden">
          <AIChatbot projectTitle="General Inquiry" />
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
      )}
    </>
  )
}

export default ChatButton