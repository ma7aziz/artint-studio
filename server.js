const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));



const configureServer = require('./config/server');
const configureI18n = require('./config/i18n');
const globals = require('./globals');
const nodemailer = require('nodemailer');


app.locals.globals = globals;

configureServer(app);
configureI18n(app);


// Set up routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
} );


// CONTACT FORM SUBMISSION
app.post('/contact', (req, res) => {
    const { name, phone,email, subject ,  message } = req.body;
        // Log the email content to the console for testing
        console.log('Received contact form submission:');
        console.log(`Name: ${name}`);
        console.log(`Phone Number: ${phone}`);
        console.log(`Email: ${email}`);
        console.log(`Subject: ${subject}`);
        console.log(`Message: ${message}`);
        
        res.status(200).send('Received contact form submission. Check the console for email content.');
    

});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
