const { error } = require('../../functions');
const { Activity, User, Project } = require('../../models');

module.exports = async (req, res) => {
  const { _ids, newUser, newProject } = req.body;

  if (!_ids || !_ids.length) {
    throw error(400, 'Must provide activity IDs');
  }

  if (!newUser && !newProject) {
    throw error(400, 'Must provide target person or project');
  }

  if (newUser && newProject) {
    throw error(400, 'Must provide target person or target project.');
  }

  if (newUser) {
    const targetUser = await User.findById(newUser);
    if (!targetUser) {
      throw error(404, 'Provided target person does not exist');
    }
  }

  if (newProject) {
    const targetProject = await Project.findById(newProject);
    if (!targetProject) {
      throw error(404, 'Provided target project does not exist');
    }
  }

  let result;
  if (newUser) {
    result = await Activity.updateMany(
      { _id: { $in: _ids } },
      {
        user: newUser,
      }
    );
  } else if (newProject) {
    result = await Activity.updateMany(
      { _id: { $in: _ids } },
      {
        project: newProject,
      }
    );
  }

  if (!result.n) {
    throw error(404, 'No documents found');
  }

  if (!result.nModified) {
    return res.status(200).json({
      message: 'No activities updated',
      found: result.n,
      updated: 0,
    });
  }

  return res.status(200).json({
    message: 'Activities updated',
    found: result.n,
    updated: result.nModified,
  });
};
