const express = require('express');
const app = express();
const port = 3000;



const configureServer = require('./config/server');
const configureI18n = require('./config/i18n');
const globals = require('./globals');


app.locals.globals = globals;

configureServer(app);
configureI18n(app);


// Set up routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});


// Start the server

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
