const { Project } = require('../../models');
const { applyFiltersProjects } = require('../../functions');

module.exports = async (req, res) => {
  const filters = applyFiltersProjects(req.query);
  let projects;
  if (req.user.role == 'admin') {
    projects = await Project.find(filters).sort({ updatedAt: -1 });
  } else {
    // show only active projects for users.
    filters.active = true;
    projects = await Project.find(filters, { _id: 1, name: 1 }).sort({ updatedAt: -1 });
  }
  // if (!projects.length) {
  //   throw error(400, 'Projects not found');
  // }

  return res.status(200).json(projects);
};
