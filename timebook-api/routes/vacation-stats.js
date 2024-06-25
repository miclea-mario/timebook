const { Router } = require('express');
const { authenticate, authorize } = require('express-goodies/middleware');
const { VacationStats } = require('../controllers');

const router = Router();
module.exports = router;

// Protect all non-public routes
router.all('/vacation-stats', authenticate);
router.all('/vacation-stats/*', authenticate);

// Custom routes
router.get('/vacation-stats', authorize('admin'), VacationStats.readMany);
router.get('/vacation-stats/mine', authorize('admin', 'user'), VacationStats.readMine);
