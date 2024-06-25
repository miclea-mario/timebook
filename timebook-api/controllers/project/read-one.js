const { Project } = require('../../models');
const { error } = require('../../functions');

module.exports = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw error(400, 'You must provide an id');
  }

  const document = await Project.findOne({ _id: id });
  if (!document) {
    throw error(400, 'Project not found');
  }

  return res.status(200).json(document);
};
