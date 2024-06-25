const { applyFilterVacations, vacationTotals } = require('../../functions');
const { Vacation } = require('../../models');

module.exports = async (req, res) => {
  const filters = applyFilterVacations(req.query);

  const { me } = req.user;
  filters.user = me;

  const documents = await Vacation.find(filters).populate('user').sort({ createdAt: -1 });

  const totals = vacationTotals(documents);

  return res.status(200).json({ documents, totals, user: me });
};
