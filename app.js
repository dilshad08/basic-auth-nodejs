const express = require('express');
const createError = require('http-errors');
const dotenv = require('dotenv').config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', require('./Routes/auth.route'));

//404 handler and pass to error handler
app.use((req, res, next) => {
  next(createError(404, 'Not found'));
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({

      result: false,
      error: err.message

  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT + '...');
});
