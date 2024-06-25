const { Router } = require('express');
const { authenticate, recaptcha, authorize, userExists } = require('express-goodies/middleware');
const { Identity } = require('../controllers');
const { Identity: IdentityModel } = require('../models');

const router = Router();
module.exports = router;

// Protect all non-public routes
router.all('/identities', authenticate, authorize('admin'));
router.all('/identities/*', authenticate, authorize('admin'));
router.all('/identity', authenticate);
router.all('/identity/*', authenticate);

// Custom routes
router.post('/confirm/:hash', recaptcha, Identity.confirm);
router.post('/forgot', recaptcha, Identity.forgot);
router.post('/login', recaptcha, Identity.login);

router.post('/reset/:hash', recaptcha, Identity.reset);

router.post('/logout', Identity.logout);
router.post('/refresh-token', Identity.refreshToken);

router.get('/profile', authenticate, Identity.profile);

router.post('/identities', userExists(IdentityModel), Identity.create);
router.get('/identities', Identity.readMany);
router.put('/identities/:id', userExists(IdentityModel), Identity.update);
router.delete('/identities/:id', Identity.remove);
router.get('/identity/:id', authorize('admin'), Identity.readOne);
router.put('/identity/:id/change-password', authorize('admin', 'user'), Identity.changePassword);

router.get('/rankings', authenticate, Identity.rankings);
router.put('/identity/:id/points', authorize('admin', 'user'), Identity.addPoints);