const { Router } = require('express');
const { Admin } = require('../controllers');

const router = Router();
module.exports = router;

// Custom routes
router.post('/admin/activities/export', Admin.exportActivities);
router.post('/admin/activities/delete', Admin.batchDeleteActivity);
router.put('/admin/activities/move', Admin.batchMoveActivity);
router.put('/activities/:id/admin/update', Admin.updateActivity);
