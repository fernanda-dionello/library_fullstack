const express = require('express');
const router = express.Router();
const client_controller = require('../controllers/client_controller');

router.get('/', client_controller.listClients);
router.get('/:registration_number', client_controller.listClientByRegistrationNumber);
router.post('/', client_controller.createClients);
router.put('/:registration_number', client_controller.updateClient);
router.delete('/:registration_number', client_controller.removeClient);

module.exports = router;