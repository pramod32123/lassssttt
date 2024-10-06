import React from 'react'
import { MessageCircle, ThumbsUp, User } from 'lucide-react'

const CommunityForum: React.FC = () => {
  const discussions = [
    { title: 'Best practices for community solar projects', author: 'GreenInvestor', replies: 15, likes: 32 },
    { title: 'How to calculate the true impact of your investments', author: 'ImpactAnalyst', replies: 8, likes: 24 },
    { title: 'Upcoming sustainable finance regulations: What to expect', author: 'PolicyWatcher', replies: 20, likes: 45 },
    { title: 'Success story: My journey in ESG investing', author: 'EcoEntrepreneur', replies: 12, likes: 38 },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Community Forum</h1>
      <p className="text-xl mb-8">Connect with fellow sustainable finance enthusiasts and share your insights.</p>
      <div className="mb-8">
        <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors text-lg font-semibold">
          Start a New Discussion
        </button>
      </div>
      <div className="space-y-6">
        {discussions.map((discussion, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{discussion.title}</h2>
            <div className="flex items-center text-gray-600 mb-4">
              <User className="h-4 w-4 mr-2" />
              <span>{discussion.author}</span>
            </div>
            <div className="flex space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-1" />
                {discussion.replies} replies
              </span>
              <span className="flex items-center">
                <ThumbsUp className="h-4 w-4 mr-1" />
                {discussion.likes} likes
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 bg-green-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Community Guidelines</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Be respectful and constructive in your discussions</li>
          <li>Share knowledge and experiences to help others learn</li>
          <li>Avoid promotional content or spam</li>
          <li>Report any inappropriate behavior to moderators</li>
        </ul>
      </div>
    </div>
  )
}

export default CommunityForum