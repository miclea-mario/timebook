const { error } = require('../../functions');
const { Poll } = require('../../models');

module.exports = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw error(400, 'Missing required params');
  }

  const document = await Poll.findById(id).lean();

  if (!document) {
    throw error(404, 'Error! Poll was not found');
  }

  if (document.status === 'approved') {
    throw error(400, 'Error! Poll is already approved');
  }

  if (document.status === 'rejected') {
    throw error(400, 'Error! Poll is already rejected');
  }

  await Poll.findByIdAndUpdate(id, { status: 'rejected' });

  return res.status(200).json({
    message: 'Poll was approved successfully',
  });
};
