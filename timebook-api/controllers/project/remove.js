const { Project } = require('../../models');
const { error } = require('../../functions');

module.exports = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw error(400, 'You must provide an id');
  }

  const exists = await Project.findOne({ _id: id });
  if (!exists) {
    throw error(404, 'Project not found');
  }

  await Project.updateOne({ _id: id }, { active: false });
  res.status(200).json({ message: 'Project removed' });
};
