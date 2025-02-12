const { error } = require('../../functions');
const { Poll } = require('../../models');

module.exports = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.me;
  const userRole = req.user.role;

  if (!id) {
    throw error(400, 'Missing required params');
  }

  if (userRole === 'user') {
    const pollToCheck = await Poll.findById(id).lean();
    if (pollToCheck.createdBy._id.toString() !== userId) {
      throw error(403, 'Error! You are not allowed to update this poll');
    }
  }

  const document = await Poll.findByIdAndUpdate(id, req.body);

  if (!document) {
    throw error(404, 'Error! Poll was not updated');
  }

  return res.status(200).json({
    message: 'Poll was updated successfully',
  });
};
/* auto-generated by robocode v0.4.3 */
