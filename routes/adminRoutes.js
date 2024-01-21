// adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.getAdminLogin);
router.get('/dashboard', adminController.getAdminDashboard);
router.post('/projects/new', adminController.postCreateProject);
router.get('/projects/:slug', adminController.getSingleProject);
router.get('/projects/:slug/edit', adminController.getEditProject);
router.post('/projects/:slug/delete', adminController.deleteProject);
router.get('/messages/:id', adminController.getMessage);
router.post('/messages/:id/edit', adminController.updateMessageReadStatus);

module.exports = router;
