const routes = require('./routes');
const { Router } = require('express');
const middleware = require('express-goodies/middleware');

const router = Router();
module.exports = router;

// Use express context
router.use(middleware.httpContext);

// Use speed limiter for all requests
router.use(middleware.speedLimiter);

// Protect all non-public routes
router.all('/admin', middleware.authenticate, middleware.authorize('admin'));
router.all('/admin/*', middleware.authenticate, middleware.authorize('admin'));

// Useful middleware for testing
router.use(middleware.testError);
router.use(middleware.testLoading);

// Use the router instances defined
router.use(routes.poll);
router.use(routes.identity);
router.use(routes.project);
router.use(routes.activity);
router.use(routes.admin);
router.use(routes.timesheet);
router.use(routes.stats);
router.use(routes.feedback);
router.use(routes.vacation);
router.use(routes.vacationRequest);
router.use(routes.vacationStats);
router.use(routes.vacationTransaction);
router.use(routes.pointLogs);
// Matches any other HTTP method and route not matched before
router.all('*', middleware.notFound);

// Finally, an error handler
router.use(middleware.errorHandler);
