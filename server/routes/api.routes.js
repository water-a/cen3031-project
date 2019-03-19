const express = require('express'),
      router = express.Router(),
      orders = require('./orders.routes');

router.use('/orders', orders);

module.exports = router;