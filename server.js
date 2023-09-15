const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'), //created model loading here
  bodyParser = require('body-parser');
  

  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Mongoose connection error:', err);
  });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });
app.listen(port);


console.log('todo list RESTful API server started on: ' + port);