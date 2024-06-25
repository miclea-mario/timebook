const batchDeleteActivity = require('./batch-delete-activity');
const batchMoveActivity = require('./batch-move-activity');
const exportActivities = require('./export/export-activities');
const updateActivity = require('./update-activity');

module.exports = {
  batchDeleteActivity,
  batchMoveActivity,
  exportActivities,
  updateActivity,
};
