const mongoose = require('mongoose');
const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

