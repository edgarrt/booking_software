const { promisify } = require('util');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const _ = require('lodash');
const validator = require('validator');


exports.getDashboard = (req, res, next) => {
    res.render('dashboard/dashboard_home', {
      title: req.user._id,
      user: req.user
    });
}

exports.getUser = (req, res, next) => {
    res.render('dashboard/dashboard_user', {
      title: req.user._id,
      user: req.user
    });
}

exports.getAvailability = (req, res, next) => {
    res.render('dashboard/dashboard_availability', {
      title: 'Landing Page'
    });
}

exports.getInquries = (req, res, next) => {
    res.render('dashboard/dashboard_inquiries', {
    title: 'Landing Page'
  });
}


exports.getCustomers = (req, res, next) => {
    res.render('dashboard/dashboard_customers', {
    title: 'Landing Page'
    });
}
