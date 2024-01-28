// publicController.js

const ContactMessage = require('../schemas/contactSchema');
const Project = require('../schemas/projectSchema');

exports.getHome = async (req, res) => {
    const lang =  res.locals.langCookieValue 
    const projects = await Project.find({  }).sort({ date: -1 }).limit(3);
    
    res.render('index', { title: lang === 'ar'? 'الرئيسية' : 'Home'  , projects});
};

exports.getAbout = (req, res) => {
    const lang =  res.locals.langCookieValue 
    res.render('about',  { title: lang === 'ar'? 'من نحن' : 'About Us'  });
};

exports.getContact = (req, res) => {
    const lang =  res.locals.langCookieValue 
    res.render('contact', { title: lang === 'ar'? 'تواصل معنا' : 'Contact Us'  });
};

exports.getPortfolio = async (req, res) => {
    const projects = await Project.find({}).sort({date : -1 });
    const lang =  res.locals.langCookieValue 
    res.render('portfolio', {title: lang === 'ar'? 'أعمالنا' : 'Portfolio', projects });
};

exports.getProjectDetails = async(req, res) => {
    slug = req.params.slug;
    const project =await Project.findOne({ slug: slug });
    const lang = res.locals.langCookieValue
    const title = lang === 'ar' ?  project.arabic_name : project.english_name
    res.render('project', { title , project});
}



// 404 


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

