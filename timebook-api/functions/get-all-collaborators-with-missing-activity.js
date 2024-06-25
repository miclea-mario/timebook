const { startOfDay, endOfDay } = require('date-fns');
const { Activity, Vacation } = require('../models');
const applyFiltersActivities = require('./apply-filters-activities');
const { getTotalHoursWorked } = require('./stats');
const getTotalWorkingHours = require('./get-total-working-hours');

module.exports = async (from, to, users) => {
  const usersWithRemainingWorkingHours = [];

  for (const user of users) {
    const userId = user._id;
    const hoursPerDay = user?.hoursPerDay || 8;

    // Applying filters for date (from and to)
    const filtersActivities = applyFiltersActivities({
      from: startOfDay(new Date(from)),
      to: endOfDay(new Date(to)),
      userId,
    });

    // Searching for activities that match the filters
    const activities = await Activity.find(filtersActivities);

    // Searching for vacations that match the filters
    const vacations = await Vacation.find({ user: userId });

    // Computing all vacations approved between from and to dates (if vacation is between 09/10/2021 and 12/10/2021 and our from and to filter is 11/10/2021 and 13/10/2021, we will count 2 days)
    const vacationsApproved = vacations.filter(
      (vacation) => vacation.type === 'vacation' && vacation.status === 'approved'
    );

    const totalVacationsApproved = vacationsApproved.reduce((acc, vacation) => {
      const startDate = startOfDay(new Date(vacation.startDate));
      const endDate = startOfDay(new Date(vacation.endDate));
      const fromDate = startOfDay(new Date(from));
      const toDate = startOfDay(new Date(to));

      const overlapStart = Math.max(startDate, fromDate);
      const overlapEnd = Math.min(endDate, toDate);

      if (overlapStart <= overlapEnd) {
        acc += (overlapEnd - overlapStart) / (24 * 60 * 60 * 1000) + 1;
      }

      return acc;
    }, 0);

    // If there are no activities for the given date range for the specified user, return an object with empty information
    let totalHoursWorked;
    if (!activities || !activities.length) {
      totalHoursWorked = { total: 0, perProject: [] };
    } else {
      // If there are activities for the given date range for the specified user, return the total hours worked and the total hours for each project
      totalHoursWorked = getTotalHoursWorked(activities, userId);
    }

    const { totalWorkingDays } = await getTotalWorkingHours(
      from,
      to,
      totalVacationsApproved,
      hoursPerDay
    );

    const remainedWorkableHours = totalWorkingDays * hoursPerDay - totalHoursWorked.total;
    remainedWorkableHours > 0 &&
      usersWithRemainingWorkingHours.push({
        user: `${user.first_name} ${user.last_name}`,
        remainedWorkableHours,
      });
  }

  return usersWithRemainingWorkingHours;
};
