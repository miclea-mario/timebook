module.exports = (query) => {
  const { name = '', active, important, urgent, description = '', status = '' } = query;
  const select = {};

  if (name) {
    select.name = { $regex: name, $options: 'i' };
  }
  if (typeof active != 'undefined') select.active = active;

  if (typeof important != 'undefined') {
    select.important = important;
  }
  if (typeof urgent != 'undefined') {
    select.urgent = urgent;
  }
  if (description) {
    select.description = description;
  }
  if (status) select.status = status;

  return {
    ...select,
  };
};
