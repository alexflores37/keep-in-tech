//boiler plate for server 
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utilities/helper');
const sequalize = require('./confiq/connection')