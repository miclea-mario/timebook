module.exports = (query) => {
  let { userId = '' } = query;
  let select = {};
  if (userId) {
    select['user'] = userId;
  }

  return {
    ...select,
  };
};
