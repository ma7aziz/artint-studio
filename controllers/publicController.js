// publicController.js

const ContactMessage = require('../schemas/contactSchema');
const Project = require('../schemas/projectSchema');

exports.getHome = (req, res) => {
    res.render('index', { title: 'Home' });
};

exports.getAbout = (req, res) => {
    res.render('about', { title: 'About' });
};

exports.getContact = (req, res) => {
    res.render('contact', { title: 'Contact' });
};

exports.getPortfolio = (req, res) => {
    console.log('page accessed');
    res.render('portfolio', { title: 'Portfolio' });
};

exports.postContact = (req, res) => {
    const { name, phone, email, subject, message } = req.body;

    const contactMessage = new ContactMessage({ name, phone, email, subject, message });

    contactMessage.save()
        .then(() => {
            console.log('Contact message saved successfully.');
            res.status(200).send('Received contact form submission.');
        })
        .catch(error => {
            console.error('Error saving contact message:', error);
            res.status(500).send('Error saving contact form submission.');
        });
};


