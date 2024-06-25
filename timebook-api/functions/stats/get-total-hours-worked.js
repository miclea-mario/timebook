const { groupBy } = require('lodash');

module.exports = (activities) => {
  // Grouping activities by project, computing total time per project and returning only needed attributes
  const perProject = Object.values(groupBy(activities, 'project._id')).map((activity) => {
    return activity.reduce(
      (acc, curr) => {
        return {
          hoursWorked: acc.hoursWorked + curr.duration / 60,
          name: curr.project.name,
          _id: curr.project._id,
        };
      },
      { hoursWorked: 0, name: '', _id: '' }
    );
  });

  // Grouping activities by date, computing total time per day and returning only needed attributes
  const perDay = Object.values(groupBy(activities, 'date')).map((activity) => {
    return activity.reduce(
      (acc, curr) => {
        return {
          hoursWorked: acc.hoursWorked + curr.duration / 60,
          date: curr.date,
        };
      },
      { hoursWorked: 0, date: '' }
    );
  });

  // Computing total time worked
  const total = perProject.reduce((acc, curr) => {
    return acc + curr.hoursWorked;
  }, 0);

  return { total, perProject, perDay };
};
