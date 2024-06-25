const { Activity, Project } = require('../../models');
const { error } = require('../../functions');
const { uniqBy } = require('lodash');
const { durationsByUser, durationsByMonth, totalDurations } = require('../../functions/stats');

module.exports = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw error(400, 'Project ID is required');
  }

  const project = await Project.findById(id);
  if (!project) {
    throw error(404, 'Project not found');
  }

  // const filters = applyFiltersActivities(req.query);
  const activities = await Activity.find({ project: id }).sort({ date: 1 });

  if (!activities.length) {
    return res.status(200).json({
      project,
      stats: {
        aggregated: {
          count_collaborators: 0,
          duration_total: 0,
          earliest_date: 0,
          latest_date: 0,
        },
      },
    });
  }

  const earliest_date = activities[0].date;
  const latest_date = activities[activities.length - 1].date;
  const count_collaborators = uniqBy(activities, 'user.last_name').length;
  const totals = totalDurations(activities);
  const byUser = durationsByUser(activities);
  const byMonth = durationsByMonth(activities);

  res.status(200).json({
    project,
    stats: {
      aggregated: {
        count_collaborators,
        ...totals,
        earliest_date,
        latest_date,
      },
      byUser,
      byMonth,
    },
  });
};
