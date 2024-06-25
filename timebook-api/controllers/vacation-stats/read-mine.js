const { vacationTotals } = require('../../functions');
const { VacationTransaction } = require('../../models');

module.exports = async (req, res) => {
  const { year } = req.query;
  const { me } = req.user;

  const filters = {
    user: me,
  };

  if (year) {
    filters.year = year;
  }

  const documents = await VacationTransaction.find(filters).populate('vacationRequest');

  const totals = vacationTotals(documents);

  return res.status(200).json({ year, user: req.user, totals, documents });
};
