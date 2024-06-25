const { startOfDay, endOfDay } = require('date-fns');
const {
  error,
  applyFiltersActivities,
  getTotalWorkingHours,
  applyFilterVacations,
  getNonStandardDays,
  vacationTotals,
} = require('../../functions');
const { getTotalHoursWorked } = require('../../functions/stats');
const { Activity, Identity, Vacation } = require('../../models');

module.exports = async (req, res) => {
  const { from, to } = req.query;
  const { id } = req.params;
  const userId = id;

  if (!from || !to) {
    throw error(400, 'Must provide start and end date filters');
  }

  if (!userId) {
    throw error(400, 'Must provide user id');
  }

  const user = await Identity.findOne({ _id: userId }).lean();
  if (!user) {
    throw error(400, 'User not found');
  }

  const hoursPerDay = user.hours_per_day || 8;

  // Applying filters for date (from and to)
  const filtersActivities = applyFiltersActivities({
    from: startOfDay(new Date(from)),
    to: endOfDay(new Date(to)),
    userId,
  });

  // Searching for activities that match the filters
  const activities = await Activity.find(filtersActivities);

  // Applying filters for vacations
  const filtersVacations = applyFilterVacations({ userId });

  // Searching for vacations that match the filters
  const vacations = await Vacation.find(filtersVacations);
  const vacationStats = vacationTotals(vacations);

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

  const { totalWorkingDays, totalWorkingHours, totalBankHolidayDays, bankHolidayDays } =
    await getTotalWorkingHours(from, to, totalVacationsApproved, hoursPerDay);

  // We pass new Date() instead of to because we want to compute the non standard days until today
  const { nonStandardDays, vacationDates, bankHolidayDates } = getNonStandardDays(
    from,
    new Date(),
    bankHolidayDays,
    vacations,
    activities,
    hoursPerDay
  );

  const remainedWorkableHours = totalWorkingDays * hoursPerDay - totalHoursWorked.total;

  // get average hours delay of activity date and activity createdAt
  let averageActivitySubmissionDelay = activities.reduce((acc, activity) => {
    const activityDate = new Date(activity.date);
    const activityCreatedAt = new Date(activity.createdAt);
    const diff = Math.round((activityCreatedAt - activityDate) / (1000 * 60 * 60 * 24));
    return acc + diff;
  }, 0);

  averageActivitySubmissionDelay = averageActivitySubmissionDelay / activities.length;

  res.status(200).json({
    userId,
    firstName: user.first_name,
    lastName: user.last_name,
    from,
    to,
    hoursPerDay,
    totalWorkingDays,
    totalWorkingHours,
    totalPaidLeaveDays: totalVacationsApproved,
    vacationDates,
    totalBankHolidayDays,
    bankHolidayDates,
    vacationsAvailable: vacationStats.available,
    remainedWorkableHours,
    totalHoursWorked,
    nonStandardDays,
    averageActivitySubmissionDelay,
  });
};
