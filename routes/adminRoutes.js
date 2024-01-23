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


router.get('/dashboard',  adminController.getAdminDashboard);
router.post('/projects/new',  upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'images', maxCount: 8 }]), adminController.postCreateProject);
router.get('/projects/:id',  adminController.getSingleProject);
router.post('/projects/:id/edit',  upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'images', maxCount: 8 }]), adminController.updateProject);
router.post('/projects/:slug/delete',  adminController.deleteProject);
router.get('/messages/:id',  adminController.getMessage);
router.post('/messages/:id/edit',  adminController.updateMessageReadStatus);

module.exports = router;
