const controller = require('../controllers/example.server.controller.js'),
      express = require('express'),
      router = express.Router();

router.route('/')
      .get(controller.get)
      .post(controller.post);

module.exports = router;