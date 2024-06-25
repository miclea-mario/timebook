const { error } = require('../../functions');
const { Activity } = require('../../models');

module.exports = async (req, res) => {
  const { _ids } = req.body;
  if (!_ids || !_ids.length) {
    throw error(400, 'Must provide activity ids array');
  }

  const documents = await Activity.deleteMany({ _id: { $in: _ids } });

  if (!documents.deletedCount) {
    throw error(400, 'No activities deleted, please check your selection');
  }

  const numRequested = _ids.length;
  const numDeleted = documents.deletedCount;

  return res.status(200).json({
    message: 'Activities deleted',
    numRequested,
    numDeleted,
  });
};
