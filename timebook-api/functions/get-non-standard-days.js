const { isSameDay } = require('date-fns');
const { isWeekend } = require('date-fns');

const VACATION_STATUS_APPROVED = 'approved';

module.exports = (from, to, bankHolidayDays, userVacations, activities, userHoursPerDay = 8) => {
  if (!activities || !activities.length) {
    return { nonStandardDays: { extraTimeDays: [], incompleteDays: [] } };
  }

  const activitiesInHours = activities.map((activity) => {
    return {
      date: activity.date,
      duration: activity.duration / 60,
    };
  });

  // Group all activities by date and computing total hours worked per day
  const activitiesGroupedByDate = activitiesInHours.reduce((acc, curr) => {
    if (!acc[curr.date]) {
      acc[curr.date] = { hoursWorked: 0, date: curr.date };
    }
    acc[curr.date].hoursWorked += curr.duration;
    return acc;
  }, {});

  const activityDates = Object.values(activitiesGroupedByDate).map((activity) => {
    return {
      date: new Date(activity.date.replaceAll('-', '/')),
      hoursWorked: activity.hoursWorked,
    };
  });

  const vacationDates = [];

  // Storing into an array all vacation days between from and to dates
  userVacations
    .filter(
      (vacation) => vacation.type === 'vacation' && vacation.status === VACATION_STATUS_APPROVED
    )
    .forEach((vacation) => {
      const startDate = new Date(vacation.startDate);
      const endDate = new Date(vacation.endDate);
      for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        vacationDates.push(new Date(date));
      }
    });

  const extraTimeDays = [];
  const incompleteDays = [];

  // Computing days which are not standard (weekend, bank holiday, vacation, more than 8 hours worked or less than 8 hours worked)
  for (let i = new Date(from); i <= new Date(to); i.setDate(i.getDate() + 1)) {
    const currentDate = new Date(i);
    // console.log(currentDate.toISOString().substring(0, 10));

    const isWithinVacationInterval = vacationDates.some((vacationDate) =>
      isSameDay(vacationDate, currentDate)
    );
    const isWithinBankHolidayInterval = bankHolidayDays.some((bankHolidayDate) => {
      return isSameDay(new Date(bankHolidayDate), currentDate);
    });

    const hasActivities = activityDates.some((activityDate) =>
      isSameDay(new Date(activityDate.date), currentDate)
    );

    const isFreeDay =
      isWeekend(currentDate) || isWithinVacationInterval || isWithinBankHolidayInterval;

    if (hasActivities) {
      const activity = activityDates.find((activityDate) =>
        isSameDay(new Date(activityDate.date), currentDate)
      );

      if (isFreeDay) {
        extraTimeDays.push({
          ...activity,
          isBankHolidayDay: isWithinBankHolidayInterval,
          isWeekendDay: isWeekend(currentDate),
          isVacationDay: isWithinVacationInterval,
        });
      } else {
        if (activity.hoursWorked > userHoursPerDay) {
          extraTimeDays.push({ ...activity, isBankHolidayDay: false, isWeekendDay: false });
        } else if (activity.hoursWorked < userHoursPerDay) {
          incompleteDays.push({ ...activity, isBankHolidayDay: false, isWeekendDay: false });
        }
      }
    } else {
      if (!isFreeDay) {
        incompleteDays.push({
          date: currentDate,
          hoursWorked: 0,
          isBankHolidayDay: false,
          isWeekendDay: false,
          isVacationDay: false,
        });
      }
    }
  }

  return {
    nonStandardDays: { extraTimeDays, incompleteDays },
    vacationDates,
    bankHolidayDates: bankHolidayDays,
  };
};
