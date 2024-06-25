const { Router } = require('express');
const { authenticate, authorize } = require('express-goodies/middleware');
const { VacationTransaction } = require('../controllers');

const router = Router();
module.exports = router;

// Protect all non-public routes
router.all('/vacation-transaction', authenticate);
router.all('/vacation-transaction/*', authenticate);

// Custom routes
router.post('/vacation-transaction', authorize('admin'), VacationTransaction.create);
router.get('/vacation-transactions', authorize('admin', 'user'), VacationTransaction.readMany);
router.delete('/vacation-transactions/:id', authorize('admin'), VacationTransaction.remove);
