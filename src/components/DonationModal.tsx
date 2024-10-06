import React, { useState } from 'react'
import { X } from 'lucide-react'

interface DonationModalProps {
  charity: {
    title: string
    impact: string
  }
  onClose: () => void
  onDonate: (amount: number) => void
  walletBalance: number
}

const DonationModal: React.FC<DonationModalProps> = ({ charity, onClose, onDonate, walletBalance }) => {
  const [amount, setAmount] = useState('')
  const [step, setStep] = useState(1)

  const handleDonate = () => {
    const donationAmount = parseFloat(amount)
    if (isNaN(donationAmount) || donationAmount <= 0) {
      alert('Please enter a valid donation amount.')
      return
    }
    if (donationAmount > walletBalance) {
      alert('Insufficient funds. Please load more funds to your wallet.')
      return
    }
    setStep(2)
  }

  const handleConfirm = () => {
    onDonate(parseFloat(amount))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Support {charity.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        {step === 1 ? (
          <>
            <p className="mb-4">Your wallet balance: ${walletBalance}</p>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                Donation Amount ($)
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter amount"
              />
            </div>
            <div className="flex justify-between mb-4">
              <button
                onClick={() => setAmount('10')}
                className="bg-green-100 text-green-800 px-3 py-1 rounded"
              >
                $10
              </button>
              <button
                onClick={() => setAmount('25')}
                className="bg-green-100 text-green-800 px-3 py-1 rounded"
              >
                $25
              </button>
              <button
                onClick={() => setAmount('50')}
                className="bg-green-100 text-green-800 px-3 py-1 rounded"
              >
                $50
              </button>
              <button
                onClick={() => setAmount('100')}
                className="bg-green-100 text-green-800 px-3 py-1 rounded"
              >
                $100
              </button>
            </div>
            <button
              onClick={handleDonate}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
            >
              Donate
            </button>
          </>
        ) : (
          <>
            <p className="mb-4">You are about to donate ${amount} to {charity.title}.</p>
            <p className="mb-4">This donation will support: {charity.impact}</p>
            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleConfirm}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Confirm Donation
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default DonationModal