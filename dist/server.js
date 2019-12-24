"use strict";
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var authRoute = require('./route/auth.route');
var userRoute = require('./route/user.route');
var schoolRoute = require('./route/school.route');
var port = process.env.PORT || 3000;
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://User:User@cluster0-k3dxs.gcp.mongodb.net/ececadenetfritel", { useNewUrlParser: true }).then(function () { console.log('Database is connected'); }, function (err) { console.log('Can not connect to the database' + err); });
var db = mongoose.connection;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.set('useFindAndModify', false);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')));
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
