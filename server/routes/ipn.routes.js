const controller = require('../controllers/ipn.controller'),
      express = require('express'),
      router = express.Router();

router.route('/')
    .post(controller.validate)

module.exports = router;