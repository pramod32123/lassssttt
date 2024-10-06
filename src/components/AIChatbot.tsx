import React, { useState, useEffect, useRef } from 'react'
import { Send, Bot } from 'lucide-react'
import { generateAIResponse } from '../utils/aiService'

interface Message {
  text: string
  isUser: boolean
}

interface AIChatbotProps {
  projectTitle: string
}

const AIChatbot: React.FC<AIChatbotProps> = ({ projectTitle }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    const welcomeMessage = generateAIResponse(projectTitle, 'hello')
    setMessages([{ text: welcomeMessage, isUser: false }])
  }, [projectTitle])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (input.trim() === '') return

    const userMessage: Message = { text: input, isUser: true }
    setMessages(prevMessages => [...prevMessages, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const aiResponse = generateAIResponse(projectTitle, input)
      const aiMessage: Message = { text: aiResponse, isUser: false }
      setMessages(prevMessages => [...prevMessages, aiMessage])
    } catch (error) {
      console.error('Error generating AI response:', error)
      const errorMessage: Message = { text: "I'm sorry, I couldn't process your request. Please try again.", isUser: false }
      setMessages(prevMessages => [...prevMessages, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-6 border rounded-lg overflow-hidden bg-white shadow-md">
      <div className="bg-green-100 p-3 flex items-center">
        <Bot className="h-6 w-6 text-green-600 mr-2" />
        <h3 className="font-semibold">Project AI Assistant</h3>
      </div>
      <div className="h-64 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-3 ${message.isUser ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${message.isUser ? 'bg-green-100' : 'bg-gray-100'}`}>
              {message.text}
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="text-center">
            <span className="inline-block p-2 rounded-lg bg-gray-100">Thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-3 bg-gray-50 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask about the project..."
          className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-300"
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          className="bg-green-500 text-white p-2 rounded-r-lg hover:bg-green-600 transition-colors disabled:bg-gray-400"
          disabled={isLoading}
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

export default AIChatbot