import React, { useState } from 'react'
import { Wallet, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'

const WorldWildlifeFund: React.FC = () => {
  const [walletBalance, setWalletBalance] = useState(1000)
  const [loadAmount, setLoadAmount] = useState('')

  const handleLoadWallet = () => {
    const amount = parseFloat(loadAmount)
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.')
      return
    }
    setWalletBalance(prevBalance => prevBalance + amount)
    setLoadAmount('')
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Wallet Box */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Wallet className="h-8 w-8 text-green-500 mr-3" />
            <span className="text-2xl font-semibold">Wallet Balance: ${walletBalance.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            value={loadAmount}
            onChange={(e) => setLoadAmount(e.target.value)}
            placeholder="Enter amount to load"
            className="flex-grow border rounded-l px-3 py-2"
          />
          <button
            onClick={handleLoadWallet}
            className="bg-green-500 text-white px-6 py-2 rounded-r hover:bg-green-600 transition-colors"
          >
            Load Funds
          </button>
        </div>
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => setLoadAmount('50')}
            className="bg-green-100 text-green-800 px-4 py-2 rounded hover:bg-green-200 transition-colors"
          >
            $50
          </button>
          <button
            onClick={() => setLoadAmount('100')}
            className="bg-green-100 text-green-800 px-4 py-2 rounded hover:bg-green-200 transition-colors"
          >
            $100
          </button>
          <button
            onClick={() => setLoadAmount('250')}
            className="bg-green-100 text-green-800 px-4 py-2 rounded hover:bg-green-200 transition-colors"
          >
            $250
          </button>
          <button
            onClick={() => setLoadAmount('500')}
            className="bg-green-100 text-green-800 px-4 py-2 rounded hover:bg-green-200 transition-colors"
          >
            $500
          </button>
        </div>
      </div>

      {/* Organization Info */}
      <div className="text-center mb-8">
        <img src="https://images.unsplash.com/photo-1550358864-518f202c02ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="World Wildlife Fund" className="w-48 h-48 mx-auto mb-4 rounded-full object-cover" />
        <h1 className="text-4xl font-bold mb-2">World Wildlife Fund</h1>
        <p className="text-xl text-green-600 mb-4">"For a Living Planet"</p>
        <Link to="/projects" className="bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors">
          Donate Now
        </Link>
      </div>

      {/* Successful Projects */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Successful Projects</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Protected over 1 billion acres of forest worldwide</li>
          <li>Doubled wild tiger populations in Nepal</li>
          <li>Established marine protected areas covering 15% of the world's oceans</li>
        </ul>
      </div>

      {/* About the Organization */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">About World Wildlife Fund</h2>
        <p>
          World Wildlife Fund (WWF) is the world's leading conservation organization, working in 100 countries for nearly half a century. With the support of almost 5 million members worldwide, WWF is dedicated to delivering science-based solutions to preserve the diversity and abundance of life on Earth, halt the degradation of the environment, and combat climate change.
        </p>
      </div>

      {/* Social Impact */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Our Social Impact</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Conserved over 600 million acres of critical habitat</li>
          <li>Reduced deforestation rates by 75% in key areas</li>
          <li>Helped protect endangered species like pandas, rhinos, and elephants</li>
          <li>Engaged millions of people in conservation efforts worldwide</li>
        </ul>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center space-x-4">
        <a href="https://www.facebook.com/worldwildlifefund" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
          <Facebook />
        </a>
        <a href="https://twitter.com/world_wildlife" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
          <Twitter />
        </a>
        <a href="https://www.instagram.com/worldwildlifefund" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
          <Instagram />
        </a>
        <a href="https://www.youtube.com/user/WorldWildlifeFund" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
          <Youtube />
        </a>
      </div>
    </div>
  )
}

export default WorldWildlifeFund