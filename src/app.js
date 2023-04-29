const express = require('express')
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/', routes);

const port = 5001


app.listen(port, (err) => {

    if (err) {
        console.error('Failed to start server:', err);
        return;
      }
      console.log(`Server listening on port ${port}`);
})