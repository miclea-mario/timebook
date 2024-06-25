const { VacationTransaction } = require('../../models');
const { error } = require('../../functions');

module.exports = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw error(400, 'You must provide an id');
  }

  const exists = await VacationTransaction.findOne({ _id: id });
  if (!exists) {
    throw error(404, 'Vacation transaction not found');
  }

  await VacationTransaction.findOneAndDelete({ _id: id });

  return res.status(200).json({ message: 'Vacation transaction removed' });
};
