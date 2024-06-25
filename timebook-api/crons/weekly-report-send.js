const { Identity } = require('../models');
const { email } = require('../services');
const { weeklyReportTemplate } = require('../templates');

const weeklyReportSend = async (
  startOfInterval,
  endOfInterval,
  totalHoursWorked,
  breakdownByCollaborator,
  breakdownByProject,
  collaboratorsWithMissingActivity
) => {
  //send email to admins
  const admins = await Identity.find({ role: 'admin' });
  const recepients = admins.map((admin) => admin.email);

  const variables = {
    startOfInterval,
    endOfInterval,
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
      htmlBody: weeklyReportTemplate,
      subject: 'Raport săptămânal',
      variables,
    });
  });

  return;
};

module.exports = weeklyReportSend;
