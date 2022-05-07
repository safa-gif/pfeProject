const express = require('express');
const router = express.Router();
const event = require('../controllers/eventController');

router.get('/get_events', event.getEvents);
router.get('/get_event/:id',event.findEvent);
router.post('/add_events', event.createEvent);
// router.put('/modify_event/:id', event.modifyEvent);
router.delete('/delete_event/:id', event.deleteEvent);

module.exports = router;
