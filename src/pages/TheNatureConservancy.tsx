import React, { useState } from 'react'
import { Wallet, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'

const TheNatureConservancy: React.FC = () => {
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
        <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="The Nature Conservancy" className="w-48 h-48 mx-auto mb-4 rounded-full object-cover" />
        <h1 className="text-4xl font-bold mb-2">The Nature Conservancy</h1>
        <p className="text-xl text-green-600 mb-4">"Conserving the Lands and Waters on Which All Life Depends"</p>
        <Link to="/projects" className="bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors">
          Donate Now
        </Link>
      </div>

      {/* Successful Projects */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Successful Projects</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Protected more than 119 million acres of land and thousands of miles of rivers worldwide</li>
          <li>Implemented large-scale conservation projects in 72 countries</li>
          <li>Helped establish more than 100 marine conservation areas</li>
        </ul>
      </div>

      {/* About the Organization */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">About The Nature Conservancy</h2>
        <p>
          The Nature Conservancy is a global environmental nonprofit working to create a world where people and nature can thrive. Founded in the U.S. through grassroots action in 1951, The Nature Conservancy has grown to become one of the most effective and wide-reaching environmental organizations in the world. Thanks to more than a million members and the dedicated efforts of our diverse staff and over 400 scientists, we impact conservation in 79 countries and territories across six continents.
        </p>
      </div>

      {/* Social Impact */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Our Social Impact</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Planted more than 1.6 million acres of habitat</li>
          <li>Restored thousands of river miles for fish and wildlife</li>
          <li>Reduced deforestation rates in key areas by up to 75%</li>
          <li>Helped protect more than 5,000 miles of river systems</li>
        </ul>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center space-x-4">
        <a href="https://www.facebook.com/thenatureconservancy" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
          <Facebook />
        </a>
        <a href="https://twitter.com/nature_org" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
          <Twitter />
        </a>
        <a href="https://www.instagram.com/nature_org" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
          <Instagram />
        </a>
        <a href="https://www.youtube.com/user/NatureConservancy" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
          <Youtube />
        </a>
      </div>
    </div>
  )
}

export default TheNatureConservancy