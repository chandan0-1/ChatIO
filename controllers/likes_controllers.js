const Like = require('../models/like');
const Comment = require('../models/comment')
const Post = require('../models/post');

module.exports.toggleLike = async function(req, res){
  try{
    //like/toggle/?id=abcd&type=post
    let likeable;
    let deleted = false;

    if (req.query.type == "Post"){
      likeable = await Post.findById(req.query.id).populate('likes');
    }
    else{
      likeable = await Comment.findById(req.query.id).populate('likes');
    }


    // Checking if likes already Exists
    let existingLike = await like.findOne({
      likeable: req.query.id,
      onModel: req.query.type,
      user: req.query._id
    })

    // if a like is already exists then deleting it
    if (existingLike){
      likeable.likes.pull(existingLike._id);
      likeable.save();
      existingLike.remove();
      deleted = true;
    }else{
      // else creating a like
      let newLike = await Like.create({
        user: req.user.id,
        likeable: req.query.id,
        onModel: req.query.type
      })

      likeable.likes.push(like.id);
      likeable.save();
    }

    return res.json(200, {
      message: "Request is Succesfull",
      data:{
        deleted: deleted
      }
    })

  }catch(err){
    console.log(err);
    return res.json(500, {
      message: "Internal Server Error"
    })
  }
}