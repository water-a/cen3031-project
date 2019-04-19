const express = require('express'),
      router = express.Router(),
      orders = require('./orders.routes'),
      options = require('./options.routes'),
      contact = require('./contact.routes');

router.use('/orders', orders);
router.use('/options', options);
router.use('/contact', contact);

module.exports = router;