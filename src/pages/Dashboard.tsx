import React, { useEffect, useState } from 'react'
import { Wallet, Leaf, Users, AlertTriangle } from 'lucide-react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { createProjectRecommendationModel, getProjectRecommendations, createRiskAssessmentModel, assessProjectRisk } from '../utils/aiModel'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface CarbonDataItem {
  date: string;
  value: number;
}

const Dashboard: React.FC = () => {
  const [carbonData, setCarbonData] = useState<CarbonDataItem[]>([])
  const [recommendationScore, setRecommendationScore] = useState<number | null>(null)
  const [riskScore, setRiskScore] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCarbonData = async () => {
      try {
        // Simulating API call with local data to avoid CORS issues
        const simulatedData: CarbonDataItem[] = Array.from({ length: 30 }, (_, i) => ({
          date: new Date(2024, 0, i + 1).toISOString().split('T')[0],
          value: Math.floor(Math.random() * 100) + 100 // Random value between 100 and 200
        }));
        setCarbonData(simulatedData);
      } catch (error) {
        console.error('Error fetching carbon intensity data:', error)
        setError('Failed to fetch carbon intensity data. Please try again later.')
      }
    }

    const runAIModels = async () => {
      try {
        // Project Recommendation
        const recommendationModel = await createProjectRecommendationModel()
        const userProfile = [0.7, 0.3, 0.8, 0.5, 0.9] // Example user profile
        const recScore = await getProjectRecommendations(userProfile, recommendationModel)
        setRecommendationScore(recScore)

        // Risk Assessment
        const riskModel = await createRiskAssessmentModel()
        const projectData = [0.6, 0.4, 0.7, 0.5] // Example project data
        const risk = await assessProjectRisk(projectData, riskModel)
        setRiskScore(risk)
      } catch (error) {
        console.error('Error running AI models:', error)
        setError('Failed to generate AI recommendations. Please try again later.')
      }
    }

    fetchCarbonData()
    runAIModels()
  }, [])

  const chartData = {
    labels: carbonData.map(item => item.date),
    datasets: [
      {
        label: 'Carbon Intensity (gCO2/kWh)',
        data: carbonData.map(item => item.value),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Carbon Intensity Over Time'
      }
    }
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Your Sustainable Finance Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Wallet className="h-8 w-8 text-green-500 mb-2" />
          <h2 className="text-xl font-semibold mb-2">Portfolio Value</h2>
          <p className="text-3xl font-bold">$12,345</p>
          <p className="text-sm text-gray-500">+5.2% this month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Leaf className="h-8 w-8 text-green-500 mb-2" />
          <h2 className="text-xl font-semibold mb-2">Carbon Offset</h2>
          <p className="text-3xl font-bold">2.5 tons</p>
          <p className="text-sm text-gray-500">Equivalent to planting 40 trees</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Users className="h-8 w-8 text-green-500 mb-2" />
          <h2 className="text-xl font-semibold mb-2">Community Impact</h2>
          <p className="text-3xl font-bold">150 lives</p>
          <p className="text-sm text-gray-500">Positively impacted this year</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Carbon Intensity Trend</h2>
        {carbonData.length > 0 ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <p>Loading carbon intensity data...</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">AI Project Recommendation</h2>
          {recommendationScore !== null ? (
            <div>
              <p className="text-lg">Based on your profile, we recommend:</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {recommendationScore > 0.7 ? 'High Impact Projects' : 
                 recommendationScore > 0.4 ? 'Moderate Impact Projects' : 'Conservative Projects'}
              </p>
              <p className="text-sm text-gray-500 mt-2">Recommendation score: {recommendationScore.toFixed(2)}</p>
            </div>
          ) : (
            <p>Generating recommendation...</p>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Project Risk Assessment</h2>
          {riskScore !== null ? (
            <div>
              <p className="text-lg">Current project risk level:</p>
              <p className="text-3xl font-bold mt-2" style={{color: riskScore > 0.7 ? 'red' : riskScore > 0.4 ? 'orange' : 'green'}}>
                {riskScore > 0.7 ? 'High Risk' : riskScore > 0.4 ? 'Moderate Risk' : 'Low Risk'}
              </p>
              <p className="text-sm text-gray-500 mt-2">Risk score: {riskScore.toFixed(2)}</p>
            </div>
          ) : (
            <p>Assessing risk...</p>
          )}
        </div>
      </div>

      <div className="bg-green-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Sustainability Tips</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Consider investing in renewable energy projects for higher impact</li>
          <li>Offset your carbon footprint by supporting reforestation initiatives</li>
          <li>Engage with community projects to maximize your social impact</li>
        </ul>
      </div>
    </div>
  )
}

export default Dashboard