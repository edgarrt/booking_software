const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard');

/**
    Handles user authenticated
*/
const dotenv = require('dotenv');
const passport = require('passport');
dotenv.config({ path: '.env' });
const passportConfig = require('../config/passport');


router.get('/', passportConfig.isAuthenticated, dashboardController.getDashboard);
router.get('/user',passportConfig.isAuthenticated, dashboardController.getUser);
router.get('/availability', passportConfig.isAuthenticated, dashboardController.getAvailability);
router.get('/inquiries',passportConfig.isAuthenticated, dashboardController.getInquries);
router.get('/customers', passportConfig.isAuthenticated, dashboardController.getCustomers);


module.exports = router;
