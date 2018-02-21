const mongoose = require('mongoose');
const EventModel = require('../models/event.model');
const EVENT_TYPES = require('../models/events-type');
const UserModel = require('../models/user.model');

module.exports.index = (req, res, next) => {
    EventModel.find()
      .sort({createdAt: -1})
      .then((events) => {
        res.render('events/index', {
          events:events,
          user: req.user
        });
      }).catch(error => next(error));
};

module.exports.showFormCreate = (req, res, next) => {
  res.render( 'events/create',{
    eventsType: EVENT_TYPES,
    newEvent: new EventModel(),
  });
};

module.exports.getAll = (req, res) => {
  const user = req.user;
  EventModel.find({})
    .then(events => res.json({user, events}));
};

module.exports.create = (req, res) => {
  const newEvent = new EventModel({
    events: req.body.events,
    nameTour: req.body.nameTour,
    artist: req.body.artist,
    description: req.body.description,
    typeStyle: req.body.typeStyle,
    eventDate: req.body.date,
    venue: req.body.venue,
    location: req.body.location,
    price: req.body.price,
    imgEvent: typeof req.file !== 'undefined' ? req.file.filename : ''
  });

//Revisar!!!
newEvent.save()
.then(() => {
  // Event.save((error,ev1) => {
  //     UserModel.find({musicStyle:req.body.typeStyle})
  //     .then((users) => {
  //       users.forEach((user) => {
  //         UserModel.findByIdAndUpdate(user._id,{
  //           notifications: user.notifications.push(ev1.id)
  //         });
  //       });
  //     });
     res.redirect('/events');
//REvisar!!
    }).catch(error => {
      if (error instanceof mongoose.Error.ValidationError){
        res.render('events/create', {
          error: 'Error, couldn\'t save event',
          eventsType: EVENT_TYPES,
          newEvent,
        });
      }
    });
};

module.exports.pic = (req, res) => {
  EventModel.findById(req.params.id).then((event) => {
    res.sendFile(path.join(__dirname, '../', event.file));
  }).cath(error => next(error));
};

module.exports.showEdit = (req, res, next) => {
console.log(req.params.id);
  // EventModel.findById(req.params.id)
  //  .then(() => {
  //    res.render('events/edit');
  //    console.log('id '+req.params.id);
  //  }).catch(error => next(error));

   EventModel.findById(req.params.id).then((ev) => {
     res.render('events/edit', {
       ev: ev,
       eventsType: EVENT_TYPES
     });
   });
};

module.exports.update = (req, res, next) => {
  EventModel.findByIdAndUpdate( req.params.id,
        {events: req.body.events,
        artist: req.body.artist,
        description: req.body.description,
        eventType: req.body.eventType,
        eventDate: req.body.eventDate,
        venue: req.body.venue,
        location: req.body.location,
        price: req.body.price,
        imgEvent: req.file.filename
     }).then(() => {
      res.redirect('/events');
    }).catch(error => next(error));
};

module.exports.delete = (req, res) => {
  const eventId = req.params.id;

   EventModel.findByIdAndRemove(eventId).then(() => {
     return res.redirect('/events');
   });
};
