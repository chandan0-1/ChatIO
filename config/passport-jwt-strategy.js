const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const env = require("../config/environment")


const User = require('../models/users');

let opts = {
  jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwt_secretKey,
}


passport.use(new JWTStrategy(opts, function(jwtPayload, done){
  User.findById(jwtPayload._id, function(err, user){
    if (err) {console.log("Error in finding the User from JWT"); return;}

    if (user){
      return done(null, user);
    }
    else{
      return done(null, false);
    }
  })
}));


module.exports = passport;