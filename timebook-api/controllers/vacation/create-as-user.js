const { error, formatDate } = require('../../functions');
const { Vacation, Identity } = require('../../models');
const { email } = require('../../services');
const vacationRequestCreated = require('../../templates/vacation-request');

module.exports = async (req, res) => {
  const { me } = req.user;

  const identity = await Identity.findById(me);

  if (!identity) {
    throw error(404, 'Error! User not found in db');
  }

  const document = await Vacation.create({
    ...req.body,
    // only admin can create vacation request for different user
    user: me,
    // requests created by users will need approval
    status: 'pending',
  });

  //send email to admin
  const admins = await Identity.find({ role: 'admin' });
  const recepients = admins.map((admin) => admin.email);

  const variables = {
    requestDate: formatDate(document.createdAt),
    userName: `${req.user.first_name} ${req.user.last_name}`,
    userId: req.user.me,
    startDate: formatDate(new Date(document.startDate)),
    endDate: formatDate(new Date(document.endDate)),
    year: new Date().getFullYear(),
  };

  recepients.forEach(async (recepient) => {
    await email({
      recipients: recepient,
      htmlBody: vacationRequestCreated,
      subject: 'Cerere noua de concediu',
      variables,
    });
  });

  res.status(200).json({ document, message: `Vacation was added` });
};
