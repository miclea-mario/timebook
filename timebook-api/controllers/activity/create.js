const { Project, Identity } = require('../../models');
const { error } = require('../../functions');
const { Activity } = require('../../models');

module.exports = async (req, res) => {
  // "user" is the identity who sent the request
  // "person" is the identity associated with the activity
  const { body } = req;
  if (!body) {
    throw error(400, 'Must provide a body');
  }

  const { user: personId } = body;
  const { user } = req;
  const { me: userId } = user;

  const userIdentity = await Identity.findById(userId);
  const personIdentity = await Identity.findById(personId);
  if (!userIdentity || !personIdentity) {
    throw error(400, 'User not found');
  }

  const new_body = {
    ...req.body,
    user: user.role === 'user' ? userId : personId,
  };

  const project = await Project.findById(new_body.project);
  if (!project?.active) {
    throw error(400, `Project is not active or it doesn't exist`);
  }

  const document = await Activity.create(new_body);

  if (!document) {
    throw error(400, `Activity couldn't be created`);
  }

  return res.status(200).json({ document, message: 'Activity created' });
};