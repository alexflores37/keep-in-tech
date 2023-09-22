//boiler plate for server 
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
//helpers importing and using the helpers from helper.js
const helpers = require('./utilities/helper');
const hbs = exphbs.create({ helpers });

//sequalize connection and importing for session
const sequalize = require('./confiq/connection')
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//callback for starting the app and opening connection for port 3001
const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {  //activates the server
  app.listen(PORT, () => console.log('Now listening'));
});