const express = require('express'),
      router = express.Router(),
      orders = require('./orders.routes'),
      options = require('./options.routes');

router.use('/orders', orders);
router.use('/options', options);

module.exports = router;