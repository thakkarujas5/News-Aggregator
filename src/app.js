const express = require('express')
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const app = express()

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later",
  });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(limiter);

app.use('/', routes);

const port = 5001


app.listen(port, (err) => {

    if (err) {
        console.error('Failed to start server:', err);
        return;
      }
      console.log(`Server listening on port ${port}`);
})

module.exports = app;