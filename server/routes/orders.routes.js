const controller = require('../controllers/orders.controller'),
      express = require('express'),
      router = express.Router();

router.route('/')
      .get(controller.list)
      .post(controller.create);

router.route('/:orderId')
    .get(controller.read)
    .post(controller.update);

router.route('/complete/:orderId')
    .get(controller.read)
    .post(controller.complete);

router.route('/refund/:orderId')
    .get(controller.read)
    .post(controller.refund);
    
router.route('/checkout')
    .get(controller.paypal);

router.route('/admin') //probs will move everything related to this elsewhere but just wanted to get it somewhat set up
    .get(controller.listorders)
    //.delete(controller.delete)
    .put(controller.update);

router.param('orderId', controller.orderByID);
module.exports = router;