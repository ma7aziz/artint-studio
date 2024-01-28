// adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { checkAuthenticated, checkNotAuthenticated } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });


router.get('/dashboard', checkAuthenticated ,   adminController.getAdminDashboard);
router.post('/projects/new',  checkAuthenticated ,  upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'images', maxCount: 8 }]), adminController.postCreateProject);
router.get('/projects/:id', checkAuthenticated ,   adminController.getSingleProject);
router.post('/projects/:id/edit',  checkAuthenticated ,  upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'images', maxCount: 8 }]), adminController.updateProject);
router.post('/projects/:slug/delete', checkAuthenticated ,   adminController.deleteProject);
router.get('/messages/:id',  checkAuthenticated ,  adminController.getMessage);
router.post('/messages/:id/edit',  checkAuthenticated ,  adminController.updateMessageReadStatus);

module.exports = router;
