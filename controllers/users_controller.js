

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