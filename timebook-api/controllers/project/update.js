const { Project } = require('../../models');
const { error } = require('../../functions');

module.exports = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  if (!id) {
    throw error(400, 'You must provide a Project id');
  }

  const document = await Project.findByIdAndUpdate({ _id: id }, body);
  if (!document) {
    throw error(400, 'Project not found');
  }

  return res.status(200).json({ document, message: 'Project updated' });
};
