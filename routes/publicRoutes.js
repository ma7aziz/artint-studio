const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

router.get('/', publicController.getHome);
router.get('/about', publicController.getAbout);
router.get('/contact', publicController.getContact);
router.get('/portfolio', publicController.getPortfolio);

router.post('/contact', publicController.postContact);

module.exports = router;