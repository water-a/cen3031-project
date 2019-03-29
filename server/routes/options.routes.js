const controller = require('../controllers/options.controller'),
      express = require('express'),
      router = express.Router();

router.route('/')
    .get(controller.list)
    .post(controller.post);

module.exports = router;