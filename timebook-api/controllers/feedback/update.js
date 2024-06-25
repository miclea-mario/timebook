const { Feedback } = require('../../models');
const { error } = require('../../functions');

module.exports = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw error(400, 'You must provide a Feedback id');
  }

  const { body } = req;
  if (!body) {
    throw error(400, 'Must provide a body');
  }

  const { solved } = body;
  const document = await Feedback.findByIdAndUpdate({ _id: id }, { solved });
  if (!document) {
    throw error(400, 'Feedback not found');
  }

  return res.status(200).json({ document, message: 'Feedback updated' });
};
