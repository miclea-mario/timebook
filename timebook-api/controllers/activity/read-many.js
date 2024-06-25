const { applyFiltersActivities } = require('../../functions');
const { Activity } = require('../../models');

module.exports = async (req, res) => {
  const filters = applyFiltersActivities(req.query);
  if (req.user.role === 'user') {
    filters['user'] = req.user.me;
    // filters['user.email'] = req.user.email;
  }
  const documents = await Activity.find(filters).paginate(req.query);

  // if (!documents) {
  //   throw error(400, 'No activities in the database');
  // }

  return res.status(200).json(documents);
};
