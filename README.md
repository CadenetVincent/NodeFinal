# Node Final #

ECE Project : DevObs & Nodejs 2019 December

[![](https://codescene.io/projects/6384/status.svg) Get more details at **codescene.io**.](https://codescene.io/projects/6384/jobs/latest-successful/results)

# Badges #

[![Build Status](https://travis-ci.com/CadenetVincent/NodeFinal.svg?branch=master)](https://travis-ci.com/CadenetVincent/NodeFinal)

[![Coverage Status](https://coveralls.io/repos/github/CadenetVincent/NodeFinal/badge.svg?branch=master)](https://coveralls.io/github/CadenetVincent/NodeFinal?branch=master)

[![Build Status](https://www.code-inspector.com/project/2264/status/svg)](https://www.code-inspector.com/public/project/2264/NodeFinal/dashboard)

[![Build Status](https://www.code-inspector.com/project/2264/score/svg)](https://www.code-inspector.com/public/project/2264/NodeFinal/dashboard)

[![Known Vulnerabilities](https://snyk.io/test/github/CadenetVincent/NodeFinal/badge.svg?targetFile=package.json)](https://snyk.io/test/github/CadenetVincent/NodeFinal?targetFile=package.json)

<img alt="Last Version" src="https://img.shields.io/github/package-json/v/CadenetVincent/NodeFinal">
<img alt="Size" src="https://img.shields.io/github/languages/code-size/CadenetVincent/NodeFinal">
<img alt="docker-compose" src="https://img.shields.io/badge/docker--compose-mongo%20atlas%20%2B%20node-blueviolet">


# Resume / Introduction #

### What we use ? 

- [x] `Language` : NodeJS, EJS, express, Typescript, MongoDB (NoSQL), Linux,...
- [x] `Database` : MongoDB Atlas.
- [x] `CI/CD` : Travis-CI, Coveralls. 
- [x] `Unit Test` : Mocha/Chai, Nodejs. 
- [x] `Code verification` : Code-inspector,snyk.io.
- [x] `Deployment` : Docker, Docker-compose, Heroku (production).

### See more about ...

| Realisations | URL |
|---------|-------|
| Heroku deployment :  | https://finalnodecadenet.herokuapp.com/ |
| Code inspector : | https://www.code-inspector.com/public/project/2264/NodeFinal/dashboard |
| Coverage Status : | https://coveralls.io/github/CadenetVincent/NodeFinal?branch=master |
| Build Status : | https://travis-ci.com/CadenetVincent/NodeFinal |
| Vulnerabilities : | https://snyk.io/test/github/CadenetVincent/NodeFinal |

# Prerequisites #

> The project is running on Ubuntu 18.04.3 LTS (Linux).

> The version of node used is : v12.13.0.

> The version of npm used is : v6.12.1.

The version of :
- Docker-compose version 1.18.0, build 8dd22a9
- Docker version 19.03.5, build 633a0ea838
- Heroku-CLI heroku/7.35.0 linux-x64 node-v12.13.

Dependencies, DevDependencies are accessible in the package.json.

Public file folder :

> Bootstrap v4.3.1 (https://getbootstrap.com/)

> jQuery v3.4.1 | (c) JS Foundation and other contributors | jquery.org/license 

> Chart.js v2.9.3 | https://www.chartjs.org | (c) 2019 Chart.js Contributors | Released under the MIT License

# Install & build the application #

Our public git :

https://github.com/CadenetVincent/NodeFinal

Install the application :

    $ git clone https://github.com/CadenetVincent/NodeFinal
    $ cd NodeFinal
    $ npm install

### Build and start Unit Test / populate in the application : 

Build & start unit test with Nodejs, MongoDB Atlas, Mocha/Chai, Travis-CI and Coveralls : 

Docker-compose : 

    $ sudo docker-compose up --build

Npm test : 

    $ npm run test

Npm populate the DATABASE :

    $ npm run populate 

### Run & build the Node Application : 

Npm start (with Node / Nodejs): 

    $ npm run start

Npm start (with ts-node / Typescript):

    $ npm run start_ts

Npm start (with nodemon / Nodejs):

    $ npm run start_js

Dev start :

    $ npm run dev 

Build with Typescript :

    $ npm run build_app

Heroku deployment : 

https://finalnodecadenet.herokuapp.com/

# Contributors #

- CADENET Vincent Gr02 SI ECE (github : https://github.com/CadenetVincent email : vincad-20@hotmail.fr)
- FRITEL Ludovic Gr02 SI ECE (github : https://github.com/LudoSouthPigalle email : ludovicfritel@gmail.com)

**[See More about contributors](https://github.com/CadenetVincent/NodeFinal/blob/master/CONTRIBUTORS.md)**

# license & copyright #

> Vincent Cadenet and Fritel Ludovic, ECE Paris

> Licensed under the [MIT License](LICENSE)

# server.ts (main of the project) #

```typescript
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

const authRoute = require('./route/auth.route');
const userRoute = require('./route/user.route');
const schoolRoute = require('./route/school.route');

var port =  process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://User:User@cluster0-k3dxs.gcp.mongodb.net/ececadenetfritel", { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  (err:any) => { console.log('Can not connect to the database'+ err)}
);

var db = mongoose.connection;

app.use(bodyParser.urlencoded({extended: true}));
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


```





