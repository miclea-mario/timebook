module.exports = async (activities) => {
  // breakdown by project
  const projectBreakdown = {}; // To store the breakdown by project

  // iterate through the activities and calculate the breakdown by project
  activities.forEach((activity) => {
    const projectId = activity.project._id;
    const projectName = activity.project.name;
    const userId = activity.user._id;
    const userFullName = `${activity.user.first_name} ${activity.user.last_name}`;
    const duration = activity.duration / 60;

    if (!projectBreakdown[projectId]) {
      projectBreakdown[projectId] = {
        projectId,
        projectName,
        totalDuration: 0,
        collaborators: [],
      };
    }

    projectBreakdown[projectId].totalDuration += duration;
    const collaborator = projectBreakdown[projectId].collaborators.find((c) => c.userId === userId);

    if (collaborator) {
      collaborator.duration += duration;
    } else {
      projectBreakdown[projectId].collaborators.push({
        userId,
        userFullName,
        duration,
      });
    }
  });

  // convert the projectBreakdown object into an array of project objects
  const breakdownByProjectArray = Object.values(projectBreakdown);

  return breakdownByProjectArray;
};
