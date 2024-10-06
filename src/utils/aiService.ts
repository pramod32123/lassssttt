import * as tf from '@tensorflow/tfjs';

interface ProjectData {
  [key: string]: {
    description: string;
    goals: string[];
    timeline: string;
    impact: string;
    challenges: string;
    team: string[];
    funding: {
      current: number;
      target: number;
    };
    location: string;
    partners: string[];
    updates: {
      date: string;
      content: string;
    }[];
  };
}

const projectData: ProjectData = {
  "Solar Power for Rural Schools": {
    description: "This project aims to bring renewable energy to underserved educational institutions in rural areas, improving learning conditions and reducing energy costs.",
    goals: [
      "Install solar panels in 10 schools",
      "Reduce energy costs by 50%",
      "Improve learning conditions for 1000+ students",
      "Train local technicians for maintenance",
      "Implement energy-saving practices in schools"
    ],
    timeline: "The project started in January 2024 and is expected to complete by December 2024. We're currently in the equipment procurement phase.",
    impact: "So far, we've installed solar panels in 4 schools, impacting over 400 students. Energy costs have been reduced by an average of 40% in these schools.",
    challenges: "The main challenges have been navigating local regulations, securing timely equipment deliveries, and adapting to varying infrastructure conditions in different schools.",
    team: ["Sarah Johnson - Project Manager", "Michael Chen - Solar Engineer", "Aisha Patel - Community Liaison"],
    funding: {
      current: 350000,
      target: 500000
    },
    location: "Rural districts of Maharashtra, India",
    partners: ["SolarTech Industries", "Rural Education Foundation", "Green Energy Initiative"],
    updates: [
      {
        date: "2024-03-15",
        content: "Completed installation in the first two schools. Initial feedback from teachers and students is very positive."
      },
      {
        date: "2024-05-01",
        content: "Secured additional funding from a local corporate sponsor. This will allow us to add two more schools to the project."
      }
    ]
  },
  "Reforestation Initiative": {
    description: "This project focuses on planting trees to combat deforestation and climate change in the Amazon Rainforest, while engaging local communities in sustainable practices.",
    goals: [
      "Plant 10,000 trees",
      "Restore 100 hectares of forest",
      "Engage 500 local community members",
      "Establish 5 community-led nurseries",
      "Implement sustainable agroforestry practices"
    ],
    timeline: "The project is ongoing, with seasonal planting cycles. It started in March 2024 and will continue for 5 years, with annual progress reviews.",
    impact: "We've planted 3,000 trees so far, restoring 30 hectares and engaging 150 local community members. Two community nurseries have been established.",
    challenges: "We're facing challenges with illegal logging activities and need to increase our protection efforts. Engaging more youth in the project is also a priority.",
    team: ["Dr. Carlos Mendoza - Lead Ecologist", "Maria Silva - Community Coordinator", "John Doe - Forestry Expert"],
    funding: {
      current: 750000,
      target: 2000000
    },
    location: "Para State, Brazil",
    partners: ["Amazon Conservation Association", "Local Indigenous Communities", "EcoTech Drones for monitoring"],
    updates: [
      {
        date: "2024-04-10",
        content: "Successfully completed the first planting season. Local engagement exceeded expectations."
      },
      {
        date: "2024-06-22",
        content: "Implemented drone monitoring system to track forest growth and detect any illegal activities."
      }
    ]
  },
  "Urban Reforestation Project": {
    description: "This project aims to increase urban green spaces by planting trees in city areas, improving air quality and providing habitats for urban wildlife.",
    goals: [
      "Plant 1,000 trees in urban areas",
      "Increase urban canopy cover by 5%",
      "Engage 1,000 community volunteers",
      "Establish 10 community gardens",
      "Implement sustainable urban forestry practices"
    ],
    timeline: "The project started in March 2024 and will continue for 2 years, with seasonal planting cycles.",
    impact: "We've planted 300 trees so far, engaging 250 community volunteers. Two community gardens have been established.",
    challenges: "Main challenges include limited space in urban areas, ensuring proper care for young trees, and coordinating with city authorities.",
    team: ["Emily Chen - Urban Planner", "David Smith - Arborist", "Sophia Rodriguez - Community Outreach Coordinator"],
    funding: {
      current: 200000,
      target: 500000
    },
    location: "New York City, USA",
    partners: ["NYC Parks Department", "Local Schools", "Urban Greening Initiative"],
    updates: [
      {
        date: "2024-04-15",
        content: "Completed first phase of planting in Central Park. Community response has been overwhelmingly positive."
      },
      {
        date: "2024-05-20",
        content: "Launched educational program in local schools to teach students about urban forestry and tree care."
      }
    ]
  },
  "Clean Water Access Initiative": {
    description: "This project focuses on providing clean water access to rural communities through well drilling, water purification systems, and rainwater harvesting.",
    goals: [
      "Install 50 water wells",
      "Implement water purification systems in 100 households",
      "Set up 20 community rainwater harvesting systems",
      "Train 200 community members in water management",
      "Reduce waterborne diseases by 50% in target areas"
    ],
    timeline: "The project began in January 2024 and will run for 3 years, with quarterly progress reviews.",
    impact: "We've installed 15 wells and 30 household purification systems, benefiting over 5,000 people. Waterborne diseases have decreased by 30% in these areas.",
    challenges: "Challenges include difficult terrain for well drilling, ensuring long-term maintenance of systems, and changing traditional water use habits.",
    team: ["Dr. Amina Hassan - Water Engineer", "Robert Lee - Community Health Specialist", "Grace Muthoni - Local Liaison"],
    funding: {
      current: 600000,
      target: 1500000
    },
    location: "Rural areas of Kenya and Tanzania",
    partners: ["Water for All NGO", "Local Health Clinics", "Government Water Departments"],
    updates: [
      {
        date: "2024-03-01",
        content: "Completed installation of first 10 wells. Water quality tests show excellent results."
      },
      {
        date: "2024-04-30",
        content: "Launched community training program on water management and hygiene practices."
      }
    ]
  }
};

