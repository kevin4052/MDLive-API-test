// ============ File Imports ==================
require('dotenv').config();
const express = require('express');
const app = express();

// ================= Database =================
// require('./configs/db.config');

// ================== ROUTES ==================
app.use('/api', require('./routes/index.routes'));

module.exports = app;
