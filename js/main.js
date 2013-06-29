$(function(){
  languanizrEditor.init();
  languanizr.setOptions({permanent:true, attrScan: ["alt", "value", "title", "data-intro"]})
            .loadLanguage("http://www.languanizrjs.com/js/english.json", function(){
              if(RegExp('multipage', 'gi').test(window.location.search)) {
                introJs().goToStep(5).start();
              }
            });

  var id = languanizr._getStorage().getItem("language");
  $("#" + id).addClass("active");

  $("#english").bind("click", function(){
    languanizr.reloadLanguage("http://www.languanizrjs.com/js/english.json");
    return false;
  });
  $("#german").bind("click", function(){
    languanizr.reloadLanguage("http://www.languanizrjs.com/js/german.json");
    return false;
  });

  $("#tour").bind("click", function(){
    introJs().start().onbeforechange(function() {
      if($(".introjs-helperNumberLayer").text() == "5"){
        window.location.href = 'editor.php?multipage=true';
      }
    });
  });

  $("#version").text("v" + languanizr.getVersion());
});