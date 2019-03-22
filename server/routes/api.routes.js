const express = require('express'),
      router = express.Router(),
      orders = require('./orders.routes'),
      settings = require('./settings.routes');

router.use('/orders', orders);
router.use('/', settings);

module.exports = router;