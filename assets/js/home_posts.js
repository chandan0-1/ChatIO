{
  // method to submit the form data for new post using AJAX
  let createPost = function () {
    let newPostForm = $('#new-post-form');

    newPostForm.submit(function(e) {
      e.preventDefault();

      $.ajax({
        type: 'post',
        url: '/posts/create',
        data: newPostForm.serialize(),
        success: function (data) {
          // console.log(data);
          let newPost = newPostDom(data.data.post);
          $('#post-list-container>ul').prepend(newPost);

        }, error: function (err) {
          console.log(err.responseText);
        }

      })
    })
  }


  let newPostDom = function (post) {
    return $(
      `<div id='post-${post.id}' class="post">
      <li>
      
      <small>
        <a class="delete-post-button" style="color: red;" href="/posts/destroy/${post.id}"><i class="far fa-trash-alt"></i></a>
      </small>
  
  

      <!-- <p> -->
        <span style="color:rgb(55, 228, 32); font-size:large;">${post.user.name }</span>
        <span style="color:rgb(189, 183, 183);">shared:</span></br>
        <span style="color:rgb(255, 255, 255);">${ post.content }<p>
        
    </li>
  
    <div class="post-comments">

        <form action="/comments/create"  method="POST">
          <input type="text" name="content" placeholder="type here for comment..." required>
          <input type="hidden" name='post' value= "${ post._id }" >
          <input type="submit" value="Add Comment">
        </form>
  

  
      <div id="post-comment-list">
        <ul id="post-comment-${post._id }">
  
        </ul>  
      </div>
  
    </div>
  </div>
  `)
  }



  // Method to delete a Post from DOM
  let deletePost = function(deleteLink){

  }

  
  // Method to create a post in the DOM
  createPost();
}