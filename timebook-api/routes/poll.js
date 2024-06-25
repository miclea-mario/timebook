const { Router } = require('express');
const { Poll } = require('../controllers');
const { authenticate, authorize } = require('express-goodies/middleware');

const router = Router();
module.exports = router;

// Protect all non-public routes
router.all('/polls', authenticate);
router.all('/polls/*', authenticate);

// Custom routes
router.post('/polls', authorize('admin', 'user'), Poll.create);
router.put('/polls/:id', authorize('admin', 'user'), Poll.update);
router.put('/polls/:id/vote', authorize('admin', 'user'), Poll.votePoll);
router.put('/admin/polls/:id/approve', authorize('admin'), Poll.approvePoll);
router.put('/admin/polls/:id/reject', authorize('admin'), Poll.rejectPoll);
router.put('/admin/polls/:id/activate', authorize('admin'), Poll.activatePoll);
router.put('/admin/polls/:id/deactivate', authorize('admin'), Poll.deactivatePoll);
router.delete('/admin/polls/:id', authorize('admin'), Poll.remove);
router.get('/polls', authorize('admin', 'user'), Poll.readMany);
router.get('/polls/:id', authorize('admin', 'user'), Poll.readOne);
