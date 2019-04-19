const controller = require('../controllers/orders.controller'),
      auth = require('../controllers/auth.controller'),
      express = require('express'),
      router = express.Router();

router.route('/')
    .post(controller.create)
    .get(auth.check, controller.list);

router.route('/capture')
    .post(controller.capture);

router.route('/:orderId')
    .all(auth.check)
    .get(controller.read)
    .put(controller.update);

router.route('/:orderId/preview')
    .get(controller.view);

module.exports = router;