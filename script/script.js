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