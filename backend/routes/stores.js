const express = require('express');
const router = express.Router();
const storeCtrl = require('../controllers/storeController');
const ratingCtrl = require('../controllers/ratingController');
const jwtAuth = require('../middlewares/auth');
const roles = require('../middlewares/roles');

router.get('/', storeCtrl.listStores);

// rating endpoint (user only)
router.put('/:id/rating', jwtAuth, roles(['USER']), ratingCtrl.ratingValidation, ratingCtrl.rateStore);

module.exports = router;
