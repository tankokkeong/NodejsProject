function viewMoreComment(container_id){
  var comment_container = document.getElementById(container_id);
  var comment_display_count = 0;
  var view_more_trigger = document.getElementById("view-trigger-" + container_id);
  var view_more_count = document.getElementById("view-more-" + container_id);

  for (var i = 0; i < comment_container.childNodes.length; i++) {
    
    if(comment_display_count < 5){
      if(comment_container.childNodes[i].className == "comment-row"){
        console.log("hi")
        if(comment_container.childNodes[i].style.display == "none"){
          //Display comment
          comment_container.childNodes[i].style.display = "";
          comment_display_count++;
        }
      }
    }
    
  }

  //Reduce view more count
  if(parseInt(view_more_count.innerHTML) < 5){
    view_more_trigger.style.display = "none";
  }
  else{
    view_more_count.innerHTML = parseInt(view_more_count.innerHTML) - 5;
  }
}

function postValidation(){

  var author = document.getElementById("authorName");
  var title = document.getElementById("title");
  //Get CKE Editor value
  var post_content = CKEDITOR.instances.content.getData();
  var error_prompt = document.getElementsByClassName("error-prompt");
  var error_count = 0;
  
  //Author name validation
  if(author.value.trim().length == 0){
    error_prompt[0].innerHTML = "Author name is required!";
    error_count++
  }
  else{
    error_prompt[0].innerHTML = "";
  }

  //Title validation
  if(title.value.trim().length == 0){
    error_prompt[1].innerHTML = "Post title is required!";
    error_count++
  }
  else{
    error_prompt[1].innerHTML = "";
  }

  if(post_content.trim().length == 0){
    error_prompt[2].innerHTML = "Post content is required!";
    error_count++
  }
  else{
    error_prompt[2].innerHTML = "";
  }

  if(error_count == 0){
    return true;
  }
  else{
    return false;
  }
}

function commentValidation(comment_id){
  var comment_input = document.getElementById(comment_id);

  if(comment_input.value.trim().length == 0){
    return false;
  }
  else{
    return true;
  }
}

function getClientIp(input_id){
  
  var input = document.getElementById(input_id);

  $.getJSON('https://json.geoiplookup.io/?callback=?', function(data) {
    input.value = data.ip;
  });
}