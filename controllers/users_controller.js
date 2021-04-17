const User = require("../models/users");

// module.exports = function(req,res){
//   return res.render("userHomepage",{
//     title :"User1"
//   })
//   // return res.end("<h2> From Profile main Page</h2>");
// };

module.exports.profile = function(req,res){
  if (req.cookies.user_id){
    User.findById(req.cookies.user_id,function(err,user){
      if (user){
        return res.render("userHomepage",{
          title:"User",
          user:user
        })
      }
      return res.redirect("/users/sign-in");
    })
  }
  return res.redirect("/users/sign-in");
}



module.exports.chandan = function(req,res){
  return res.end("<h2> Rendering from Chandan's Profile</h2>");
};

// module.exports.home = function (req,res){
//   return res.end("<h1> From the home controller")
// }


// rendering the sign up page
module.exports.signUp = function(req,res){
  return res.render('user_sign_up',{
    title:"ChatIO | Sign Up"
  })
};

// rendering the sign In page
module.exports.signIn = function(req,res){
  return res.render('user_sign_in',{
    title:"ChatIO | Sign In"
  })
};

// getting the sign up data
module.exports.create = function(req,res){
  if (req.body.password != req.body.confirm_password){
    return res.redirect("back");
  }
  User.findOne({email:req.body.email},function(user){
    
    if (!user){
      User.create(req.body,function(user){
        return res.redirect("sign-in");
      })
    }
    else{
      return res.redirect("back");
    }
  });
}

// getting the sign In data
module.exports.createSession = function(req,res){
  // finding the user
  User.findOne({email:req.body.email},function(err,user){
    if (err){console.log("Error in Sign In");return}

    if (user){

      // if password doesn't match
      if (user.password != req.body.password){
        return res.redirect("back");
      }

      // handling the cookies session
      res.cookie('user_id',user.id);
      return res.redirect('/users')

    }else{

      // handle user not found
      return res.redirect("back");
    }
  })
}