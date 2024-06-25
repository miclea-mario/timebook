const { Router } = require('express');
const { authenticate, authorize } = require('express-goodies/middleware');
const { Stats } = require('../controllers');

const router = Router();
module.exports = router;

// Protect all non-public routes
router.all('/stats', authenticate, authorize('admin'));
router.all('/stats/*', authenticate, authorize('admin'));

// Custom routes
router.get('/stats/project/:id', Stats.getProjectStats);
router.get('/stats/project/:id/full-month', Stats.getProjectFullMonth);
router.get('/stats/people/:id', Stats.getPersonStats);
