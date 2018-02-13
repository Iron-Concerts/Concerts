const mongoose = require('mongoose');
const eventModel = require('../models/event.model');

module.exports.index = (req, res, next) => {
  eventModel.find()
    .sort({createdAt: -1})
    .then((events) => {
      res.render('events/index', {
        events:events
      });
    }).catch(error => next(error));
};

module.exports.create = (req, res, next) => {
  const Event = new eventModel({
    events: req.body.events,
    nameTour: req.body.nameTour,
    artist: req.body.artist,
    description: req.body.description,
    eventType: req.body.eventType,
    eventDate: req.body.eventDate,
    venue: req.body.venue,
    location: req.body.location,
    price: req.body.price,
    imgEvent: req.body.imgEvent
  });

  Event.save()
    .then(() => {
      res.redirect('/event');
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError){
        res.render('events/index', {
          session: req.session.currentUser,
          errors: error.errors
        });
      }
    });
};
