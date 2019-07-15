const express = require('express');
const router = express.Router();
const showcaseController = require('../../controllers/clients/showcase');

const Multer = require('multer');
const upload = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});
router.get('/', showcaseController.getHomepage);
router.get('/catalogue', showcaseController.getCatalogue);
router.get('/inquiry', showcaseController.getInquiry);
router.post('/inquiry',upload.array('files', 12), showcaseController.postInquiry);
router.get('/blog', showcaseController.getBlog);



module.exports = router;
