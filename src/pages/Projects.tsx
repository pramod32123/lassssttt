import React, { useState, useEffect } from 'react'
import { ThumbsUp, Users, DollarSign, Leaf, Search, Wallet } from 'lucide-react'
import DonationModal from '../components/DonationModal'
import { Project, Donation } from '../types'
import { charities } from '../data/charities'

interface ProjectsProps {
  addDonation: (donation: Donation) => void
}

const Projects: React.FC<ProjectsProps> = ({ addDonation }) => {
  const [projects, setProjects] = useState<Project[]>(charities)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [showDonationModal, setShowDonationModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [walletBalance, setWalletBalance] = useState(1100)
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

  const handleDonate = (project: Project) => {
    setSelectedProject(project)
    setShowDonationModal(true)
  }

  const handleDonationComplete = (amount: number) => {
    if (selectedProject) {
      addDonation({
        id: Date.now(),
        projectId: selectedProject.id,
        projectTitle: selectedProject.title,
        amount,
        date: new Date().toISOString(),
        status: 'Completed',
        utilization: []
      })
      setWalletBalance(prevBalance => prevBalance - amount)
      setShowDonationModal(false)
      setSelectedProject(null)
    }
  }

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === '' || project.category === categoryFilter)
  )

  const categories = Array.from(new Set(projects.map(project => project.category)))

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Community Projects</h1>
      
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
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(project => (
          <div key={project.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex items-center mb-2">
              <Users className="h-5 w-5 text-blue-500 mr-2" />
              <span>{project.supporters.toLocaleString()} supporters</span>
            </div>
            <div className="flex items-center mb-4">
              <DollarSign className="h-5 w-5 text-green-500 mr-2" />
              <span>${project.currentFunding.toLocaleString()} raised of ${project.fundingGoal.toLocaleString()}</span>
            </div>
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: `${(project.currentFunding / project.fundingGoal) * 100}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">{project.impact}</p>
            <button
              onClick={() => handleDonate(project)}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
            >
              Donate Now
            </button>
          </div>
        ))}
      </div>

      {showDonationModal && selectedProject && (
        <DonationModal
          project={selectedProject}
          onClose={() => setShowDonationModal(false)}
          onDonate={handleDonationComplete}
          walletBalance={walletBalance}
        />
      )}
    </div>
  )
}

export default Projects