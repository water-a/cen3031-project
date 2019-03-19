const controller = require('../controllers/orders.controller'),
      express = require('express'),
      router = express.Router();

router.route('/')
      .get(controller.list)
      .post(controller.create);

module.exports = router;