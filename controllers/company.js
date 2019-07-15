const { promisify } = require('util');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const _ = require('lodash');
const validator = require('validator');

/**
    Gets domain root homepage
*/
exports.getLandingPage = (req, res, next) => {
    res.render('company/landing', {
      title: 'Landing'
    });
}
