const mongoose = require('mongoose');
const EVENT_TYPES = require('./events-type');

const eventSchema = new mongoose.Schema({
  events: {type: String, required: true},
  nameTour: {type: String},
  artist: [{type: String}],
  description: {type: String},
  typeStyle: [{
    type: String,
    enum: EVENT_TYPES
  }],
  eventDate: {type: String},
  venue: {type: String},
  location: {type: String},
  price: {type: Number, required: true},
  imgEvent: {type: String}
},{
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
