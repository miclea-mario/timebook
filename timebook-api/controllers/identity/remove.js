const { Identity } = require('../../models');
const { error } = require('../../functions');

module.exports = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw error(400, 'You must provide an id');
  }

  const document = await Identity.findByIdAndUpdate(id, { active: false });
  if (!document) {
    throw error(400, 'Can`t find identity');
  }

  return res.status(200).json(document);
};