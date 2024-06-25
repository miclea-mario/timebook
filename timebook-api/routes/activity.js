const { Router } = require('express');
const { authenticate, authorize } = require('express-goodies/middleware');
const { Activity } = require('../controllers');

const router = Router();
module.exports = router;

// Protect all non-public routes
router.all('/activities', authenticate, authorize('admin', 'user'));
router.all('/activities/*', authenticate, authorize('admin', 'user'));

// Custom routes
router.get('/activities', Activity.readMany);
router.post('/activities', Activity.create);
router.get('/activities/time', Activity.readTime);
router.delete('/activities/:id', Activity.remove);
router.get('/activities/calendar', Activity.readForCalendar);
router.get('/activities/:id', Activity.readOne);
router.put('/activities/:id', Activity.update);
router.post('/activities/delete-many', Activity.removeMany);
