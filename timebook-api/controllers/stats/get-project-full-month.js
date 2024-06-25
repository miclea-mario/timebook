const { Activity, Project } = require('../../models');
const { error } = require('../../functions');
const { specificMonth } = require('../../functions/stats');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { monthNumber } = req.query;

  if (!id) {
    throw error(400, 'Project ID is required');
  }

  const project = await Project.findById(id);
  if (!project) {
    throw error(404, 'Project not found');
  }

  const activities = await Activity.find({ project: id }).sort({ date: 1 });

  if (!activities.length) {
    return res.status(200).json({
      project,
      fullMonth: [],
    });
  }

  const fullMonth = specificMonth(activities, monthNumber);

  res.status(200).json({
    project,
    fullMonth,
  });
};
