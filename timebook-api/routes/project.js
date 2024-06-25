const { Router } = require('express');
const { authenticate, authorize } = require('express-goodies/middleware');
const { Project } = require('../controllers');

const router = Router();
module.exports = router;

// Protect all non-public routes
router.all('/projects', authenticate);
router.all('/projects/*', authenticate);

// Custom routes
router.get('/projects', authorize('admin', 'user'), Project.readMany);
router.get('/projects/:id', authorize('admin'), Project.readOne);
router.post('/projects', authorize('admin'), Project.create);
router.put('/projects/:id', authorize('admin'), Project.update);
router.delete('/projects/:id', authorize('admin'), Project.remove);
