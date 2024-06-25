const { CronJob } = require('cron');
const { logger } = require('../lib');
const { Activity, Identity } = require('../models');
const { format, parseISO } = require('date-fns');
const roLocale = require('date-fns/locale/ro');
const {
  getBreakdownByProject,
  getBreakdownForAllCollaborators,
  getAllCollaboratorsWithMissingActivity,
} = require('../functions');
const weeklyReportSend = require('./weekly-report-send');

const weeklyReport = () => {
  const handleCron = async () => {
    logger.info('Checking activities...');

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const lastWeek = new Date(yesterday);
    lastWeek.setDate(lastWeek.getDate() - 6); // subtract 6 days to get the start of the last week

    logger.info('Getting date interval...');
    const formattedYesterday = yesterday.toISOString().split('T')[0];
    const formattedLastWeek = lastWeek.toISOString().split('T')[0];

    const lastWeekActivities = await Activity.find({
      date: {
        $gte: formattedLastWeek,
        $lt: formattedYesterday,
      },
    });

    const identities = await Identity.find();

    const startOfInterval = format(parseISO(formattedLastWeek), 'd MMMM yyyy', {
      locale: roLocale,
    });
    const endOfInterval = format(parseISO(formattedYesterday), 'd MMMM yyyy', {
      locale: roLocale,
    });

    logger.info('Calculating report data...');

    // Total hours worked
    const totalHoursWorked =
      lastWeekActivities.reduce((accumulator, activity) => accumulator + activity.duration, 0) / 60;

    // Breakdown by collaborator
    const breakdownByCollaborator = await getBreakdownForAllCollaborators(
      lastWeekActivities,
      identities
    );

    // Breakdown by project
    const breakdownByProject = await getBreakdownByProject(lastWeekActivities);

    // missing activities
    const collaboratorsWithMissingActivity = await getAllCollaboratorsWithMissingActivity(
      formattedLastWeek,
      formattedYesterday,
      identities
    );

    logger.info('Sending emails...');
    await weeklyReportSend(
      startOfInterval,
      endOfInterval,
      totalHoursWorked,
      breakdownByCollaborator,
      breakdownByProject,
      collaboratorsWithMissingActivity
    );
    logger.info(`Weekly report emails sent`);

    return;
  };

  const job = new CronJob(
    // https://crontab.guru/
    '30 0 * * 1', // At 00:30 on every monday.
    handleCron,
    null,
    true,
    'Europe/Bucharest'
  );
  return job;
};

module.exports = weeklyReport;
