import React, { useState } from 'react'
import { BookOpen, Video, FileText, ChevronDown, ChevronUp } from 'lucide-react'

interface Course {
  title: string
  icon: React.ElementType
  duration: string
  level: string
  description: string
  modules: string[]
}

const Education: React.FC = () => {
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null)

  const courses: Course[] = [
    {
      title: 'Introduction to Sustainable Finance',
      icon: BookOpen,
      duration: '2 hours',
      level: 'Beginner',
      description: 'Learn the basics of sustainable finance and its impact on the global economy.',
      modules: [
        'What is Sustainable Finance?',
        'ESG Criteria and Its Importance',
        'Green Bonds and Social Bonds',
        'Sustainable Investment Strategies'
      ]
    },
    {
      title: 'ESG Investing Fundamentals',
      icon: Video,
      duration: '3 hours',
      level: 'Intermediate',
      description: 'Dive deep into Environmental, Social, and Governance (ESG) investing principles.',
      modules: [
        'Understanding ESG Factors',
        'ESG Integration in Investment Analysis',
        'ESG Scoring and Ratings',
        'Case Studies in ESG Investing'
      ]
    },
    {
      title: 'Impact Measurement and Reporting',
      icon: FileText,
      duration: '2.5 hours',
      level: 'Advanced',
      description: 'Master the techniques for measuring and reporting the impact of sustainable investments.',
      modules: [
        'Impact Metrics and KPIs',
        'Standardized Reporting Frameworks (GRI, SASB)',
        'Impact Valuation Techniques',
        'Creating Impactful Sustainability Reports'
      ]
    }
  ]

  const toggleCourse = (index: number) => {
    setExpandedCourse(expandedCourse === index ? null : index)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Financial Education Hub</h1>
      <p className="text-xl mb-8">Enhance your knowledge of sustainable finance and make informed investment decisions.</p>
      <div className="space-y-6">
        {courses.map((course, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start justify-between cursor-pointer" onClick={() => toggleCourse(index)}>
              <div className="flex items-center">
                <course.icon className="h-12 w-12 text-green-500 mr-4" />
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
                  <p className="text-gray-600">Duration: {course.duration} | Level: {course.level}</p>
                </div>
              </div>
              {expandedCourse === index ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
            </div>
            {expandedCourse === index && (
              <div className="mt-4">
                <p className="text-gray-700 mb-4">{course.description}</p>
                <h3 className="font-semibold mb-2">Course Modules:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {course.modules.map((module, moduleIndex) => (
                    <li key={moduleIndex}>{module}</li>
                  ))}
                </ul>
                <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                  Start Course
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-12 bg-green-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Why Learn with Us?</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Expert-curated content on sustainable finance</li>
          <li>Interactive lessons and real-world case studies</li>
          <li>Earn certificates to showcase your knowledge</li>
          <li>Stay updated with the latest trends in green investing</li>
        </ul>
      </div>
    </div>
  )
}

export default Education