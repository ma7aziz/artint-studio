// publicController.js

const ContactMessage = require('../schemas/contactSchema');
const Project = require('../schemas/projectSchema');

exports.getHome = async (req, res) => {
    const projects = await Project.find({  }).sort({ date: -1 }).limit(3);
    
    res.render('index', { title: 'Home'  , projects});
};

exports.getAbout = (req, res) => {
    res.render('about', { title: 'About' });
};

exports.getContact = (req, res) => {
    res.render('contact', { title: 'Contact' });
};

exports.getPortfolio = (req, res) => {
    res.render('portfolio', { title: 'Portfolio' });
};

exports.getProjectDetails = async(req, res) => {
    slug = req.params.slug;
    const project =await Project.findOne({ slug: slug });

    res.render('project', { title: 'Project Details'  , project});
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
    res.cookie('i18next', lang, { maxAge: 900000, httpOnly: true });
    res.redirect('back');
};

