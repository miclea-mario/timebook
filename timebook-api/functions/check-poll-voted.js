const mongoose = require('mongoose');

module.exports = (voters, id) => {
  const voterId = mongoose.Types.ObjectId(id); // Convert req.body.answer to ObjectId

  return voters?.some((voter) => voter._id.equals(voterId));
};
