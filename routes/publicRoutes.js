const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');
const adminController = require('../controllers/adminController');
const { checkAuthenticated, checkNotAuthenticated } = require('../middleware/authMiddleware');
router.get('/', publicController.getHome);
router.get('/about', publicController.getAbout);
router.get('/contact', publicController.getContact);
router.get('/portfolio', publicController.getPortfolio);
router.get('/portfolio/:slug/details', publicController.getProjectDetails);
router.post('/contact', publicController.postContact);
router.get('/language/:lang', publicController.changeLanguage);
router.get('/admin',checkNotAuthenticated ,  adminController.getAdminLogin);
// router.get('/uploads/:file', publicController.getImages);


module.exports = router;