const { Feedback } = require('../../models');
const { error } = require('../../functions');

module.exports = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    throw error(400, 'Feedback doesn`t have a title');
  }

  const exists = await Feedback.findOne({ title: req.body.title });
  if (exists) {
    throw error(200, 'Feedback title already exists');
  }

  const document = await Feedback.create(req.body);

  res.status(200).json({ document, message: `Feedback ${document.title} was added` });
};
