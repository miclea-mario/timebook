const { applyFiltersActivities } = require('../../functions');
const { Activity } = require('../../models');

module.exports = async (req, res) => {
  const filters = applyFiltersActivities(req.query);
  if (req.user.role === 'user') {
    filters['user'] = req.user.me;
    // filters['user.email'] = req.user.email;
  }
  const documents = await Activity.find(filters);

  if (!documents) {
    return res.status(200).json(0);
  }
  
  const totalTime = documents.reduce((acc, curr) => {
      return acc + curr.duration;
  }, 0);

    
  return res.status(200).json(totalTime);
};


 