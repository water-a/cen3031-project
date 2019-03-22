const controller = require('../controllers/settings.controller'),
      express = require('express'),
      router = express.Router();

router.route('/options')
    .get(controller.options)//gets materials, sizes, etc from settings
    .post(controller.post);

module.exports = router;