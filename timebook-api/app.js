require('express-async-errors');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { connectToMongo, setupCors } = require('express-goodies');
const deactivatePolls = require('./crons/deactivate-polls');
const birthdayReport = require('./crons/birthday-report');
const router = require('./router');
const { whitelist } = require('./site.config');
const app = express();
const dailyReport = require('./crons/daily-report');
const weeklyReport = require('./crons/weekly-report');
const monthlyReport = require('./crons/monthly-report');

// Connect to the database using a cached connection when available
connectToMongo();

// Configure express app
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Custom cors config
app.use(setupCors(whitelist));

// Route everything
app.use(router);

// Cron jobs
deactivatePolls().start();
birthdayReport().start();
dailyReport().start();
weeklyReport().start();
monthlyReport().start();

module.exports = app;
