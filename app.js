require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const attendanceRouter = require('./api/attendance/router');
const kafasRouter = require('./api/kafas/router');
const masterRouter = require('./api/master/router');
const studentRouter = require('./api/student/router');
const transactionRouter = require('./api/transaction/router');
const dashboardRouter = require('./api/dashboard/router');
const authenticationRouter = require('./api/authentication/router');
const { MONGO_URI } = require('./config');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/attendance', attendanceRouter);
app.use('/kafas', kafasRouter);
app.use('/master', masterRouter);
app.use('/student', studentRouter);
app.use('/transaction', transactionRouter);
app.use('/dashboard', dashboardRouter);
app.use('/auth', authenticationRouter);

mongoose?.connect(MONGO_URI)
// eslint-disable-next-line no-console
  .then(() => console.log('Connected to database!'))
  .catch((e) => {
    throw new Error(e);
  });

module.exports = app;
