const User = require("../models/users");
const Post = require("../models/post");


module.exports.users_profile = function(req,res){
  User.findById(req.params.id, function(err, user){
    return res.render('user_profile', {
      title:'User Profile',
      profile_user:user
    });
  });
}


module.exports.profile = async function(req,res){


  // Post.find({}, function(err,posts){
  //   return res.render("userHomepage",{
  //     title: "User Profile",
  //     posts:posts

  // })
  // })

  // populating the USer
  try{
      let posts = await Post.find({})
      .populate('user')
      .populate({
        path:'comments',
        populate:{
          path:'user'
        }
      });


      let users = await User.find({});


      return res.render("userHomepage",{
        title: "User Profile",
        posts:posts,
        all_users: users
    })
  }
  catch(err){
    console.log("Error",err);
    return;
  }
}



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
  req.flash('success', "Logged in Successfully!");
  return res.redirect('/users/profile');
}

module.exports.destroySession = function(req,res){
  req.logout();
  req.flash('success', "You have logged out!");

  return res.redirect("/");
}