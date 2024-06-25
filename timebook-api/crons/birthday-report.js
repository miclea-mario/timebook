const { CronJob } = require('cron');
const { logger } = require('../lib');
const { Identity } = require('../models');
const { format, addDays } = require('date-fns');
const birthdayReportSend = require('./birthday-report-send');

const birthdayReport = () => {
  const handleCron = async () => {
    logger.info('Checking for birthdays...');

    const tomorrowMonthAndDay = format(addDays(new Date(), 1), 'MM-dd');

    // find people with the same month and day as tomorrow
    const birthdayPeople = await Identity.find({
      birthday: { $regex: `.*${tomorrowMonthAndDay}.*`, $options: 'i' },
    }).exec();

    if (!birthdayPeople) {
      logger.error('No people found!');
      return false;
    }

    logger.info('Sending emails...');
    const counter = await birthdayReportSend(birthdayPeople);
    logger.info(`${counter} emails sent`);

    return;
  };

  const job = new CronJob(
    // https://crontab.guru/
    '30 0 * * *', // At 00:30.
    handleCron,
    null,
    true,
    'Europe/Bucharest'
  );
  return job;
};

module.exports = birthdayReport;
