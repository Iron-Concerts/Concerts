const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, 'Email is required'],
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please fill a valid email address'
       ],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'User needs a password']
    },
    location: {
        type: String,
        required: [true, 'User needs a location']
    },
    musicStyle: {
        type: Array,
        required: [true, 'User needs a location']
    },
    imgUrl: {
        type: String,
        default: 'https://cdn3.iconfinder.com/data/icons/buildings-places/512/Concert-256.png'
    },
    rol : {
        tipo :  Cadena ,
        enumeración : [ROLE_GUEST , ROLE_ADMIN],
        predeterminado :  ROLE_GUEST
    }
}, {timestamps: true});

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR)
        .then(salt => {
            bcrypt.hash(user.password, salt)
                .then(hash => {
                    user.password = hash;
                    next();
                });
        })
        .catch(error => next(error));
});

userSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
