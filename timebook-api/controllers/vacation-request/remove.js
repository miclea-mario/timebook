const { VacationRequest } = require('../../models');
const { error } = require('../../functions');

module.exports = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw error(400, 'You must provide an id');
  }

  const document = await VacationRequest.findOne({ _id: id });
  if (!document) {
    throw error(404, 'Vacation request not found');
  }

  if (document.status !== 'pending') {
    throw error(400, 'Vacation request is already settled');
  }

  const { me, role } = req.user;
  if (document.user['_id'] != me && role === 'user') {
    throw error(400, `Can't remove others' vacation request`);
  }

  await VacationRequest.findOneAndDelete({ _id: id });

  return res.status(200).json({ message: 'Vacation request removed' });
};
