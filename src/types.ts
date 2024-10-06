export interface Project {
  id: number
  title: string
  description: string
  supporters: number
  fundingGoal: number
  currentFunding: number
  impact: string
  category: string
  location: string
  carbonOffset: number
  image: string
}

export interface UtilizationStep {
  date: string
  description: string
  amount: number
  percentage: number
  proofImage: string // Add this line
}

export interface Donation {
  id: number
  projectId: number
  projectTitle: string
  amount: number
  date: string
  status: string
  utilization: UtilizationStep[]
}