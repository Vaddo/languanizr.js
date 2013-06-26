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

  $("#tour").bind("click", function(){
    introJs().start();
  });
});