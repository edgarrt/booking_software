const express = require('express');
const router = express.Router();
const testController = require('../../controllers/clients/test');

const Multer = require('multer');
const upload = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

router.get('/', testController.getHomepage);
router.get('/catalogue', testController.getCatalogue);
router.get('/inquiry', testController.getInquiry);
router.post('/inquiry',upload.array('files', 12), testController.postInquiry);
router.get('/blog', testController.getBlog);



module.exports = router;
