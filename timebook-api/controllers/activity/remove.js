const { error } = require('../../functions');
const { Activity } = require('../../models');

module.exports = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw error(400, 'Must provide an id');
  }

  const document = await Activity.findOne({ _id: id });
  if (!document) {
    throw error(400, 'Activity not found');
  }

  // TODO: should check for strict equality
  if (document.user['_id'] != req.user.me && req.user.role === 'user') {
    throw error(400, `Can't remove others' activities`);
  }

  document.remove();
  return res.status(200).json({ document, message: 'Activity removed' });
};
