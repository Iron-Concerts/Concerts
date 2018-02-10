const User = require('../models/user.model');

module.exports.profile = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      res.render('user/user-profile', {
        user: user
      });
    })
    .catch(error => next(error));
};
