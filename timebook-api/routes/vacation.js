const { Router } = require('express');
const { authenticate, authorize } = require('express-goodies/middleware');
const { Vacation } = require('../controllers');

const router = Router();
module.exports = router;

// Protect all non-public routes
router.all('/vacations', authenticate);
router.all('/vacations/*', authenticate);

// Custom routes
router.get('/vacations', authorize('admin', 'user'), Vacation.readMany);
router.post('/vacations', authorize('admin', 'user'), Vacation.create);
router.delete('/vacations/:id', authorize('admin', 'user'), Vacation.remove);
router.put('/vacations/:id', authorize('admin'), Vacation.update);
