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

//Global variable
var clientIp;

function generateClientIp(){
  if(!checkClintIp()){
    clientIp = uuidv4();
    setCookie("node-anonymous-ip", clientIp, 365);
  }
  else{
    clientIp = getCookie("node-anonymous-ip");
  }
}

function getClientIp(input_id){

  var input = document.getElementById(input_id);
  input.value = clientIp;
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function checkClintIp() {

  var user = getCookie("node-anonymous-ip");

  if (user != "") {
    return true;
  } 
  else 
  {
    return false
  }
}


function editPost(post_id){

  var content_container = document.getElementById("content-container-" + post_id);
  var previous_value = document.getElementById("prev-value-" + post_id);
  var edit_area = document.getElementById("edit-area-display-" + post_id);

  //Remove content container
  content_container.style.display = "none";

  edit_area.innerHTML = '<form method="POST" action="/edit-post/' + post_id + '" class="mt-3">' +
                        '<textarea name="edit_content" id="edit-area-' + post_id+ '">' +
                          previous_value.value + 
                        '</textarea>' +
                        '<div class="text-center mt-3">' +
                        '<button class="btn btn-primary" type="submit">Edit</button>' +
                        '<button class="btn btn-secondary ml-2" onclick="cancelEditPost(' + "'" +  post_id + "'" + ')">Cancel</button>' +
                        '</div>' +
                        '</form>';

  CKEDITOR.replace('edit-area-' + post_id, {
      removeButtons: 'Source',
  });
}

function cancelEditPost(post_id){
  var content_container = document.getElementById("content-container-" + post_id);
  var edit_area = document.getElementById("edit-area-display-" + post_id);

  //Display content container
  content_container.style.display = "";

  //Remove edit area
  edit_area.innerHTML = "";
}

function checkEdit(id, trigger_id){

  var trigger = document.getElementById(trigger_id);

  console.log(clientIp)
  if(id != clientIp){
    //Remove trigger
    trigger.remove();
  }
}

function deletePost(post_id){
  var delete_id = document.getElementById("deletePostInput");

  //get delete id
  delete_id.value = post_id;
}

function actionAlert(){
  var action = window.location.href.split("?")[1];
  var alertContainer = document.getElementById("alert-container");

  if(action == "deleted"){
    alertContainer.innerHTML = 
    '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
        'Post Deleted Successful!' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
        '</button>' +
    '</div>';
  }
  else if (action == "updated"){
    alertContainer.innerHTML = 
    '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
        'Post updated Successful!' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
        '</button>' +
    '</div>';
  }
  else if(action == "created"){
    alertContainer.innerHTML = 
    '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
        'Post Created Successful!' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
        '</button>' +
    '</div>';
  }
  else if(action == "commented"){
    alertContainer.innerHTML = 
    '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
        'Comment Created Successful!' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
        '</button>' +
    '</div>';
  }
  else if(action == "error"){
    alertContainer.innerHTML = 
    '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
        'Something is wrong, please try again later...' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
        '</button>' +
    '</div>';
  }
  else if(action == "empty"){
    alertContainer.innerHTML = 
    '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
        'Don\'t try to submit an empty form, you fuck!' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
        '</button>' +
    '</div>';
  }
  else if(action == "empty-comment"){
    alertContainer.innerHTML = 
    '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
        'Don\'t try to submit an empty comment, you fuck!' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
        '</button>' +
    '</div>';
  }
  else if(action == "invalid-delete"){
    alertContainer.innerHTML = 
    '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
        'Don\'t try to delete the post that is not owned by you, you fuck!' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
        '</button>' +
    '</div>';
  }
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}