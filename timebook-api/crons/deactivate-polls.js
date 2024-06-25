const differenceInDays = require('date-fns/differenceInDays');
const { CronJob } = require('cron');
const { Poll } = require('../models');
const { logger } = require('../lib');
const { formatDate } = require('../functions');

const deactivatePolls = () => {
  const handleCron = async () => {
    logger.info('Checking for polls...');

    const polls = await Poll.find({ active: true, status: 'approved' }).exec();
    if (!polls) {
      logger.error('No polls found!');
      return false;
    }

    polls.forEach(async (poll) => {
      const { _id, activatedAt, daysUntilExpire, active } = poll;
      if (!active) {
        return;
      }
      const diffDays = differenceInDays(new Date(formatDate(new Date())), new Date(activatedAt));

      if (!isNaN(diffDays) && diffDays > daysUntilExpire) {
        logger.info(`Poll with id ${_id} expired!`);
        await Poll.updateOne({ _id }, { $set: { active: false } });
        logger.info(`Poll with id ${_id} updated!`);
      }
    });

    return;
  };

  const job = new CronJob(
    // https://crontab.guru/
    '0 2 * * *', // At 02:00.
    handleCron,
    null,
    true,
    'Europe/Bucharest'
  );
  return job;
};

module.exports = deactivatePolls;
