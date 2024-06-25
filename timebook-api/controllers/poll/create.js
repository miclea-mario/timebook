const { error, formatDate } = require('../../functions');
const { Poll } = require('../../models');
const { Types } = require('mongoose');

module.exports = async (req, res) => {
  // Manually generate unique _id for each option
  const optionsWithIds = req.body.options.map((option) => ({
    _id: new Types.ObjectId(),
    answer: option,
    votes: 0,
    voters: [],
  }));

  const documentData = {
    ...req.body,
    totalVotes: 0,
    options: optionsWithIds, // Use the options array with manually assigned _ids
    status: req.user.role === 'admin' ? 'approved' : 'pending',
    active: req.user.role === 'admin',
    createdBy: {
      _id: Types.ObjectId(req.user._id),
      first_name: req.user.first_name,
      last_name: req.user.last_name,
    },
    activatedAt: req.user.role === 'admin' ? formatDate(new Date()) : undefined,
  };

  const document = await Poll.create(documentData);
  if (!document) {
    throw error(400, 'Error! Poll was not created');
  }

  return res.status(200).json({
    message: 'Poll was created successfully',
  });
};
