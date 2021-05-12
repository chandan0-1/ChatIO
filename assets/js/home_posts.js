{
  // method to submit the form data for new post using AJAX
  let createPost = function(){
    let newPostForm = $('#new-post-form');

    newPostForm.submit(function(Event){
      Event.preventDefault();

      $.ajax({
        type: 'post',
        url: '/posts/create',
        data: newPostForm.serialize(),
        success: function(data){
          console.log(data);
        }, error: function(err){
          console.log(err.responseText);
        }

      })
    })
  }

  // Method to create a post in the DOM
  createPost();
}