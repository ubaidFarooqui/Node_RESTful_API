var {User} = require('./../models/user.js');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    
    User.findByToken(token).then((user) => {
        if(!user) {
            return Promise.reject();
        }
        
        req.user = user; // this req and res are coming from '/user/me' route down below
        req.token = token;
        next();
        
    }).catch((e) => {
        res.status(401).send();
    });
};

module.exports = {authenticate};