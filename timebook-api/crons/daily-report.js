const { CronJob } = require('cron');
const { logger } = require('../lib');
const { Activity, Identity } = require('../models');
const { format, isWeekend, parseISO } = require('date-fns');
const roLocale = require('date-fns/locale/ro');
const { default: axios } = require('axios');
const {
  getBreakdownByCollaborator,
  getBreakdownByProject,
  getCollaboratorsMissingActivity,
} = require('../functions');
const dailyReportSend = require('./daily-report-send');

const dailyReport = () => {
  const handleCron = async () => {
    logger.info('Checking activities...');

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const formattedYesterday = format(yesterday, 'yyyy-MM-dd');
    const yesterdaysActivities = await Activity.find({
      date: formattedYesterday,
    });

    logger.info('Checking for weekend or bank holiday...');
    const { data } = await axios.get(
      `https://zilelibere.webventure.ro/api/${new Date().getFullYear()}`
    );
    const totalBankHolidays = data.flatMap((holiday) => holiday.date);
    const totalHolidaysWoutWeekendsFiltered = totalBankHolidays
      .filter((freeDay) => {
        const freeDayFormated = new Date(freeDay.date.replaceAll('/', '-'));
        return !isWeekend(freeDayFormated);
      })
      .map((freeDay) => new Date(freeDay.date.replaceAll('/', '-')).toISOString().substring(0, 10));

    if (
      totalHolidaysWoutWeekendsFiltered.includes(formattedYesterday) ||
      isWeekend(new Date(formattedYesterday))
    ) {
      logger.error('Yesterday was weekend or a bank holiday!');
      return false;
    }

    const formattedDate = format(parseISO(formattedYesterday), 'd MMMM yyyy', { locale: roLocale });

    logger.info('Calculating report data...');

    // Total hours worked
    const totalHoursWorked =
      yesterdaysActivities.reduce((accumulator, activity) => accumulator + activity.duration, 0) /
      60;

    const identities = await Identity.find();

    // Breakdown by collaborator
    const breakdownByCollaborator = await getBreakdownByCollaborator(
      yesterdaysActivities,
      identities
    );

    // Breakdown by project
    const breakdownByProject = await getBreakdownByProject(yesterdaysActivities);

    // missing activities
    const collaboratorsMissingActivity = await getCollaboratorsMissingActivity(
      yesterdaysActivities
    );

    logger.info('Sending emails...');
    await dailyReportSend(
      formattedDate,
      totalHoursWorked,
      breakdownByCollaborator,
      breakdownByProject,
      collaboratorsMissingActivity
    );
    logger.info(`Daily report emails sent`);

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

module.exports = dailyReport;
