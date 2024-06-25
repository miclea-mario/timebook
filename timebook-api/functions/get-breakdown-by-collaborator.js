module.exports = async (activities, identities) => {
  // Create a lookup object to map user IDs to full names
  const userIdToFullName = {};
  identities.forEach((identity) => {
    userIdToFullName[identity._id] = `${identity.first_name} ${identity.last_name}`;
  });

  // breakdown by collaborator report
  const userProjects = {};

  // Iterate through the activities and calculate total hours worked by user and project
  activities.forEach((activity) => {
    const userId = activity.user._id;
    const projectId = activity.project._id;
    const duration = activity.duration;

    // Check if the user already exists in the userProjects object
    if (!userProjects[userId]) {
      userProjects[userId] = {};
    }

    // Check if the project already exists for the user in the userProjects object
    if (userProjects[userId][projectId]) {
      userProjects[userId][projectId].duration += duration / 60;
    } else {
      userProjects[userId][projectId] = {
        projectId,
        projectName: activity.project.name,
        duration: duration / 60,
      };
    }
  });

  // Convert the userProjects object into an array of user objects with projects and hours
  const breakdownByCollaboratorArray = Object.entries(userProjects).map(([userId, projects]) => ({
    collaborator: userIdToFullName[userId], // Replace userId with full name
    totalDuration: Object.values(projects).reduce(
      (accumulator, value) => (accumulator += value.duration),
      0
    ),
    projects: Object.values(projects),
  }));

  return breakdownByCollaboratorArray;
};
