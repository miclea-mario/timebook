const { VacationTransaction } = require('../../models');
const { error } = require('../../functions');

module.exports = async (req, res) => {
  const { amount, description, user, type } = req.body;

  if (!amount || !description || !user || !type) {
    throw error(400, 'Vacation transaction is missing required params.');
  }

  const document = await VacationTransaction.create({
    ...req.body,
  });

  res.status(200).json({ document, message: `Vacation transaction was added` });
};
