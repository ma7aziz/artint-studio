const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mongoose = require('./db');
const configureServer = require('./config/server');
const configureI18n = require('./config/i18n');
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');
const globals = require('./globals');

app.locals.globals = globals;

configureServer(app);
configureI18n(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Use public and admin routes
app.use('/', publicRoutes);
app.use('/admin', adminRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
