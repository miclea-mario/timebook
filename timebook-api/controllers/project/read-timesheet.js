const { error, applyFiltersActivities } = require('../../functions');
const { Activity, Project } = require('../../models');

module.exports = async (req, res) => {
  const { id } = req.params;
  const query = {
    ...req.query,
    projectId: id,
  };

  const project = await Project.findById(id);
  if (!project) {
    throw error(404, 'Project not found');
  }

  const filters = applyFiltersActivities(query);
  const activities = await Activity.find(filters).paginate(req.query);

  const result = {
    project,
    activities,
  };

  return res.status(200).json(result);
};
