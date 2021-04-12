module.exports.home = function (req,res){
  // return res.end("<h1> From the home controller");

  return res.render("home",{
    title:"ChatIO"
  });
};