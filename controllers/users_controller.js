

module.exports = function(req,res){
  return res.render("userHomepage",{
    title :"User1"
  })
  // return res.end("<h2> From Profile main Page</h2>");
};

module.exports.profile = function(req,res){
  return res.end("<h2> From USers's Profile Page</h2>");
};

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
  // TODO Later
}


// getting the sign In data
module.exports.createSession = function(req,res){
  // TODO Later
}