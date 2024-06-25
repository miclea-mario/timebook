const { Identity } = require('../models');
const { email } = require('../services');
const { monthlyReportTemplate } = require('../templates');

const monthlyReportSend = async (
  lastMonthName,
  totalHoursWorked,
  breakdownByCollaborator,
  breakdownByProject,
  collaboratorsWithMissingActivity
) => {
  //send email to admins
  const admins = await Identity.find({ role: 'admin' });
  const recepients = admins.map((admin) => admin.email);

  const variables = {
    lastMonthName,
    totalHoursWorked,
    collaborators: breakdownByCollaborator,
    projects: breakdownByProject,
    collaboratorsWithMissingActivity,
    collaboratorsWithMissingActivityLength: collaboratorsWithMissingActivity.length,
    year: new Date().getFullYear(),
  };

  recepients.forEach(async (recepient) => {
    await email({
      recipients: recepient,
      htmlBody: monthlyReportTemplate,
      subject: 'Raport lunar',
      variables,
    });
  });

  return;
};

module.exports = monthlyReportSend;
