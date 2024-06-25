const mongoose = require('mongoose');

module.exports = async (identities) => {
  const refactoredIdentities = identities.map(({ _id, first_name, last_name }) => ({
    _id,
    first_name,
    last_name,
    name: `${first_name} ${last_name}`,
  }));

  return [
    {
      title: "Language Poll: Fuelling IT Firm's Growth!",
      description:
        'Participate in our poll to choose the programming language with the most growth potential for our IT firm. Your input will shape our future – cast your vote now!',
      priority: 'high',
      question:
        "Which programming language do you think holds the most potential for our IT firm's growth and expansion?",
      totalVotes: 7,
      status: 'approved',
      active: true,
      options: [
        {
          _id: new mongoose.Types.ObjectId(),
          answer: 'Javascript',
          votes: 4,
          voters: [
            refactoredIdentities[0],
            refactoredIdentities[1],
            refactoredIdentities[2],
            refactoredIdentities[3],
          ],
        },
        {
          _id: new mongoose.Types.ObjectId(),
          answer: 'Java',
          votes: 2,
          voters: [refactoredIdentities[4], refactoredIdentities[5]],
        },
        {
          _id: new mongoose.Types.ObjectId(),
          answer: 'Assembly',
          votes: 1,
          voters: [refactoredIdentities[6]],
        },
      ],
      createdBy: refactoredIdentities[0],
      activatedAt: new Date(),
      daysUntilExpire: 7,
      isAnonymous: false,
      pollVoters: [
        refactoredIdentities[0],
        refactoredIdentities[1],
        refactoredIdentities[2],
        refactoredIdentities[3],
        refactoredIdentities[4],
        refactoredIdentities[5],
        refactoredIdentities[6],
      ],
    },
    {
      title: 'Frontend Framework Poll: Shape Our Web Apps!',
      description:
        'Help shape our web development strategy by choosing your favorite frontend JavaScript framework. Your vote counts! Contribute to our success – cast your vote now!',
      priority: 'high',
      question:
        "Which frontend JavaScript framework do you prefer for our IT firm's web applications?",
      totalVotes: 7,
      status: 'approved',
      active: false,
      options: [
        {
          _id: new mongoose.Types.ObjectId(),
          answer: 'React.js',
          votes: 1,
          voters: [refactoredIdentities[6]],
        },
        {
          _id: new mongoose.Types.ObjectId(),
          answer: 'Vue.js',
          votes: 2,
          voters: [refactoredIdentities[3], refactoredIdentities[2]],
        },
        {
          _id: new mongoose.Types.ObjectId(),
          answer: 'Angular',
          votes: 3,
          voters: [refactoredIdentities[1], refactoredIdentities[0], refactoredIdentities[4]],
        },
        {
          _id: new mongoose.Types.ObjectId(),
          answer: 'Svelte',
          votes: 1,
          voters: [refactoredIdentities[5]],
        },
      ],
      createdBy: refactoredIdentities[0],
      daysUntilExpire: 7,
      isAnonymous: false,
      pollVoters: [
        refactoredIdentities[0],
        refactoredIdentities[1],
        refactoredIdentities[2],
        refactoredIdentities[3],
        refactoredIdentities[4],
        refactoredIdentities[5],
        refactoredIdentities[6],
      ],
    },
    {
      title: 'Mobile App Development Poll: Choosing the Ideal Programming Language!',
      priority: 'high',
      question:
        'Which programming language would you like our IT firm to focus on for mobile app development?',
      totalVotes: 7,
      status: 'approved',
      active: false,
      options: [
        {
          _id: new mongoose.Types.ObjectId(),
          answer: 'Swift (iOS)',
          votes: 2,
          voters: [refactoredIdentities[6], refactoredIdentities[5]],
        },
        {
          _id: new mongoose.Types.ObjectId(),
          answer: 'Kotlin (Android)',
          votes: 3,
          voters: [refactoredIdentities[2], refactoredIdentities[0], refactoredIdentities[4]],
        },
        {
          _id: new mongoose.Types.ObjectId(),
          answer: 'React Native',
          votes: 1,
          voters: [refactoredIdentities[1]],
        },
        {
          _id: new mongoose.Types.ObjectId(),
          answer: 'Flutter',
          votes: 1,
          voters: [refactoredIdentities[3]],
        },
      ],
      createdBy: refactoredIdentities[0],
      daysUntilExpire: 7,
      isAnonymous: false,
      pollVoters: [
        refactoredIdentities[0],
        refactoredIdentities[1],
        refactoredIdentities[2],
        refactoredIdentities[3],
        refactoredIdentities[4],
        refactoredIdentities[5],
        refactoredIdentities[6],
      ],
    },
    {
      title: 'Cloud Provider Cost-effectiveness Poll',
      description:
        "Vote now for the most cost-effective cloud service provider for our IT firm's projects! Your input matters!",
      priority: 'medium',
      question:
        "Which cloud service provider do you believe offers the best cost-effectiveness for our IT firm's projects?",
      totalVotes: 5,
      status: 'approved',
      active: true,
      options: [
        {
          _id: new mongoose.Types.ObjectId(),
          answer: 'DigitalOcean',
          votes: 0,
          voters: [],
        },
        {
          _id: new mongoose.Types.ObjectId(),
          answer: 'Amazon Web Services (AWS)',
          votes: 1,
          voters: [refactoredIdentities[4]],
        },
        {
          _id: new mongoose.Types.ObjectId(),
          answer: 'Google Cloud Platform (GCP)',
          votes: 2,
          voters: [refactoredIdentities[5], refactoredIdentities[6]],
        },
        {
          _id: new mongoose.Types.ObjectId(),
          answer: 'Microsoft Azure',
          votes: 2,
          voters: [refactoredIdentities[1], refactoredIdentities[2]],
        },
      ],
      createdBy: refactoredIdentities[0],
      activatedAt: new Date(),
      daysUntilExpire: 7,
      isAnonymous: false,
      pollVoters: [
        refactoredIdentities[1],
        refactoredIdentities[2],
        refactoredIdentities[4],
        refactoredIdentities[5],
        refactoredIdentities[6],
      ],
    },
    {
      title: 'Research & Development Poll: Focus Area Prioritization',
      description:
        'Vote for the technology area our IT firm should prioritize for research and development. Cast your vote now!',
      priority: 'medium',
      question: 'Which technology area should our IT firm prioritize for research and development?',
      totalVotes: 5,
      status: 'approved',
      active: true,
      options: [
        {
          _id: new mongoose.Types.ObjectId(),
          answer: 'Artificial Intelligence (AI)',
          votes: 4,
          voters: [],
        },
        {
          _id: new mongoose.Types.ObjectId(),
          answer: 'Blockchain',
          votes: 1,
          voters: [],
        },
        {
          _id: new mongoose.Types.ObjectId(),
          answer: 'Internet of Things (IoT)',
          votes: 0,
          voters: [],
        },
      ],
      createdBy: refactoredIdentities[0],
      activatedAt: new Date(),
      daysUntilExpire: 7,
      isAnonymous: true,
      pollVoters: [
        refactoredIdentities[1],
        refactoredIdentities[2],
        refactoredIdentities[4],
        refactoredIdentities[5],
        refactoredIdentities[6],
      ],
    },
    {
      title: 'IT Project Management Poll: Improve Productivity!',
      priority: 'low',
      question:
        "Which IT project management methodology do you think will improve our firm's productivity?",
      totalVotes: 5,
      status: 'approved',
      active: true,
      options: [
        {
          _id: new mongoose.Types.ObjectId(),
          answer: 'Agile Scrum',
          votes: 2,
          voters: [],
        },
        {
          _id: new mongoose.Types.ObjectId(),
          answer: 'Kanban',
          votes: 2,
          voters: [],
        },
        {
          _id: new mongoose.Types.ObjectId(),
          answer: 'DevOps',
          votes: 1,
          voters: [],
        },
      ],
      createdBy: refactoredIdentities[0],
      activatedAt: new Date(),
      daysUntilExpire: 7,
      isAnonymous: true,
      pollVoters: [
        refactoredIdentities[1],
        refactoredIdentities[2],
        refactoredIdentities[4],
        refactoredIdentities[5],
        refactoredIdentities[6],
      ],
    },
  ];
};
