import React, { useState } from 'react'
import { Calendar, DollarSign, ChevronDown, ChevronUp, Leaf, Image as ImageIcon, ThumbsUp, ThumbsDown, Phone, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import AIChatbot from '../components/AIChatbot'
import { Donation } from '../types'

interface DonationHistoryProps {
  donations: Donation[]
}

const DonationHistory: React.FC<DonationHistoryProps> = ({ donations }) => {
  const [expandedDonation, setExpandedDonation] = useState<number | null>(null)
  const [expandedImplementation, setExpandedImplementation] = useState<{ [key: number]: number }>({})
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [showChatbot, setShowChatbot] = useState<{ [key: number]: boolean }>({})
  const [showComplaintMessage, setShowComplaintMessage] = useState<{ [key: number]: boolean }>({})

  const toggleDonation = (id: number) => {
    setExpandedDonation(expandedDonation === id ? null : id)
  }

  const toggleImplementation = (donationId: number, implementationIndex: number) => {
    setExpandedImplementation(prev => ({
      ...prev,
      [donationId]: prev[donationId] === implementationIndex ? -1 : implementationIndex
    }))
  }

  const toggleChatbot = (implementationId: number) => {
    setShowChatbot(prev => ({ ...prev, [implementationId]: !prev[implementationId] }))
  }

  const toggleComplaintMessage = (implementationId: number) => {
    setShowComplaintMessage(prev => ({ ...prev, [implementationId]: !prev[implementationId] }))
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  // Hardcoded donations
  const pastDonations: Donation[] = [
    {
      id: 1,
      projectId: 101,
      projectTitle: "Urban Reforestation Project",
      amount: 500,
      date: "2024-01-15T10:30:00Z",
      status: "Completed",
      utilization: [
        {
          date: "2024-02-01T09:00:00Z",
          description: "Tree planting in Central Park",
          amount: 100,
          percentage: 20,
          proofImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
          date: "2024-02-15T14:00:00Z",
          description: "Community garden setup",
          amount: 150,
          percentage: 30,
          proofImage: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
          date: "2024-03-01T11:00:00Z",
          description: "Urban beehive installation",
          amount: 75,
          percentage: 15,
          proofImage: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
          date: "2024-03-15T13:30:00Z",
          description: "Rooftop garden development",
          amount: 100,
          percentage: 20,
          proofImage: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
          date: "2024-04-01T10:00:00Z",
          description: "Green wall installation",
          amount: 75,
          percentage: 15,
          proofImage: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        }
      ]
    },
    {
      id: 2,
      projectId: 102,
      projectTitle: "Clean Water Access Initiative",
      amount: 750,
      date: "2024-02-20T14:45:00Z",
      status: "Completed",
      utilization: [
        {
          date: "2024-03-05T08:30:00Z",
          description: "Well drilling in Chhampi village",
          amount: 200,
          percentage: 26.67,
          proofImage: "https://images.unsplash.com/photo-1594398901394-4e34939a4fd0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
          date: "2024-03-20T10:00:00Z",
          description: "Water purification system installation",
          amount: 250,
          percentage: 33.33,
          proofImage: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
          date: "2024-04-05T09:15:00Z",
          description: "Rainwater harvesting system setup",
          amount: 150,
          percentage: 20,
          proofImage: "https://images.unsplash.com/photo-1541698444083-023c97d3f4b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
          date: "2024-04-20T11:30:00Z",
          description: "Community water management training",
          amount: 75,
          percentage: 10,
          proofImage: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
          date: "2024-05-05T13:00:00Z",
          description: "Solar-powered water filtration unit installation",
          amount: 75,
          percentage: 10,
          proofImage: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        }
      ]
    }
  ]

  // Combine dummy donations with user donations
  const allDonations = [...pastDonations, ...donations]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center text-green-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Green Impact Journey
      </motion.h1>
      {allDonations.length === 0 ? (
        <motion.p 
          className="text-center text-gray-500 text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          You haven't made any donations yet. Start your journey to make a difference!
        </motion.p>
      ) : (
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {allDonations.map((donation) => (
            <motion.div 
              key={donation.id} 
              className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleDonation(donation.id)}>
                <div>
                  <h2 className="text-2xl font-semibold">{donation.projectTitle}</h2>
                  <div className="flex items-center mt-2">
                    <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-500">{new Date(donation.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    <DollarSign className="h-6 w-6 text-green-500 mr-1" />
                    <span className="text-2xl font-bold text-green-500">{donation.amount}</span>
                  </div>
                  <span className="text-sm text-gray-500">{donation.status}</span>
                </div>
              </div>
              <AnimatePresence>
                {expandedDonation === donation.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mt-4 space-y-4">
                      <h3 className="text-xl font-semibold">Utilization Details:</h3>
                      {donation.utilization.map((item, index) => (
                        <div key={index} className="border-t pt-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold">{item.description}</p>
                              <p className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-green-500">${item.amount}</p>
                              <p className="text-sm text-gray-500">{item.percentage}% of total</p>
                            </div>
                          </div>
                          <div className="mt-2 flex items-center space-x-4">
                            <button
                              onClick={() => toggleImplementation(donation.id, index)}
                              className="flex items-center text-blue-500 hover:text-blue-700"
                            >
                              <ImageIcon className="h-4 w-4 mr-1" />
                              View Proof
                              {expandedImplementation[donation.id] === index ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                            </button>
                            <button
                              onClick={() => toggleChatbot(donation.id * 100 + index)}
                              className="flex items-center text-green-500 hover:text-green-700"
                            >
                              <Leaf className="h-4 w-4 mr-1" />
                              Discuss Project
                            </button>
                            <div className="flex items-center space-x-2">
                              <button className="text-green-500 hover:text-green-700">
                                <ThumbsUp className="h-4 w-4" />
                              </button>
                              <button 
                                className="text-red-500 hover:text-red-700"
                                onClick={() => toggleComplaintMessage(donation.id * 100 + index)}
                              >
                                <ThumbsDown className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          {showComplaintMessage[donation.id * 100 + index] && (
                            <p className="mt-2 text-red-500 text-sm">
                              Are you suspicious of this charity? You can file a complaint here: <a href="https://www.dfs.ny.gov/complaint" target="_blank" rel="noopener noreferrer" className="underline">https://www.dfs.ny.gov/complaint</a>
                            </p>
                          )}
                          {expandedImplementation[donation.id] === index && (
                            <div className="mt-2">
                              <img
                                src={item.proofImage}
                                alt={`Proof for ${item.description}`}
                                className="w-full h-48 object-cover rounded-lg cursor-pointer"
                                onClick={() => setSelectedImage(item.proofImage)}
                              />
                            </div>
                          )}
                          {showChatbot[donation.id * 100 + index] && (
                            <div className="mt-4">
                              <AIChatbot projectTitle={donation.projectTitle} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      )}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeImageModal}>
          <div className="max-w-3xl max-h-3xl">
            <img src={selectedImage} alt="Proof of donation utilization" className="max-w-full max-h-full object-contain" />
          </div>
        </div>
      )}
    </div>
  )
}

export default DonationHistory