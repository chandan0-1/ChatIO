const User = require("../models/users");
const Post = require("../models/post");


module.exports.profile = function(req,res){


  // Post.find({}, function(err,posts){
  //   return res.render("userHomepage",{
  //     title: "User Profile",
  //     posts:posts

  // })
  // })

  // populating the USer
  Post.find({})
  .populate('user')
  .populate({
    path:'comments',
    populate:{
      path:'user'
    }
  })
  .exec(function(err,posts){
    return res.render("userHomepage",{
      title: "User Profile",
      posts:posts

  })
  })
};



module.exports.chandan = function(req,res){
  return res.end("<h2> Rendering from Chandan's Profile</h2>");
};




// rendering the sign up page
module.exports.signUp = function(req,res){
  if (req.isAuthenticated()){
    return res.redirect('/users/profile');
  }

  return res.render('user_sign_up',{
    title:"ChatIO | Sign Up"
  })
};

// rendering the sign In page
module.exports.signIn = function(req,res){
  if (req.isAuthenticated()){
    return res.redirect('/users/profile');
  }

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


// getting the sign In data using passport
module.exports.createSession = function(req,res){
  return res.redirect('/');
}

module.exports.destroySession = function(req,res){
  req.logout();

  return res.redirect("/");
}