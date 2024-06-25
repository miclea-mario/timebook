const { VacationRequest, VacationTransaction } = require('../../models');
const { error } = require('../../functions');

module.exports = async (req, res) => {
  const { user } = req.body;
  const { me, role } = req.user;
  if (role === 'admin' && !user) {
    throw error(400, "Vacation request doesn't have an associated user");
  }

  const document = await VacationRequest.create({
    ...req.body,
    // only admin can create vacation request for different user
    user: role === 'admin' ? user : me,
  });

  const transaction = {
    year: new Date(document.startDate).getFullYear(),
    user: document.user,
    amount: 0,
    description: 'Pending vacation request',
    type: 'vacation-pending',
    vacationRequest: document._id,
  };
  await VacationTransaction.create(transaction);

  res.status(200).json({ document, message: `Vacation request was added` });
};
