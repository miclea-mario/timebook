const { Activity } = require('../../models');
const { applyFiltersActivities, error } = require('../../functions');

module.exports = async (req, res) => {
  const { from, to } = req.query;
  if (!from || !to) {
    throw error(400, 'Must provide start and end date filters');
  }

  const filters = applyFiltersActivities(req.query);
  if (req.user.role === 'user') {
    filters['user'] = req.user.me;
  }

  const documents = await Activity.find(filters);

  return res.status(200).json(documents);
};
