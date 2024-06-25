const { Vacation } = require('../../models');
const { error, formatDate } = require('../../functions');
const { email } = require('../../services');
const { vacationUpdateTemplate } = require('../../templates');

module.exports = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw error(400, 'You must provide a Vacation id');
  }

  const { body } = req;
  if (!body) {
    throw error(400, 'Must provide a body');
  }
  const { status } = body;
  if (!status) {
    throw error(400, 'Must provide updated status');
  }

  if (!['approved', 'rejected'].includes(status)) {
    throw error(400, 'Provided status is not accepted');
  }

  const document = await Vacation.findById(id);
  if (!document) {
    throw error(404, 'Vacation not found');
  }

  // Cannot update "settled" (approved or rejected) vacation requests
  if (document.status !== 'pending') {
    throw error(400, 'Vacation is already settled');
  }

  document.status = status;
  const statusResponse =
    status === 'approved'
      ? 'Cu bucurie te informam ca cererea ta de concediu a fost aprobata de catre'
      : 'Din pacate, cererea ta de concediu a fost respinsa de catre';
  const statusQuote =
    status === 'approved'
      ? 'O vacanta este asemeni dragostei : anticipata cu placere, traita cu disconfort si amintita cu nostalgie..'
      : 'Munca nu este pedeapsa omului. Este recompensa sa, puterea sa și plăcerea sa..';

  const recepient = document.user;
  const recepientEmail = recepient.email;

  const variables = {
    requestDate: formatDate(document.createdAt),
    updatedAt: formatDate(new Date()),
    adminName: `${req.user.first_name} ${req.user.last_name}`,
    userName: `${recepient.first_name} ${recepient.last_name}`,
    startDate: formatDate(new Date(document.startDate)),
    endDate: formatDate(new Date(document.endDate)),
    year: new Date().getFullYear(),
    statusResponse,
    statusQuote,
  };

  await email({
    recipients: recepientEmail,
    htmlBody: vacationUpdateTemplate,
    subject: 'Actualizare cerere concediu',
    variables,
  });

  await document.save();

  return res.status(200).json({ document, message: 'Vacation updated' });
};
