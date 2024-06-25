const randomHash = require('./random-hash');
const removeRefreshTokenCookie = require('./remove-refresh-token-cookie');
const applyFiltersActivities = require('./apply-filters-activities');
const applyFiltersFeedback = require('./apply-filters-feedback');
const applyFiltersIdentities = require('./apply-filters-identities');
const applyFiltersProjects = require('./apply-filters-projects');
const applyFilterVacations = require('./apply-filters-vacations');
const applyFiltersVacationRequests = require('./apply-filters-vacation-requests');
const applyFiltersVacationStats = require('./apply-filters-vacation-stats');
const applyFiltersVacationTransactions = require('./apply-filters-vacation-transactions');
const applyFiltersPolls = require('./apply-filters-polls');
const applySortPolls = require('./apply-sort-polls');
const formatDuration = require('./format-duration');
const formatPersonName = require('./format-person-name');
const formatDate = require('./format-date');
const vacationTotals = require('./vacation-totals');
const getTotalWorkingHours = require('./get-total-working-hours');
const getDaysBetweenDates = require('./get-days-between-dates');
const getNonStandardDays = require('./get-non-standard-days');
const calculateEmailReports = require('./calculate-email-reports');
const getBreakdownByCollaborator = require('./get-breakdown-by-collaborator');
const getBreakdownByProject = require('./get-breakdown-by-project');
const getCollaboratorsMissingActivity = require('./get-collaborators-missing-activity');
const getBreakdownForAllCollaborators = require('./get-breakdown-for-all-collaborators');
const getAllCollaboratorsWithMissingActivity = require('./get-all-collaborators-with-missing-activity');
const applyFiltersPointLogs = require('./apply-filters-point-logs');
// Aliases for functions that are used in multiple places
const { coffee, error, falsy, safeNumber, safeString } = require('express-goodies/functions');

module.exports = {
  applyFiltersActivities,
  applyFiltersFeedback,
  applyFiltersIdentities,
  applyFiltersProjects,
  applyFilterVacations,
  applyFiltersVacationRequests,
  applyFiltersVacationStats,
  applyFiltersVacationTransactions,
  applyFiltersPolls,
  applySortPolls,
  formatDuration,
  formatPersonName,
  formatDate,
  randomHash,
  removeRefreshTokenCookie,
  vacationTotals,
  getTotalWorkingHours,
  getDaysBetweenDates,
  getNonStandardDays,
  calculateEmailReports,
  getBreakdownByCollaborator,
  getBreakdownByProject,
  getCollaboratorsMissingActivity,
  getBreakdownForAllCollaborators,
  getAllCollaboratorsWithMissingActivity,
  applyFiltersPointLogs,
  
  // Aliases
  coffee,
  error,
  falsy,
  safeNumber,
  safeString,
};
