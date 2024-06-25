const activity = require('./activity');
const admin = require('./admin');
const feedback = require('./feedback');
const identity = require('./identity');
const poll = require('./poll');
const project = require('./project');
const stats = require('./stats');
const timesheet = require('./timesheet');
const vacation = require('./vacation');
const vacationRequest = require('./vacation-request');
const vacationStats = require('./vacation-stats');
const vacationTransaction = require('./vacation-transaction');
const pointLogs = require('./point-logs');

module.exports = {
  activity,
  admin,
  feedback,
  identity,
  poll,
  project,
  stats,
  timesheet,
  vacation,
  vacationRequest,
  vacationStats,
  vacationTransaction,
  pointLogs,
};
