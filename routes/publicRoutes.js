const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

router.get('/', publicController.getHome);
router.get('/about', publicController.getAbout);
router.get('/contact', publicController.getContact);
router.get('/portfolio', publicController.getPortfolio);
router.get('/portfolio/details', publicController.getProjectDetails);
router.post('/contact', publicController.postContact);
router.get('/language/:lang', publicController.changeLanguage);
module.exports = router;