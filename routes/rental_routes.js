const express = require('express');
const router = express.Router();
const rental_controller = require('../controllers/rental_controller');

router.get('/', rental_controller.listRents);
router.post('/borrow', rental_controller.borrow);
router.put('/return', rental_controller.return);

module.exports = router;