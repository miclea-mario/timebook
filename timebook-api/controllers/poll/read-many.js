const { error, applyFiltersPolls, applySortPolls } = require('../../functions');
const checkPollVoted = require('../../functions/check-poll-voted');
const { Poll } = require('../../models');

module.exports = async (req, res) => {
  const filter = applyFiltersPolls(req.query);
  const sortOptions = applySortPolls(req.query);

  const documents = await Poll.find(filter).sort(sortOptions).lean();
  if (!documents) {
    throw error(404, 'No polls found');
  }

  const results = documents.map((poll) => {
    const hasParticipated = checkPollVoted(poll.pollVoters, req.user.me);

    return { ...poll, hasParticipated: hasParticipated };
  });

  let filteredResults;
  // filter by hasParticipated
  if (req.query.hasParticipated === 'true') {
    filteredResults = results.filter((poll) => poll.hasParticipated === true);
  } else if (req.query.hasParticipated === 'false') {
    filteredResults = results.filter((poll) => poll.hasParticipated === false);
  } else {
    filteredResults = results;
  }

  /** filter by status
  The default status filter value varies for user and admin
  If the user is an admin, the default filter status is 'all'
  If the user is a user, the default filter status is 'approved', because the user can only see approved polls
  */
  const statusFilter = req.query.status || (req.user.role === 'user' ? 'approved' : 'all');
  // if its not default, then filter by status
  if (statusFilter !== 'all') {
    filteredResults = filteredResults.filter((poll) => poll.status === statusFilter);
  }
  // if the user is a user, then filter by createdBy
  if (req.user.role === 'user' && statusFilter !== 'all' && req.query.status) {
    filteredResults = filteredResults.filter((poll) => String(poll.createdBy._id) === req.user._id);
  }

  return res.status(200).json(filteredResults);
};
/* auto-generated by robocode v0.4.3 */