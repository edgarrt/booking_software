const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company');

router.get('/', companyController.getLandingPage);

module.exports = router;
