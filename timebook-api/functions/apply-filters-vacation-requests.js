module.exports = (query) => {
  let { status, userId = '', from = '' } = query;
  let select = {};

  if (userId) {
    select['user'] = userId;
  }
  if (status) {
    select.status = status;
  }
  if (from) {
    select = {
      ...select,
      $expr: {
        $gte: [{ $dateFromString: { dateString: '$startDate' } }, new Date(from)],
      },
    };
  }
  return {
    ...select,
  };
};
