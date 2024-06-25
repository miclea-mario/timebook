const { Identity } = require('../../models');
const { applyFiltersIdentities } = require('../../functions');

module.exports = async (req, res) => {
  const filters = applyFiltersIdentities(req.query);
  const identities = await Identity.find(filters).sort({ points: -1 });


  return res.status(200).json(identities);
};
