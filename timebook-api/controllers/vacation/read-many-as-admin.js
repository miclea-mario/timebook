const { error, applyFilterVacations, vacationTotals } = require('../../functions');
const { Vacation } = require('../../models');

// Route to get vacations for a certain user (despite controller name)
module.exports = async (req, res) => {
  const { user } = req.query;
  if (!user) {
    throw error(400, 'You must provide a user id');
  }
  const filters = applyFilterVacations(req.query);
  filters.user = user;

  const documents = await Vacation.find(filters).sort({ createdAt: -1 });

  const totals = vacationTotals(documents);

  return res.status(200).json({ documents, totals, user });
};
