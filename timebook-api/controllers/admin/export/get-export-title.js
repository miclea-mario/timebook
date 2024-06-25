const { formatPersonName } = require('../../../functions');

module.exports = ({ userId, projectId }, { user, project }) => {
  if (userId) {
    return formatPersonName(user);
  }
  if (projectId) {
    return project?.name;
  }
  return 'Logbook';
};
