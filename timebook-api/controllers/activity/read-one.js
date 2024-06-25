const { error } = require('../../functions');
const { Activity } = require('../../models');

module.exports = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw error(400, 'Must provide an id');
  }

  const document = await Activity.findById(id);
  if (!document) {
    throw error(400, 'Activity not found');
  }

  if (req.user.role === 'user') {
    if (document.user._id != req.user.me) {
      throw error(400, 'Cannot view others activities');
    }
  }

  return res.status(200).json(document);
};
