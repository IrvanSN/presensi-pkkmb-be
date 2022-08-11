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

mongoose.connect(
  process.env.DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, retryWrites: false },
  (e) => {
    if (e) {
      throw e;
    }
    console.log('Connected to database!');
  }
);

module.exports = app;
