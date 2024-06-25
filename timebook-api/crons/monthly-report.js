const { CronJob } = require('cron');
const { logger } = require('../lib');
const { Activity, Identity } = require('../models');
const { format } = require('date-fns');
const {
  getBreakdownByProject,
  getBreakdownForAllCollaborators,
  getAllCollaboratorsWithMissingActivity,
} = require('../functions');
const monthlyReportSend = require('./monthly-report-send');
const { ro } = require('date-fns/locale');

const monthlyReport = () => {
  const handleCron = async () => {
    logger.info('Checking activities...');

    const currentDate = new Date();
    const firstDayOfPreviousMonth = new Date(currentDate);
    firstDayOfPreviousMonth.setMonth(currentDate.getMonth() - 1, 1); // set to the first day of the previous month

    const lastDayOfPreviousMonth = new Date(firstDayOfPreviousMonth);
    lastDayOfPreviousMonth.setMonth(firstDayOfPreviousMonth.getMonth() + 1, 0);

    logger.info('Getting date interval...');
    const formattedLastDayOfPreviousMonth = lastDayOfPreviousMonth.toISOString().split('T')[0];
    const formattedFirstDayOfPreviousMonth = firstDayOfPreviousMonth.toISOString().split('T')[0];

    const lastMonthActivities = await Activity.find({
      date: {
        $gte: formattedFirstDayOfPreviousMonth,
        $lte: formattedLastDayOfPreviousMonth,
      },
    });

    const lastMonthName = format(firstDayOfPreviousMonth, 'MMMM', { locale: ro });

    const identities = await Identity.find();

    logger.info('Calculating report data...');

    // Total hours worked
    const totalHoursWorked =
      lastMonthActivities.reduce((accumulator, activity) => accumulator + activity.duration, 0) /
      60;

    // Breakdown by collaborator
    const breakdownByCollaborator = await getBreakdownForAllCollaborators(
      lastMonthActivities,
      identities
    );

    // Breakdown by project
    const breakdownByProject = await getBreakdownByProject(lastMonthActivities);

    // missing activities
    const collaboratorsWithMissingActivity = await getAllCollaboratorsWithMissingActivity(
      formattedFirstDayOfPreviousMonth,
      formattedLastDayOfPreviousMonth,
      identities
    );

    logger.info('Sending emails...');
    await monthlyReportSend(
      lastMonthName,
      totalHoursWorked,
      breakdownByCollaborator,
      breakdownByProject,
      collaboratorsWithMissingActivity
    );
    logger.info(`Monthly report emails sent`);

    return;
  };

  const job = new CronJob(
    // https://crontab.guru/
    '30 0 1 * *', // At 00:30 on the 1st of every month.
    handleCron,
    null,
    true,
    'Europe/Bucharest'
  );
  return job;
};

module.exports = monthlyReport;
