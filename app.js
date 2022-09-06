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

mongoose.connect(
  `${process.env.DB_PREFIX}${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
  { useNewUrlParser: true, useUnifiedTopology: true, retryWrites: false },
  (e) => {
    if (e) {
      throw e;
    }
    console.log('Connected to database!');
  }
);

module.exports = app;
