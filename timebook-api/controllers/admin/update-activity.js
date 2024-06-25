const { error } = require('../../functions');
const { Activity } = require('../../models');

module.exports = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw error(400, 'Must provide an id');
  }

  const body = req.body;
  if (!body) {
    throw error(400, 'Must provide a body');
  }

  const document = await Activity.findById(id);
  if (!document) {
    throw error(400, 'Activity not found');
  }

  await Activity.findByIdAndUpdate(id, body);

  return res.status(200).json({ message: 'Activity updated' });
};
