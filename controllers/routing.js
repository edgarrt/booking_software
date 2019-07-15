exports.handleSubDomain = (req, res) => {
  // no subdomain
  if (!req.subdomain) {
      // render home page
      // mydomain.com
      res.send('Homepage');

  } else if (req.subdomain === 'app') {
      // render subdomain specific page
      // Will render dashboard page
      res.redirect('/dashboard');

  } // you can extend this else logic to render the different subdomain specific page
    else if (req.subdomain === 'login') {
        res.redirect('/login');
    }else if (req.subdomain === 'test'){
        res.redirect('/home')
    }else if (req.subdomain === 'demo'){
        res.redirect('/home')
    }else if (req.subdomain === 'showcase'){
        res.redirect('/home')
    }else{
        res.send(404)
    }
};
