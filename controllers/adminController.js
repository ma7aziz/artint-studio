// adminController.js
const Project = require('../schemas/projectSchema');
const Message = require('../schemas/contactSchema');
const slugify = require('slugify'); 


// PROJECTS CONTROLLER
exports.getAdminLogin =  (req, res) => {
    res.render('dashboard/admin', { title: 'Admin Login' });
}

exports.getAdminDashboard = async (req, res) => {
    const projects = await getProjects()
    const messages = await getMessages()
    
    res.render('dashboard/dashboard', { title: 'Admin', 'projects': projects , 'contact_messages': messages });
};

exports.postCreateProject = async (req, res) => {
    try {
        const { arabic_name, english_name, arabic_description, english_description } = req.body;
        const baseSlug = english_name;
        const slug = slugify(baseSlug, { lower: true });
        const newProject = new Project({
            arabic_name,
            english_name,
            arabic_description,
            english_description,
            slug,
            coverImage: req.files['coverImage'][0].path,
            images: req.files['images'].map(file => file.path),

          });

        // Save the project
        await newProject.save();
        req.flash('success', 'تم الحفظ');
        res.redirect('back')

    } catch (error) {
        console.error('Error saving project:' , error);
        req.flash('error' , error.message)
        res.redirect('back')
    }
}

exports.getSingleProject = async (req, res) => {
    const projectId = req.params.id;

    try {
        const project = await Project.findById(projectId);
        res.render('dashboard/singleProject', { title: ` ${project.arabic_name} `, project });
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).send('Internal Server Error');
    }
};

// update project
exports.updateProject = async (req, res) => {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);

    if (!project) {
        return res.status(404).json({ error: 'Project not found' });
    }
    console.log(req.body)

    const { arabic_name, english_name, arabic_description, english_description } = req.body;
    const baseSlug = english_name;
    const slug = slugify(baseSlug, { lower: true });
    const coverImage = req.files['coverImage'] ? req.files['coverImage'][0].path : project.coverImage;
    const images = req.files['images'] ? req.files['images'].map(file => file.path) : project.images;
    const active = req.body.active ? true : false;
    const featured = req.body.featured ? true : false;

    try {
        const updatedProject = await Project.findByIdAndUpdate(projectId, {
            arabic_name,
            english_name,
            arabic_description,
            english_description,
            slug,
            coverImage,
            images,
            active,
            featured,

        }, { new: true });

        req.flash('success' , 'تم التحديث .. ')
        res.redirect('back')

    } catch (error) {
        console.error('Error updating project:', error);
        req.flash('error' , `Error .. ${error.message}`)
        res.redirect('back')
    }
}
exports.deleteProject = async (req, res) => {
    const projectId = req.params.slug;

    try {
        await Project.findOneAndDelete({ slug: projectId });
        req.flash('success' , 'تم الحذف .. ')
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error('Error deleting project:', error);
        req.flash('error' , 'خطأ اثناء الحذف .. يرجي المحاولة مرة اخري')
        res.redirect('back')
    }
};

// MESSAGES CONTROLLER
exports.getMessage = async (req, res) => {
    const messageId = req.params.id;

    try {
        const message = await Message.findById(messageId);
        res.json(message);
    } catch (error) {
        console.error('Error fetching message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// POST CONTROLLER
exports.updateMessageReadStatus = async (req, res) => {
    const messageId = req.params.id;

    try {
        await Message.findByIdAndUpdate(messageId, { read: true });
        req.flash('success' , 'تم التحديث .. ')
        res.redirect( '/admin/dashboard' );
    } catch (error) {
        console.error('Error updating message read status:', error);
        req.flash('error' , 'خطأ اثناء التحديث .. يرجي المحاولة مرة اخري')
        res.redirect('back')
    }
}

exports.ListMessages = async (req , res) => {
    const contact_messages = await Message.find({})
    res.render('dashboard/messages_list' , {'title' : 'قائمة الرسائل' , contact_messages})
}
// HELPER FUNCTIONS
let getProjects = async function () {
    try {
        const projects = await Project.find();
        return projects;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error; // Rethrow the error so it can be handled by the caller
    }
};

let getMessages = async function () {
    try {
        const messages = (await Message.find().sort('-datetime')).filter(message => !message.read);
        return messages;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error; // Rethrow the error so it can be handled by the caller
    }
}


