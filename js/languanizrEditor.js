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
    this._bindBodyCellEvents(cols);
  },



  // -------------------------------------------------------------------------------
  // private functions -------------------------------------------------------------
  // -------------------------------------------------------------------------------
  _bindDocumentEvents: function(){
    $(document).on("keydown", function(e){
      var keyCode = e.keyCode;
      if(e.ctrlKey){
        if(languanizrEditor._controlPBehavior(keyCode)){return false;} // new language package
      }
    });
  },
  _bindBodyCellEvents: function(cols){
    // cell events
    cols.on("focusin", function(){
      var me = $(this);
      me.parent().addClass("selected");
      me.one("focusout", function(){
        $(this).off("keydown").parent().removeClass();
      }).on("keydown", function(e){
        var keyCode = e.keyCode;
        var me      = $(this);

        if(!e.shiftKey){
          languanizrEditor._tabBehavior(me, keyCode); // next cell, last cell create new row
        }

        if(!e.ctrlKey){
          if(languanizrEditor._enterBehavior(me, keyCode)){return false;} // new row
        }

        if(e.ctrlKey){ // control
          languanizrEditor._controlCBehavior(me, keyCode); // copy placeholder to clipboard
          languanizrEditor._controlPosBehavior(keyCode); // first cell
          languanizrEditor._controlEndBehavior(keyCode); // last cell
          if(languanizrEditor._controlBackspaceBehavior(me, keyCode)){return false;} // delete language package
          if(languanizrEditor._controlDelBehavior(me, keyCode)){return false;} // delete row
        } 

        languanizrEditor._arrowTopBehaviour(me, keyCode); // top cell
        languanizrEditor._arrowRightBehaviour(me, keyCode); // right cell
        languanizrEditor._arrowBottomBehaviour(me, keyCode); // bottom cell
        languanizrEditor._arrowLeftBehaviour(me, keyCode); // left cell
      });
    });
  },




  // -------------------------------------------------------------------------------
  // private keycode functions -----------------------------------------------------
  // -------------------------------------------------------------------------------
  _tabBehavior: function(cell, keyCode){
    if(keyCode == 9){
      if(languanizrEditor._isLastCell(cell)){
        languanizrEditor._createRow();
      }
    }
  },
  _enterBehavior: function(cell, keyCode){
    if(keyCode == 13){
      var col = languanizrEditor._getColIndex(cell);

      if(languanizrEditor._isLastCell(cell)){
        languanizrEditor._createRow();
      }

      languanizrEditor._focusNextRow(cell, col);
      return true;
    }
    return false;
  },
  
  // --------------------------------------------------------------- ctrl combo keys
  _controlPBehavior: function(keyCode){
    if(keyCode == 80){
      languanizrEditor._createColumn();
      return true;
    }
    return false;
  },
  _controlDelBehavior: function(cell, keyCode){
    if(keyCode == 46){
      var rowCount = languanizrEditor._body.find("tr").length;

      if(rowCount > 1){
        var col = languanizrEditor._getColIndex(cell);

        // prev element exists?
        if(!languanizrEditor._focusNextRow(cell, col)){
          languanizrEditor._focusPrevRow(cell, col);
        }
        cell.off("keydown").parent().remove();
      }
      return true;
    }
    return false;
  },
  _controlCBehavior: function(cell, keyCode){
    if(keyCode == 67){
      var value = "{$#" + cell.siblings(".idCol").text() + "#" + cell.text() + "$}"
      $("#languanizrEditorPlaceholder").val(value).select();
    }
  },
  _controlPosBehavior: function(keyCode){
    if(keyCode == 36){languanizrEditor._focusFirstRow(1);}},
  _controlEndBehavior: function(keyCode){
    if(keyCode == 35){languanizrEditor._focusLastRow(languanizrEditor._getColCount()); }
  },
  _controlBackspaceBehavior: function(cell, keyCode){
    if(keyCode == 8){
      var col = languanizrEditor._getColIndex(cell);

      if(col != 1){
        languanizrEditor._focusFirstRow(col-1);
      }
      if(languanizrEditor._getColCount() > 1){
        $(".col" + col).off("focusin, focusout, keydown").remove();
      }
    }
  },
  // -------------------------------------------------------------------- arrow keys
  _arrowTopBehaviour: function(cell, keyCode){
    if(keyCode == 38){
      languanizrEditor._focusPrevRow(cell, languanizrEditor._getColIndex(cell));
    }
  },
  _arrowRightBehaviour: function(cell, keyCode){
    if(keyCode == 39){
      var col  = parseInt(languanizrEditor._getColIndex(cell));
      console.log(col + 1)
      cell.siblings(".col" + (col + 1)).focus();
    }
  },
  _arrowBottomBehaviour: function(cell, keyCode){
    if(keyCode == 40){
      languanizrEditor._focusNextRow(cell, languanizrEditor._getColIndex(cell));
    }
  },
  _arrowLeftBehaviour: function(cell, keyCode){
    if(keyCode == 37){
      var col  = parseInt(languanizrEditor._getColIndex(cell));
      cell.siblings(".col" + (col - 1)).focus();
    }
  },




  // -------------------------------------------------------------------------------
  // private row, col helper functions ---------------------------------------------
  // -------------------------------------------------------------------------------
  _createRow: function(){
    var editor   = languanizrEditor._editor;
    var nextId   = parseInt(editor.attr("data-latest-id")) + 1;
    var colCount = languanizrEditor._getColCount() + 1; // include the idCol
    var markup   = '<tr><td class="idCol">' + nextId + '</td>';

    for(i = 1; i < colCount; ++i){markup += '<td class="col' + i + ' dataCol" contenteditable="true"></td>';}

    markup += '</tr>';
    var newElement = $(markup);
    var cols = newElement.find(".dataCol");

    editor.attr("data-latest-id", nextId);
    languanizrEditor._bindBodyCellEvents(cols);
    languanizrEditor._body.append(newElement);
  },
  _createColumn: function(){
    var editor = languanizrEditor._editor;
    var head   = languanizrEditor._head;
    var body   = languanizrEditor._body;
    var count  = languanizrEditor._getColCount();

    if(count == 0){
      head.append('<th id="idCol"></th>');
    }
    ++count;
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
      languanizrEditor._bindBodyCellEvents(element);
      curRow.append(element);
    }
    head.find("th:last").focus();
  },




  // -------------------------------------------------------------------------------
  // private cell helper functions -------------------------------------------------
  // -------------------------------------------------------------------------------
  _isLastCell: function(element){
    return ((element.parent().is(":last-child")) && element.is(":last-child"));
  },
  _getColIndex: function(element){
    return element.attr("class").replace("dataCol", "").replace("col", "");
  },
  _focusPrevRow: function(curCell, col){
    var prev = curCell.parent().prev("tr");

    // prev element exists?
    if(prev.length != 0){
      prev.find(".col" + col).focus();
      return true;
    }

    return false;
  },
  _focusNextRow: function(curCell, col){
    var next = curCell.parent().next("tr");

    // next element exists?
    if(next.length != 0){
      next.find(".col" + col).focus();
      return true;
    }

    return false;
  },
  _focusFirstRow: function(col){
    languanizrEditor._body.find("tr:first").find(".col" + col).focus();
  },
  _focusLastRow: function(col){
    languanizrEditor._body.find("tr:last").find(".col" + col).focus();
  },
  _getColCount: function(){
    return languanizrEditor._head.find("th").length - 1;
  }
}