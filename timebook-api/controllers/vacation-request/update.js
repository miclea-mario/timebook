const { VacationRequest, VacationTransaction } = require('../../models');
const { error } = require('../../functions');

module.exports = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw error(400, 'You must provide a Vacation request id');
  }

  const { body } = req;
  if (!body) {
    throw error(400, 'Must provide a body');
  }

  const document = await VacationRequest.findById(id);
  if (!document) {
    throw error(404, 'Vacation request not found');
  }

  // Cannot update "settled" (approved or rejected) vacation requests
  if (document.status !== 'pending') {
    throw error(400, 'Vacation request is already settled');
  }

  const { status, approved_duration } = body;

  if (!status) {
    throw error(400, 'Must provide update fields');
  }

  if (status === 'rejected') {
    document.status = status;
    document.approved_duration = null;
    const transaction = {
      year: new Date(document.startDate).getFullYear(),
      user: document.user,
      amount: 0,
      description: 'Rejected vacation',
      type: 'vacation-rejected',
      vacationRequest: id,
    };

    await VacationTransaction.findOneAndDelete({ vacationRequest: document._id });
    await VacationTransaction.create(transaction);
  }

  if (status === 'approved') {
    if (!approved_duration) {
      throw error(400, 'Must provide approved_duration when approving vacation request');
    }

    document.status = status;
    document.approved_duration = approved_duration;

    const transaction = {
      year: new Date(document.startDate).getFullYear(),
      user: document.user,
      amount: -approved_duration,
      description: 'Approved vacation',
      type: 'vacation-approved',
      vacationRequest: id,
    };
    await VacationTransaction.findOneAndDelete({ vacationRequest: document._id });
    await VacationTransaction.create(transaction);
  }

  await document.save();

  return res.status(200).json({ document, message: 'Vacation request updated' });
};
