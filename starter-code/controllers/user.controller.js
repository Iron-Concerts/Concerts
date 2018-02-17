const User = require('../models/user.model');

module.exports.index = (req, res, next) => {
  User.find({})
  .then(users => {
    res.render('user/index', {users});
  });
};

module.exports.edit = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      res.render('user/user-profile', {
        user: user
      });
    });
};

module.exports.update = (req, res, next) => {
  const userId = req.params.id;
  const {name, email, location} = req.body;
  const updates = {name, email, location};  //pendiente añadir resto de campos a actualizar

  User.findByIdAndUpdate(userId, updates).then((user) => {
    res.redirect(`${user._id}/edit`);
  });
};

module.exports.delete = (req, res, next) => {
  const userId = req.params.id;

  User.findByIdAndRemove(userId).then((user) => {
    return res.redirect('/');
  });
};
