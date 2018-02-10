const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

const schemaTypes = mongoose.Schema.Types;

const eventSchema = new mongoose.Schema({
  events:[],
  nameTour: String,
  artist: [],
  description: String,
  eventType: String,
  eventDate: Date,
  venue: String,
  location: String,
  price: schemaTypes.Double,
  imgEvent: String
},{timestamps: true});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
