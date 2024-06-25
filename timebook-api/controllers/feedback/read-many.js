const { Feedback } = require('../../models');
const { applyFiltersFeedback } = require('../../functions');

module.exports = async (req, res) => {
  const filters = applyFiltersFeedback(req.query);
  const documents = await Feedback.find(filters).populate('user').sort({ createdAt: -1 });

  return res.status(200).json(documents);
};
