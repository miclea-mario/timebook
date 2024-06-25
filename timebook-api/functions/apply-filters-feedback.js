module.exports = (query) => {
  let { solved, userId = '' } = query;
  let select = {};

  if (userId) {
    select['user'] = userId;
  }
  if (typeof solved != 'undefined') {
    select.solved = solved;
  }

  return {
    ...select,
  };
};
