// ============ File Imports ==================
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// const path = require("path");

const app = express();

// ====== require database configuration ======
require('./configs/db.config');

// ============= Middleware Setup =============
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ============== GLOBAL VARIABLES ==================
// default value for title local
app.locals.title = 'MDLive Apps API';

// ===================== ROUTES =====================
app.use('/api', require('./routes/index.routes'));

module.exports = app;
