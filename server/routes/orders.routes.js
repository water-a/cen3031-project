const controller = require('../controllers/orders.controller'),
      express = require('express'),
      router = express.Router();

router.route('/')
      .get(controller.list)
      .post(controller.create);
    
router.route('/checkout')
    .get(controller.paypal);

router.route('/admin') //probs will move everything related to this elsewhere but just wanted to get it somewhat set up
    .get(controller.listorders)
    .delete(controller.delete)
    .put(controller.update);

module.exports = router;