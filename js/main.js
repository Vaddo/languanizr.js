$(function(){
  $("#home, #editor").bind("click", function(){
    var me = $(this);

    $("#contentWrapper").removeClass("home")
                        .removeClass("editor")
                        .addClass(me.attr("id"));
    $("#nav").find(".active").removeClass("active");
    me.addClass("active");

    return false;
  });
});