var languanizrEditor = {
  _editor: $("#languanizrEditor"),
  _body: $("#editorBody"),
  _head: $("#editorHead"),

  init: function(){
    this._bindEvents();
  },
  _bindEvents: function(){
    // cell events
    this._body.find("td").on("focusin", function(){
      var me = $(this);

      me.parent().addClass("selected");
      me.one("focusout", function(){
        $(this).off("keydown").parent().removeClass();
      }).on("keydown", function(e){
        var keyCode = e.keyCode;

        if(keyCode == 9){ // tab - add row
          console.log("tab")
        }else if(keyCode == 13){ // enter - add row
          console.log("enter")
          return false;
        }else if((keyCode == 8) || (keyCode == 46)){ // backspace or delete - remove current row
          var me      = $(this)
          var parent  = me.parent();
          var select  = parent.prev("tr");

          // prev element exists?
          if(select.length == 0){
            //what about the next element?
            select = parent.next("tr");
          }

          // is somebody at home?
          if(select.length != 0){
            select.find(".col1").focus();
          }

          me.off("focusout, keydown");
          parent.remove();

          return false;

        }else if((e.ctrlKey) && (keyCode == 67)){
          console.log("copy")
        }
      });
    });
  }
}