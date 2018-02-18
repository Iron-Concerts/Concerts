const mongoose = require('mongoose');
const eventModel = require('../models/event.model');
const EVENT_TYPES = require('../models/events-type');
console.log('dentro del controlador');

module.exports.index = (req, res, next) => {
  eventModel.find()
    .sort({createdAt: -1})
    .then((events) => {
      res.render('events/index', {
        events:events
      });
      console.log(events);
    }).catch(error => next(error));
};

module.exports.showFormCreate = (req, res, next) => {
  res.render('events/create',{
    eventsType: EVENT_TYPES
  });
};

module.exports.create = (req, res, next) => {
  console.log(req.file.filename);
  console.log(req.body);
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
    imgEvent: req.file.filename
  });

  Event.save()
    .then(() => {
      res.redirect('/events');
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

module.exports.pic = (req, res) => {
  console.log(req.params.id);
  eventModel.findById(req.params.id).then((event) => {
    res.sendFile(path.join(__dirname, '../', event.file));
  });
};

module.exports.showEdit = (req, res, next) => {
console.log(req.params.id);
  // eventModel.findById(req.params.id)
  //  .then(() => {
  //    res.render('events/edit');
  //    console.log(res);
  //    console.log('id '+req.params.id);
  //  }).catch(error => next(error));

   eventModel.findById(req.params.id).then((ev) => {
     res.render('events/edit', {ev});
   });
};

// module.exports.update = (req, res, next) => {
//   console.log(req.body);
//   eventModel.findByIdAndUpdate( req.params.id,
//         {$set: {
//         events: req.body.events,
//         artist: req.body.artist,
//         description: req.body.description,
//         eventType: req.body.eventType,
//         eventDate: req.body.eventDate,
//         venue: req.body.venue,
//         location: req.body.location,
//         price: req.body.price,
//         imgEvent: req.body.imgEvent
//          }}
//      ).then((ev) => {
//     //  console.log(user);
//       res.render('events/index', {
//         ev: ev
//       });
//     }).catch(error => next(error));
// };
