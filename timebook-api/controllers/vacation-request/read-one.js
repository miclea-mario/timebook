const { VacationRequest } = require('../../models');
const { error } = require('../../functions');

module.exports = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw error(400, 'You must provide an id');
  }

  const filters = {
    _id: id,
  };
  if (req.user.role === 'user') {
    filters['user'] = req.user.me;
  }

  const document = await VacationRequest.findOne(filters);
  if (!document) {
    throw error(400, 'Vacation request not found');
  }

  return res.status(200).json(document);
};
