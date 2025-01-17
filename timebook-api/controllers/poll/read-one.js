const { error } = require('../../functions');
const checkPollVoted = require('../../functions/check-poll-voted');
const { Poll } = require('../../models');

module.exports = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw error(400, 'Missing required params');
  }

  const document = await Poll.findById(id).lean();
  if (!document) {
    throw error(404, 'Poll was not found');
  }

  const hasVoted = checkPollVoted(document.pollVoters, req.user.me);

  return res.status(200).json({ ...document, hasVoted: hasVoted });
};
/* auto-generated by robocode v0.4.3 */