// Simple sentiment analysis function
function analyzeSentiment(text: string): number {
  const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'terrific', 'outstanding'];
  const negativeWords = ['bad', 'poor', 'terrible', 'awful', 'horrible', 'dreadful', 'disappointing'];
  
  const words = text.toLowerCase().split(/\s+/);
  let sentiment = 0;
  
  words.forEach(word => {
    if (positiveWords.includes(word)) sentiment++;
    if (negativeWords.includes(word)) sentiment--;
  });
  
  return sentiment;
}

// Function to get project recommendations based on user input
function getProjectRecommendations(userInput: string): string[] {
  const keywords = userInput.toLowerCase().split(/\s+/);
  const projectScores: { [key: string]: number } = {};

  Object.entries(projectData).forEach(([projectName, data]) => {
    let score = 0;
    const projectText = `${projectName} ${data.description} ${data.goals.join(' ')} ${data.location}`.toLowerCase();
    keywords.forEach(keyword => {
      if (projectText.includes(keyword)) score++;
    });
    projectScores[projectName] = score;
  });

  return Object.entries(projectScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([projectName]) => projectName);
}

export const generateAIResponse = (projectTitle: string, userInput: string): string => {
  const project = projectData[projectTitle];
  const lowercaseInput = userInput.toLowerCase().trim();

  // Greetings
  if (/^(hello|hi|hey|greetings|good\s+(morning|afternoon|evening))/.test(lowercaseInput)) {
    return `Hello! I'm here to assist you with information about the ${projectTitle} project. How can I help you today?`;
  }

  // Farewells
  if (/^(bye|goodbye|see\s+you|farewell|take\s+care)/.test(lowercaseInput)) {
    return `Goodbye! Thank you for your interest in the ${projectTitle} project. Feel free to come back if you have any more questions.`;
  }

  // Thank you
  if (/^(thank\s+you|thanks)/.test(lowercaseInput)) {
    return "You're most welcome. Please feel free to come back if you have any further questions.";
  }

  if (!project) {
    const recommendations = getProjectRecommendations(userInput);
    return `I'm sorry, I don't have specific information about this project. However, based on your question, you might be interested in these projects: ${recommendations.join(', ')}. Would you like to know more about any of these?`;
  }

  // Project description
  if (/what\s+is|tell\s+me\s+about|describe/.test(lowercaseInput)) {
    return project.description;
  }

  // Project goals
  if (/goals?|aims?|objectives?/.test(lowercaseInput)) {
    return `The main goals of this project are:\n${project.goals.map(goal => `- ${goal}`).join('\n')}`;
  }

  // Project timeline
  if (/timeline|schedule|when|duration|how\s+long/.test(lowercaseInput)) {
    return project.timeline;
  }

  // Project impact
  if (/impact|progress|achievement|results?/.test(lowercaseInput)) {
    return project.impact;
  }

  // Project challenges
  if (/challenges?|problems?|difficulties|obstacles/.test(lowercaseInput)) {
    return project.challenges;
  }

  // Project team
  if (/team|who\s+is\s+involved|people\s+working/.test(lowercaseInput)) {
    return `The key team members for this project are:\n${project.team.join('\n')}`;
  }

  // Project funding
  if (/funding|budget|money|cost/.test(lowercaseInput)) {
    return `The project has currently raised $${project.funding.current.toLocaleString()} out of the target $${project.funding.target.toLocaleString()}.`;
  }

  // Project location
  if (/where|location|place/.test(lowercaseInput)) {
    return `This project is located in ${project.location}.`;
  }

  // Project partners
  if (/partners|collaborators|who\s+else\s+is\s+involved/.test(lowercaseInput)) {
    return `The project partners include: ${project.partners.join(', ')}.`;
  }

  // Project updates
  if (/updates|recent\s+news|latest/.test(lowercaseInput)) {
    const latestUpdate = project.updates[project.updates.length - 1];
    return `The latest update from ${latestUpdate.date}: ${latestUpdate.content}`;
  }

  // Sentiment analysis and response
  const sentiment = analyzeSentiment(userInput);
  if (sentiment > 0) {
    return "I'm glad you're enthusiastic about this project! Is there anything specific you'd like to know more about?";
  } else if (sentiment < 0) {
    return "I'm sorry to hear you're concerned. Could you tell me more about what's troubling you regarding this project?";
  }

  // Default response
  return "I'm not sure about that specific aspect of the project. Would you like to know about the goals, timeline, impact, challenges, team, funding, location, or partners?";
};