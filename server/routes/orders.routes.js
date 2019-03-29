const controller = require('../controllers/orders.controller'),
      express = require('express'),
      router = express.Router();

router.route('/')
    .get(controller.list)
    .post(controller.create);

router.route('/:orderId')
    .get(controller.read)
    .put(controller.update);

router.route('/:orderId/download')
    .get(controller.download);

router.route('/capture')
    .post(controller.capture);

module.exports = router;