const express = require('express');
const router = express.Router();
const ticketsCtrl = require('../controllers/tickets') // go to the controllers folder and create tickets.js

router.get('/tickets/new', ticketsCtrl.new)
router.post('/tickets', ticketsCtrl.create)
router.post('/flights/:flightId/tickets', ticketsCtrl.addToTicketsList)

module.exports = router;