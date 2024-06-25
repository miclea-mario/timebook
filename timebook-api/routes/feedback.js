const { Router } = require('express');
const { authenticate, authorize } = require('express-goodies/middleware');
const { Feedback } = require('../controllers');

const router = Router();
module.exports = router;

// Protect all non-public routes
router.all('/feedback', authenticate);
router.all('/feedback/*', authenticate);

// Custom routes
router.get('/feedback', authorize('admin'), Feedback.readMany);
router.post('/feedback', authorize('admin', 'user'), Feedback.create);
router.put('/feedback/:id', authorize('admin'), Feedback.update);
