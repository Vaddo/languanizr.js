$(function(){
  // home, editor navigation
  $("#home, #editor").bind("click", function(){
    var me = $(this);

    $("#contentWrapper").removeClass("home")
                        .removeClass("editor")
                        .removeClass("json")
                        .addClass(me.attr("id"));
    $("#nav").find(".active").removeClass("active");
    me.addClass("active");

    return false;
  });


  languanizrEditor.init();
  languanizr.setOptions({permanent:true}).loadLanguage("http://localhost/languanizr/js/english.json");

  var id = languanizr._getStorage().getItem("language");
  $("#" + id).addClass("active");

  $("#english").bind("click", function(){
    languanizr.reloadLanguage("http://localhost/languanizr/js/english.json");
    return false;
  });
  $("#german").bind("click", function(){
    languanizr.reloadLanguage("http://localhost/languanizr/js/german.json");
    return false;
  });
  // languanizr.setOptions({languagePack:"http://192.168.0.103/languanizr/js/english.json", permanent:true}).loadLanguage();
});