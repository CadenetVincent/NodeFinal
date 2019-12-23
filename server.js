const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

const authRoute = require('./route/auth.route.js');
const userRoute = require('./route/user.route.js');
const schoolRoute = require('./route/school.route.js');

var port =  process.env.PORT || 3001;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://User:User@cluster0-k3dxs.gcp.mongodb.net/ececadenetfritel", { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

var db = mongoose.connection;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.set('useFindAndModify', false);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './public')));

app.use(session({
  secret: 'secret_Cadenet_Fritel',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.use('/', authRoute);
app.use('/user', userRoute);
app.use('/school', schoolRoute);

app.listen(port, function () {
  "use strict";
  console.log('Ready');
});

module.exports = app;
