const { Identity } = require('../../models');
const { applyFiltersIdentities } = require('../../functions');

module.exports = async (req, res) => {
  const filters = applyFiltersIdentities(req.query);
  const identities = await Identity.find(filters);

  // if (!identities.length) {
  //   throw error(400, 'Users not found');
  // }

  return res.status(200).json(identities);
};
