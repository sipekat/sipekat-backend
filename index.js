const bodyParser = require('body-parser');
const express = require('express');

const morgan = require('morgan');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

//routers
const routers = require('./routers');
routers(app);

//menu routes
app.use('/auth', require('./middleware'))

app.listen(3000, () => {
  console.log(`Server started on port`);
});