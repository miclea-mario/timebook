module.exports = ([...activities]) => {
  let totalWorked = 0;

  for (let i = 0; i < activities.length; i++) {
    const { duration } = activities[i];
    totalWorked += duration;
  }
  totalWorked = Math.round((totalWorked / 60) * 100) / 100;

  return {
    totalWorked,
  };
};
