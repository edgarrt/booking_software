const express = require('express');
const router = express.Router();
const demoController = require('../../controllers/clients/demo');

const Multer = require('multer');
const upload = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

// Used for local system storage -> swapped for google cloud storage
//
// const path = require('path');
// var appDir = path.dirname(require.main.filename);
// const upload = multer({ dest: path.join(appDir, 'uploads/') });


router.get('/', demoController.getHomepage);
router.get('/catalogue', demoController.getCatalogue);
router.get('/intro', demoController.getIntro);
router.get('/inquiry', demoController.getInquiry);
router.post('/inquiry',upload.array('files', 12), demoController.postInquiry);
router.get('/blog', demoController.getBlog);
router.get('/about', demoController.getAbout);


module.exports = router;
