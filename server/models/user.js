const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    
     email : {
        type: String,
        required: true,
        trim: true,
        minlenght: 1,
        unique: true,
        validate: {
            validator: validator.isEmail, //we use validator npm module to verify if the provided email is
            message: '{VALUE} is not a valid email' // valid
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});




/* Now we use UserSchema.methods.toJSON and overriding it because we want to restrict that what exactly needed to be sent back to the user on the client end for example when a mongoose model gets converted into a JSON value,in this case, password and token should not be sent back but only a email address and id */

UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();
    
    return _.pick(userObject, ['_id', 'email']);
}

/* UserSchema.methods is an object, on this object, we can add any method that we like, and these are gonna be the instance methods, here we create 'generateAuthToken', and this instance method do have an access to the individual document present inside the 'User' Collection

we use arrow method normally, but this time we use normal ES5 because binds the this keyword */

UserSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
    
    user.tokens = user.tokens.concat([{access, token}]);
    
    return user.save().then(() => {
        return token
    })
};

/* Now in server.js file, we define our private route as app.get('/users/me'), this is a private route and we need to return the user back based on its token value, here we define our model method by UserSchema.statics and not UserSchema.method, Instance method individual are called with individual doucment documents with 'user' in lowercase, Model methods are called with 'User' with upper case  */

UserSchema.statics.findByToken = function(token) {
    var User = this;
    var decoded;
    
    try {
        decoded = jwt.verify(token, 'abc123');
    }
    catch (e) {
       return Promise.reject();
    }
    
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
};

var User = mongoose.model('User', UserSchema);
    
   

module.exports = {User};





















