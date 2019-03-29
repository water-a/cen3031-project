const controller = require('../controllers/orders.controller'),
      express = require('express'),
      router = express.Router();

/*
    GET /api/orders/ - Lists all orders (*)
        Returns:
            JSON of all the orders
    POST /api/orders/ - Creates a new order
        Requires postdata: 
            {
                height: Number,
                width: Number,
                image: Image being uploaded,
                material: String
            }
        Returns Paypal link:
            {
                status: String,
                response: {
                    redirectToPaypal: String
                }
            }
    GET /api/orders/:orderid - Returns information about the order (*)
    PUT /api/orders/:orderid - Updates information about the order (*)
    
    GET /api/orders/

    * = Requires special permissions to view
*/

router.route('/')
      .get(controller.list)
      .post(controller.create);

router.route('/:orderId')
    .get(controller.read)
    .put(controller.update)

router.route('/:orderId/download')
    .get(controller.download);

module.exports = router;