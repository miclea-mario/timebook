const { Identity } = require('../models');
const { email } = require('../services');
const { birthdayTemplate } = require('../templates');

const birthdayReportSend = async (identities) => {
  let counter = 0;

  //send email to admins
  const admins = await Identity.find({ role: 'admin' });
  const recepients = admins.map((admin) => admin.email);

  identities.forEach((identity) => {
    const { first_name, last_name, birthday } = identity;

    const variables = {
      firstName: first_name,
      lastName: last_name,
      age: new Date().getFullYear() - new Date(birthday).getFullYear(),
      year: new Date().getFullYear(),
    };

    recepients.forEach(async (recepient) => {
      await email({
        recipients: recepient,
        htmlBody: birthdayTemplate,
        subject: 'Zi de naștere',
        variables,
      });
    });

    counter++;
  });

  return counter;
};

module.exports = birthdayReportSend;
