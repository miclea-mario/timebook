const { Vacation } = require('../../models');
// const { applyFiltersVacationRequests } = require('../../functions');
const applyFiltersVacations = require('../../functions/apply-filters-vacations');

module.exports = async (req, res) => {
  const filters = applyFiltersVacations(req.query);

  if (req.user.role === 'user') {
    filters['user'] = req.user.me;
  }

  filters.type = 'vacation';

  const documents = await Vacation.find(filters).populate('user').sort({ createdAt: -1 });

  return res.status(200).json(documents);
};
