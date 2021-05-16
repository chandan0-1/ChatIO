const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');


// telling passport to use a new Strategy for google login
passport.use(new googleStrategy({
    clientID: "889160213377-pf4ovnb54grmo3mdtapnrrckf12mqpt4.apps.googleusercontent.com",
    clientSecret: "Qv5KiOsv0abpAjkQ8a1NiTsx",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
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