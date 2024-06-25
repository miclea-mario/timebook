const { Router } = require('express');
const { authenticate, authorize } = require('express-goodies/middleware');
const { Identity, Project } = require('../controllers');

const router = Router();
module.exports = router;

// Protect all non-public routes
router.all('/timesheet', authenticate, authorize('admin'));
router.all('/timesheet/*', authenticate, authorize('admin'));

// Custom routes
router.get('/timesheet/people/:id', Identity.readTimesheet);
router.get('/timesheet/projects/:id', Project.readTimesheet);
