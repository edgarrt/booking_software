/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressStatusMonitor = require('express-status-monitor');
const sass = require('node-sass-middleware');
const multer = require('multer');
const subdomain = require('express-subdomain');
const router = express.Router();

// import of routes needed
const login_routes = require('./routes/login.routes');
const dashboard_routes = require('./routes/dashboard.routes');
const test_routes = require('./routes/clients/test.routes');
const demo_routes = require('./routes/clients/demo.routes');
const showcase_routes = require('./routes/clients/showcase.routes');
const company_routes = require('./routes/company.routes');

// Imports gets root fodler ref
const root = path.join(__dirname, 'uploads')

/**
 * Load environment variables from .env file
 */
dotenv.config({ path: '.env' });


/**
 *  Passport configuration.
 */
const passportConfig = require('./config/passport');

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});




/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(expressStatusMonitor());
app.use(compression());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 1209600000,
            domain:'.inkdby.com'}, // two weeks in milliseconds
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect: true,
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  if (req.path === '/inquiry' || req.path === '/login') {
    next();
  } else {
    lusca.csrf()(req, res, next);
  }
});
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use('/', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/chart.js/dist'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/popper.js/dist/umd'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/jquery/dist'), { maxAge: 31557600000 }));
app.use('/webfonts', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/webfonts'), { maxAge: 31557600000 }));


/**
    May not need anymore
    Need to investigate subdomain routing more
*/
app.use((req, res, next) => {
  if (!req.subdomains.length || req.subdomains.slice(-1)[0] === 'www') return next();
  // otherwise we have subdomain here
  var subdomain = req.subdomains.slice(-1)[0];
  // keep it
  req.subdomain = subdomain;
  next();
});


//  global variable for root dir
//  Utilized in client controllers for file upload routing
app.use((req, res, next) => {
   req.appDir = root
   req.demo = '/clients/demo/inquiries/'
   req.test = '/clients/test/inquiries/'
   req.showcase = '/clients/showcase/inquiries/'
   next();
})


/**
 * Primary app routes
 */
app.use(subdomain('test', test_routes));
app.use(subdomain('showcase', showcase_routes));
app.use(subdomain('demo', demo_routes));
app.use(subdomain('login', login_routes));
app.use(subdomain('app', dashboard_routes));
app.use('/', company_routes)


/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server Error');
  });
}

app.use(function (req, res, next) {
  if (req.user){
    res.render('error_page_user')
  }else{
    res.render('error_page')
  }
})

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://inkdby.com in %s mode', chalk.green('✓'), app.get('env'));
  console.log('  Press CTRL-C to stop');
  console.log('  Enter rs to restart server\n');
});

module.exports = app;
