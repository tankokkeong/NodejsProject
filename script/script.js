//Global variables
var show = false;

$(document).ready(function(){
  $("#show-toggle").click(function(){

    if(!show){
        show = true;
        $("#show-icon").removeClass("fa-angle-double-down");
        $("#show-icon").addClass("fa-angle-double-up");
    }
    else
    {
        show = false;
        $("#show-icon").removeClass("fa-angle-double-up");
        $("#show-icon").addClass("fa-angle-double-down");
    }
    $("#create-post-form").slideToggle("slow");
  });
});
