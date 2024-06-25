const getExportTitle = require('./get-export-title');

module.exports = ({ userId, projectId }, { user, project }) => {
  const prefix = 'Timesheet';
  const extension = 'xlsx';
  const title = getExportTitle({ userId, projectId }, { user, project });

  return `${prefix} - ${title}.${extension}`;
};
