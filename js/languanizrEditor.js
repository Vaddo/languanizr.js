var languanizrEditor = {
  // -------------------------------------------------------------------------------
  // properties --------------------------------------------------------------------
  // -------------------------------------------------------------------------------
  _editor: $("#languanizrEditor"),
  _body: $("#editorBody"),
  _head: $("#editorHead"),



  // -------------------------------------------------------------------------------
  // public functions --------------------------------------------------------------
  // -------------------------------------------------------------------------------
  init: function(){
    var cols = this._body.find(".dataCol");
    this._bindDocumentEvents();
    this._bindCellEvents(cols);
  },



  // -------------------------------------------------------------------------------
  // private functions -------------------------------------------------------------
  // -------------------------------------------------------------------------------
  _bindDocumentEvents: function(){
    $(document).on("keydown", function(e){
      var keyCode = e.keyCode;
      if(e.ctrlKey){ // control + ...
        if(keyCode == 80){
          languanizrEditor._createColumn();
          return false;
        }
      }
    });
  },
  _bindCellEvents: function(cols){
    // cell events
    cols.on("focusin", function(){
      var me = $(this);
      me.parent().addClass("selected");
      me.one("focusout", function(){
        $(this).off("keydown").parent().removeClass();
      }).on("keydown", function(e){
        var keyCode = e.keyCode;
        var me      = $(this);

        if(keyCode == 9 && !e.shiftKey){ // tab - add row
          if(me.parent().is(":last-child") && me.is(":last-child")){
            languanizrEditor._createRow();
          }
        }else if(keyCode == 13){ // enter - add row
          var col = languanizrEditor._getColIndex(me);
          languanizrEditor._createRow();
          languanizrEditor._focusLastRow(col);
          return false;

        }else if((keyCode == 46) && !e.ctrlKey){ // del - remove current row
          var rowCount = languanizrEditor._body.find("tr").length;

          if(rowCount > 1){
            var col = languanizrEditor._getColIndex(me);

            // prev element exists?
            if(!languanizrEditor._focusNextRow(me, col)){
              languanizrEditor._focusPrevRow(me, col);
            }
            me.off("keydown").parent().remove();
          }
          return false;

        }else if(e.ctrlKey){ // control + ...
          if(keyCode == 67){ // ... c
            var value = "{$#" + me.siblings(".idCol").text() + "#" + me.text() + "$}"
            $("#languanizrEditorPlaceholder").val(value).select();
            
          }else if(keyCode == 36){ // ... pos - first cell
            languanizrEditor._focusFirstRow(1);
          }else if(keyCode == 35){ // ... end - last cell
            languanizrEditor._focusLastRow(2);
          }else if(keyCode == 46){ // ... del - delete language package
            var col = languanizrEditor._getColIndex(me);
            var colCount = languanizrEditor._head.find("th").length - 1;

            if(col != 1){
              languanizrEditor._focusFirstRow(col-1);
            }
            if(colCount > 1){
              $(".col" + col).off("focusin, focusout, keydown").remove();
            }
            return false;
          }

        }else if(keyCode == 37){ // left arrow
          var col  = languanizrEditor._getColIndex(me);
          var prev = parseInt(col) - 1;

          me.siblings(".col" + prev).focus();

        }else if(keyCode == 39){ // right arrow
          var col  = languanizrEditor._getColIndex(me);
          var next = parseInt(col) + 1;

          me.siblings(".col" + next).focus();

        }else if(keyCode == 38){ // top arrow
          var col = languanizrEditor._getColIndex(me);
          languanizrEditor._focusPrevRow(me, col);

        }
        else if(keyCode == 40){ // bottom arrow
          var col = languanizrEditor._getColIndex(me);
          languanizrEditor._focusNextRow(me, col);
        }
      });
    });
  },
  _getColIndex: function(element){
    return element.attr("class").replace("dataCol", "").replace("col", "");
  },
  _createRow: function(){
    var editor   = languanizrEditor._editor;
    var head     = languanizrEditor._head;
    var body     = languanizrEditor._body;

    var nextId   = parseInt(editor.attr("data-latest-id")) + 1;
    var colCount = head.find("th").length;
    var markup   = '<tr><td class="idCol">' + nextId + '</td>';

    for(i = 1; i < colCount; ++i){markup += '<td class="col' + i + ' dataCol" contenteditable="true"></td>';}

    markup += '</tr>';
    var newElement = $(markup);
    var cols = newElement.find(".dataCol");

    editor.attr("data-latest-id", nextId);
    languanizrEditor._bindCellEvents(cols);
    body.append(newElement);
  },
  _createColumn: function(){
    var editor = languanizrEditor._editor;
    var head   = languanizrEditor._head;
    var body   = languanizrEditor._body;
    var count  = head.find("th").length;

    if(count == 0){
      head.append('<th id="idCol"></th>');
      ++count;
    }
    head.append('<th class="col' + count + '" contenteditable="true">' + "super cool language" + '</th>');

    var curRow, rowIndex, element;
    var rows     = body.find("tr");
    var rowCount = rows.length;

    for(rowIndex = 0; rowIndex < rowCount; ++rowIndex){

      curRow = $(rows[rowIndex]);

      if(curRow.has("td").length == 0){
        curRow.append('<td class="idField">' + i +'</td>')
      }

      element = $('<td class="col' + count + ' dataCol" contenteditable="true"></td>');
      languanizrEditor._bindCellEvents(element);
      curRow.append(element);
    }
    head.find("th:last").focus();
  },
  _focusPrevRow: function(curCell, col){
    var focused = false;
    var prev    = curCell.parent().prev("tr");

    // prev element exists?
    if(prev.length != 0){
      prev.find(".col" + col).focus();
      focused = true;
    }

    return focused;
  },
  _focusNextRow: function(curCell, col){
    var focused = false;
    var next    = curCell.parent().next("tr");

    // next element exists?
    if(next.length != 0){
      next.find(".col" + col).focus();
      focused = true;
    }

    return focused;
  },
  _focusFirstRow: function(col){
    languanizrEditor._body.find("tr:first").find(".col" + col).focus();
  },
  _focusLastRow: function(col){
    languanizrEditor._body.find("tr:last").find(".col" + col).focus();
  }
}