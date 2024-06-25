const { Router } = require('express');
const { authenticate, authorize } = require('express-goodies/middleware');
const { PointLogs } = require('../controllers');

const router = Router();
module.exports = router;

// Protect all non-public routes
router.all('/point-logs', authenticate);
router.all('/point-logs/*', authenticate);

// Custom routes
router.get('/point-logs', PointLogs.readMany);
