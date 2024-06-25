const { Project } = require('../../models');
const { error } = require('../../functions');

module.exports = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw error(400, 'Project doesn`t have a name');
  }

  const exists = await Project.findOne({ name: req.body.name });
  if (exists) {
    throw error(200, 'Project name already exists');
  }

  const document = await Project.create(req.body);
  res.status(200).json({ document, message: `Project ${document.name} was added` });
};
