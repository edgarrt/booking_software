const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');


router.get('/', userController.getLogin);
router.post('/', userController.postLogin);
router.get('/signup', userController.getSignup);
router.post('/signup', userController.postSignup);
router.get('/logout', userController.logout);
router.get('/forgot', userController.getForgot);
router.post('/forgot', userController.postForgot);
router.get('/reset/:token', userController.getReset);
router.post('/reset/:token', userController.postReset);


module.exports = router;
