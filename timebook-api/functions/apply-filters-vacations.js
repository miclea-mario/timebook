module.exports = (query) => {
  const { dontShow, from, to, year, userId } = query;

  let filters = {};

  if (year) {
    filters.year = year;
  }

  if (dontShow) {
    filters.type = { $ne: dontShow };
  }

  if (userId) {
    filters.user = userId;
  }

  if (from) {
    filters = {
      ...filters,
      $expr: {
        $gte: [{ $dateFromString: { dateString: '$startDate' } }, new Date(from)],
      },
    };
  }

  if (to) {
    filters = {
      ...filters,
      $expr: {
        $lte: [{ $dateFromString: { dateString: '$endDate' } }, new Date(to)],
      },
    };
  }

  return {
    ...filters,
  };
};
