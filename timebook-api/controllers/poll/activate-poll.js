const { error, formatDate } = require('../../functions');
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

  if (document.status !== 'approved') {
    throw error(400, 'Error! Poll is not approved');
  }

  if (document.active) {
    throw error(400, 'Error! Poll is already activated');
  }

  await Poll.findByIdAndUpdate(id, { active: true, activatedAt: formatDate(new Date()) });

  return res.status(200).json({
    message: 'Poll was activated successfully',
  });
};
