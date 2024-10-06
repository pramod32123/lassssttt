import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import DonationHistory from './pages/DonationHistory'
import Education from './pages/Education'
import WorldWildlifeFund from './pages/WorldWildlifeFund'
import TheNatureConservancy from './pages/TheNatureConservancy'
import { Donation } from './types'

function App() {
  const [donations, setDonations] = useState<Donation[]>([])

  const addDonation = (donation: Donation) => {
    setDonations(prevDonations => [...prevDonations, donation])
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-blur">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home addDonation={addDonation} />} />
            <Route path="/donation-history" element={<DonationHistory donations={donations} />} />
            <Route path="/education" element={<Education />} />
            <Route path="/world-wildlife-fund" element={<WorldWildlifeFund addDonation={addDonation} />} />
            <Route path="/the-nature-conservancy" element={<TheNatureConservancy addDonation={addDonation} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App