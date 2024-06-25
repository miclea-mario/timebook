module.exports = (activities) =>
  activities.reduce(
    (acc, activity) => {
      acc.duration_total += activity.duration;

      return acc;
    },
    {
      duration_total: 0,
    }
  );
