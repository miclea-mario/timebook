const { applyFiltersActivities, error } = require('../../functions');
const { Activity, Identity } = require('../../models');

module.exports = async (req, res) => {
  const { id } = req.params;
  const query = {
    ...req.query,
    userId: id,
  };

  const user = await Identity.findById(id);
  if (!user) {
    throw error(404, 'User not found');
  }

  const filters = applyFiltersActivities(query);
  const activities = await Activity.find(filters).paginate(req.query);

  const result = {
    user,
    activities,
  };

  return res.status(200).json(result);
};
