const mongoose = require('mongoose');

module.exports = (query) => {
  let { priority = '', status = '', active = '', userId } = query;

  let select = {};

  if (priority) {
    select.priority = priority;
  }

  if (status) {
    select.status = status;
  }

  if (active) {
    select.active = active;
  }

  if (userId) {
    select['createdBy._id'] = new mongoose.Types.ObjectId(userId);
  }

  return { ...select };
};
