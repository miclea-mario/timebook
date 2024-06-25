module.exports = async (activities) => {
  // missing activities
  const collaboratorHours = {};

  // iterate through the activities and calculate total hours worked by collaborator
  activities.forEach((activity) => {
    const userId = activity.user._id;
    const userFullName = `${activity.user.first_name} ${activity.user.last_name}`;
    const duration = activity.duration;
    const isPartTime = activity.user.hoursPerDay === 4;
    const targetDuration = isPartTime ? 240 : 480;

    if (!collaboratorHours[userId]) {
      collaboratorHours[userId] = {
        userId,
        userFullName,
        totalDuration: 0,
      };
    }

    collaboratorHours[userId].totalDuration += duration;

    if (collaboratorHours[userId].totalDuration < targetDuration) {
      collaboratorHours[userId].difference =
        (targetDuration - collaboratorHours[userId].totalDuration) / 60;
    } else {
      collaboratorHours[userId].difference = 0;
    }
  });

  // convert the collaboratorHours object into an array of collaborator objects
  const collaboratorResult = Object.values(collaboratorHours).filter(
    (collaborator) => collaborator.difference > 0
  );

  return collaboratorResult;
};
