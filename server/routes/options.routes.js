const controller = require('../controllers/options.controller'),
      auth = require('../controllers/auth.controller'),
      express = require('express'),
      router = express.Router();

router.route('/')
    .get(controller.list);

router.use(auth.check);
router.route('/materials/:material')
    .post(controller.materials.add)
    .delete(controller.materials.delete);
router.route('/sizes/max')
    .put(controller.sizes.setMax);
router.route('/sizes/:height/:width')
    .post(controller.sizes.add)
    .delete(controller.sizes.delete);
router.route('/content/:name')
    .put(controller.content.update);


module.exports = router;