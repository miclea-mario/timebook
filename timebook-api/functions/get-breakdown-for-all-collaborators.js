module.exports = async (activities, identities) => {
  // create a map to store user-specific data
  const userActivitiesMap = new Map();

  for (const user of identities) {
    const userActivities = activities.filter((activity) => {
      return activity.user._id.toString() === user._id.toString();
    });

    const totalDurationForInterval = userActivities.reduce((total, activity) => {
      return total + activity.duration;
    }, 0);

    const userTotalDurationMap = new Map();

    for (const activity of userActivities) {
      const project = activity.project;
      const projectName = project.name;
      const duration = activity.duration;

      if (userTotalDurationMap.has(projectName)) {
        userTotalDurationMap.set(projectName, userTotalDurationMap.get(projectName) + duration);
      } else {
        userTotalDurationMap.set(projectName, duration);
      }
    }

    const totalDurations = Array.from(userTotalDurationMap, ([projectName, totalDuration]) => ({
      projectName,
      totalDuration: totalDuration / 60,
    }));

    userActivitiesMap.set(user, {
      projectDurations: totalDurations,
      totalDurationForInterval, // add total duration for the entire week
    });
  }

  // convert the map to an array of objects
  const usersWithActivitiesInInterval = Array.from(userActivitiesMap, ([user, data]) => ({
    user: `${user.first_name} ${user.last_name}`,
    projects: data.projectDurations,
    totalDurationForInterval: data.totalDurationForInterval / 60,
  }));

  return usersWithActivitiesInInterval;
};
