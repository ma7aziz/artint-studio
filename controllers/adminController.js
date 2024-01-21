// adminController.js

const { get } = require("mongoose");
const Project = require('../schemas/projectSchema');
const Message = require('../schemas/contactSchema');

exports.getAdminLogin = (req, res) => {
    res.render('dashboard/admin', { title: 'Admin Login' });
};

exports.getAdminDashboard = async (req, res) => {
    const projects = await getProjects()
    const messages = await getMessages()
    res.render('dashboard/dashboard', { title: 'Admin', 'projects': projects , 'messages': messages });
};

exports.postCreateProject = async (req, res) => {
    console.log(req.body)   
    try {
        const {
            arabic_name,
            english_name,
            arabic_description,
            english_description,
            slug,
            // Assuming coverImage and images are files
        } = req.body;

        // Create a new project instance
        const newProject = new Project({
            arabic_name,
            english_name,
            arabic_description,
            english_description,
            slug,
            // Add any other fields here
        });

        // Save the project
        await newProject.save();
        res.status(201).json({ message: 'Project saved successfully' });
    } catch (error) {
        console.error('Error saving project:');
        res.status(500).json({ error: error.message });
    }
}

exports.getSingleProject = async (req, res) => {
    const projectId = req.params.id;

    try {
        const project = await Project.findById(projectId);
        res.render('dashboard/singleProject', { title: 'project details', project });
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getEditProject = async (req, res) => {
    const projectId = req.params.id;

    try {
        const project = await Project.findById(projectId);
        res.render('dashboard/editProject', { title: 'Edit project', project });
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).send('Internal Server Error');
    }
}

exports.deleteProject = async (req, res) => {
    console.log(req.params)
    const projectId = req.params.slug;

    try {
        await Project.findOneAndDelete({ slug: projectId });
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).send('Internal Server Error');
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
    console.log('Accessed')
    const messageId = req.params.id;

    try {
        await Message.findByIdAndUpdate(messageId, { read: true });
        
        res.redirect( '/admin/dashboard' );
    } catch (error) {
        console.error('Error updating message read status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
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
