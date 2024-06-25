const { Identity } = require('../models');
const { email } = require('../services');
const { dailyReportTemplate } = require('../templates');

const dailyReportSend = async (
  formattedDate,
  totalHoursWorked,
  breakdownByCollaborator,
  breakdownByProject,
  collaboratorsMissingActivity
) => {
  //send email to admins
  const admins = await Identity.find({ role: 'admin' });
  const recepients = admins.map((admin) => admin.email);

  const variables = {
    formattedDate,
    totalHoursWorked,
    collaborators: [...breakdownByCollaborator],
    projects: breakdownByProject,
    collaboratorsMissingActivity,
    collaboratorsMissingActivityLength: collaboratorsMissingActivity.length,
    year: new Date().getFullYear(),
  };

  recepients.forEach(async (recepient) => {
    await email({
      recipients: recepient,
      htmlBody: dailyReportTemplate,
      subject: 'Raport zilnic',
      variables,
    });
  });

  return;
};

module.exports = dailyReportSend;
