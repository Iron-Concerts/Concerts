const mongoose = require('mongoose');
const EVENT_TYPES = require('./events-type');

const eventSchema = new mongoose.Schema({
  events:[],
  nameTour: String,
  artist: [],
  description: String,
  eventType: [{
    type: String,
    enum: EVENT_TYPES
  }],
  eventDate: Date,
  venue: String,
  location: String,
  price: Number,
  imgEvent: String
},{timestamps: true});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
