const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');
const env = require("../config/environment")

// telling passport to use a new Strategy for google login
passport.use(new googleStrategy({
    clientID: env.google_clientID,
    clientSecret: env.google_clientSecret,
    callbackURL: env.google_callbackURL
  },

  function(accesstoken, refreshtoken, profile, done){
    // finding a User
    User.findOne({email: profile.emails[0].value}).exec(function(err,user){
      if (err){console.log("Error in google passport Strategy:",err); return;}

      console.log(profile);

      if (user){
        // if found set this user as req.user
        return done(null, user);
      }else{
        // if not found then create the user and set it  as req.user
        User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: crypto.randomBytes(20).toString('hex')
        }, function(err, user){
          if (err){console.log("Error in google passport Strategy:",err); return;}

          return done(null, user);
        })
      }



    })
  }

));

module.exports = passport;