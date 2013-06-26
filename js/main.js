$(function(){
  languanizrEditor.init();
  languanizr.setOptions({permanent:true, attrScan: ["alt", "value", "title", "data-intro"]}).loadLanguage("http://localhost/languanizr.js/js/english.json");

  var id = languanizr._getStorage().getItem("language");
  $("#" + id).addClass("active");

  $("#english").bind("click", function(){
    languanizr.reloadLanguage("http://localhost/languanizr.js/js/english.json");
    return false;
  });
  $("#german").bind("click", function(){
    languanizr.reloadLanguage("http://localhost/languanizr.js/js/german.json");
    return false;
  });
  // languanizr.setOptions({languagePack:"http://192.168.0.103/languanizr/js/english.json", permanent:true}).loadLanguage();

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

  $("#tour").bind("click", function(){
    introJs().onbeforechange(function(targetElement) {
      var cur = $(".introjs-helperNumberLayer").text();

      if(cur == 4){
        $("#editor").click();
      }
      if(cur == 8){
        var e = jQuery.Event("keydown");
        e.ctrlKey = true;
        e.keyCode = 69
        $("thead .langCol:first").focus().trigger(e);
      }
    }).start();
  });

  $("#backEditor").bind("click", function(){
    $("#editor").click();
  });
});