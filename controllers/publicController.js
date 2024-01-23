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

exports.getProjectDetails = (req, res) => {
    res.render('project', { title: 'Project Details' });
}

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

// Change language 
exports.changeLanguage = (req, res) => {
    const lang = req.params.lang;
    res.cookie('lang', lang, { maxAge: 900000, httpOnly: true });
    res.redirect('back');
};

// // images 
// exports.getImages = async (req, res) => {
//     console.log('get images accessed');
//     console.log(req.params.file);
//     try {
//         const image = await Project.findOne({ filename: req.params.filename });
//         if (!image) {
//             return res.status(404).send('Image not found');
//         }
//         res.render('image', { image });
//     } catch (error) {
//         console.error('Error fetching images:', error);
//         res.status(500).send('Internal Server Error');
//     }
// };