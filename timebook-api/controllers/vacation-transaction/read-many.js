const { VacationTransaction } = require('../../models');
const { applyFiltersVacationTransactions } = require('../../functions');

module.exports = async (req, res) => {
  const filters = applyFiltersVacationTransactions(req.query);

  if (req.user.role === 'user') {
    filters['user'] = req.user.me;
  }

  const documents = await VacationTransaction.find(filters)
    .populate('user')
    .sort({ createdAt: -1 });

  return res.status(200).json(documents);
};
