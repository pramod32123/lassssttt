import React, { useState } from 'react'
import { Wallet, Search, Leaf } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { charities } from '../data/charities'
import DonationModal from '../components/DonationModal'
import { Donation } from '../types'

interface HomeProps {
  addDonation: (donation: Donation) => void
}

const Home: React.FC<HomeProps> = ({ addDonation }) => {
  const [walletBalance, setWalletBalance] = useState(1000)
  const [loadAmount, setLoadAmount] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [showDonationModal, setShowDonationModal] = useState(false)
  const [selectedCharity, setSelectedCharity] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleLoadWallet = () => {
    const amount = parseFloat(loadAmount)
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.')
      return
    }
    setWalletBalance(prevBalance => prevBalance + amount)
    setLoadAmount('')
  }

  const filterCharities = () => {
    return charities.filter(charity => 
      charity.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'ALL' || charity.category === selectedCategory)
    )
  }

  const handleDonateClick = (charity: any) => {
    setSelectedCharity(charity)
    setShowDonationModal(true)
  }

  const handleDonationComplete = (amount: number) => {
    if (selectedCharity) {
      const newDonation: Donation = {
        id: Date.now(),
        projectId: selectedCharity.id,
        projectTitle: selectedCharity.title,
        amount,
        date: new Date().toISOString(),
        status: 'Completed',
        utilization: [
          {
            date: new Date().toISOString(),
            description: `Initial donation to ${selectedCharity.title}`,
            amount,
            percentage: 100,
            proofImage: selectedCharity.image
          }
        ]
      }
      addDonation(newDonation)
      setWalletBalance(prevBalance => prevBalance - amount)
      setShowDonationModal(false)
      setSelectedCharity(null)
      navigate('/donation-history')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <div className="flex justify-center items-center mb-4">
          <Leaf className="h-12 w-12 text-green-500 mr-3" />
          <h1 className="text-5xl font-bold text-green-800">EcoAIde</h1>
        </div>
        <p className="text-2xl text-green-600 font-light">Plant Hope, Harvest Change</p>
        <div className="mt-6 w-32 h-1 bg-green-500 mx-auto rounded-full"></div>
      </div>
      
      {/* Wallet Box */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-3xl mx-auto">
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

      {/* Search and Filter */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <div className="flex-grow">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border rounded"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-8 flex justify-center space-x-4">
        {['ALL', 'FOR YOU', 'TRENDING', 'POPULAR'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-colors`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filterCharities().map(charity => (
          <div key={charity.id} className="bg-white p-6 rounded-lg shadow-md">
            <img src={charity.image} alt={charity.title} className="w-full h-48 object-cover mb-4 rounded" />
            <h2 className="text-2xl font-semibold mb-2">{charity.title}</h2>
            <p className="text-gray-600 mb-4">{charity.description}</p>
            <div className="flex items-center mb-2">
              <span className="text-sm text-gray-500">{charity.supporters.toLocaleString()} supporters</span>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-sm text-gray-500">${charity.currentFunding.toLocaleString()} raised of ${charity.fundingGoal.toLocaleString()}</span>
            </div>
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: `${(charity.currentFunding / charity.fundingGoal) * 100}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">{charity.impact}</p>
            <button
              onClick={() => handleDonateClick(charity)}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
            >
              Donate Now
            </button>
          </div>
        ))}
      </div>

      {showDonationModal && selectedCharity && (
        <DonationModal
          charity={selectedCharity}
          onClose={() => setShowDonationModal(false)}
          onDonate={handleDonationComplete}
          walletBalance={walletBalance}
        />
      )}
    </div>
  )
}

export default Home