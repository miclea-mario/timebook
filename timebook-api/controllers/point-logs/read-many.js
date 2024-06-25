const { applyFiltersPointLogs } = require('../../functions');
const { PointLogs } = require('../../models');

module.exports = async (req, res) => {
  const filters = applyFiltersPointLogs(req.query);
  if (req.user.role === 'user') {
    filters['user'] = req.user.me;
  }

  const documents = await PointLogs.find(filters).paginate(req.query);

  return res.status(200).json(documents);
};

