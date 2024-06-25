const { Vacation, User } = require('../../models');
const { error, formatDate, vacationTotals } = require('../../functions');
const { email } = require('../../services');
const vacationAdminTemplate = require('../../templates/vacation-admin');

module.exports = async (req, res) => {
  const { user } = req.body;

  if (!user) {
    throw error(400, "Vacation doesn't have an associated user");
  }

  const document = await Vacation.create({
    ...req.body,
    // only admin can create vacation request for different user
    user,
    // requests created by admin are approved automatically
    status: 'approved',
  });

  if (document.type === 'vacation') {
    const filters = {
      user: user,
      year: new Date().getFullYear().toString(),
    };
    const documentTransactions = await Vacation.find(filters).sort({ createdAt: -1 });
    const totals = vacationTotals(documentTransactions);

    const { annual, available, bonus, extratime, vacation_approved } = totals;

    const recepient = await User.findById(user);
    const recepientEmail = recepient.email;

    const variables = {
      requestDate: formatDate(document.createdAt),
      adminName: `${req.user.first_name} ${req.user.last_name}`,
      userName: `${recepient.first_name} ${recepient.last_name}`,
      startDate: formatDate(new Date(document.startDate)),
      endDate: formatDate(new Date(document.endDate)),
      year: new Date().getFullYear(),
      annual,
      available,
      bonus,
      extratime,
      vacation_approved,
    };

    await email({
      recipients: recepientEmail,
      htmlBody: vacationAdminTemplate,
      subject: 'Concediu nou acordat',
      variables,
    });
  }

  res.status(200).json({ document, message: `Vacation was added` });
};
