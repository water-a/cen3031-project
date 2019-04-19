const controller = require('../controllers/contact.controller'),
      auth = require('../controllers/auth.controller'),
      express = require('express'),
      router = express.Router();

router.route('/')
    .get(auth.check, controller.list)
    .post(controller.post);

module.exports = router;