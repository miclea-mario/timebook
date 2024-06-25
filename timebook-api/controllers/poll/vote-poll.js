const { error } = require('../../functions');
const checkPollVoted = require('../../functions/check-poll-voted');
const { Poll, Identity } = require('../../models');
const { Types } = require('mongoose');

module.exports = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw error(400, 'Missing required params');
  }

  const document = await Poll.findById(id).lean();
  if (!document) {
    throw error(404, 'Poll was not found');
  }

  if (document.status !== 'approved') {
    throw error(400, "Error! You can't vote on polls that were not approved!");
  }

  const user = await Identity.findById(req.user.me).lean();
  if (!user) {
    throw error(404, 'User was not found');
  }

  const alreadyVoted = checkPollVoted(document?.voters, req.user._id);

  if (alreadyVoted) {
    throw error(400, 'Error! Already voted!');
  }

  const answerObjectId = Types.ObjectId(req.body.answer); // Convert req.body.answer to ObjectId

  const existingOption = document.options.find((option) => option._id.equals(answerObjectId));
  if (!existingOption) {
    throw error(400, 'Error! Answer is not valid');
  }

  // updates the voters array based on the answer of the user
  document.options.forEach((option) => {
    option._id.equals(answerObjectId) && option.votes++;
    option._id.equals(answerObjectId) &&
      !document.isAnonymous &&
      option.voters.push({
        _id: Types.ObjectId(req.user._id),
        first_name: req.user.first_name,
        last_name: req.user.last_name,
      });
  });
  document.totalVotes++;

  // store all the voters
  document.pollVoters.push({
    _id: Types.ObjectId(req.user._id),
    first_name: req.user.first_name,
    last_name: req.user.last_name,
  });

  // sort them for the admin(or nosy people) to not figure out who and what voted in case the poll is anonymous
  document.pollVoters.sort(() => Math.random() - 0.5);

  const updatedDocument = await Poll.findByIdAndUpdate(id, document, { new: true });

  if (!updatedDocument) {
    throw error(500, 'Error updating the document in the database');
  }

  return res.status(200).json(document);
};
