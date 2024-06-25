const { Router } = require('express');
const { authenticate, authorize } = require('express-goodies/middleware');
const { VacationRequest } = require('../controllers');

const router = Router();
module.exports = router;

// Protect all non-public routes
router.all('/vacation-requests', authenticate);
router.all('/vacation-requests/*', authenticate);

// Custom routes
router.post('/vacation-requests', authorize('admin', 'user'), VacationRequest.create);
router.get('/vacation-requests', authorize('admin', 'user'), VacationRequest.readMany);
router.get('/vacation-request/:id', authorize('admin', 'user'), VacationRequest.readOne);
router.put('/vacation-requests/:id', authorize('admin'), VacationRequest.update);
router.delete('/vacation-requests/:id', authorize('admin', 'user'), VacationRequest.remove);
