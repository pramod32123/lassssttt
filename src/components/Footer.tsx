import React from 'react'
import { Heart } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-800 text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <p className="flex items-center justify-center">
          Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> by EcoAIde for a Sustainable Future
        </p>
      </div>
    </footer>
  )
}

export default Footer