module.exports = (query) => {
  let { userId = '', year, type, dontShow = '' } = query;
  let select = {};

  if (userId) {
    select['user'] = userId;
  }

  if (year) {
    select['year'] = year;
  }

  if (type) {
    select['type'] = type;
  }

  if (dontShow) {
    if (!type) {
      select = {
        ...select,
        type: { $ne: dontShow },
      };
    }
  }

  return {
    ...select,
  };
};
