/**
 * Languanizr.js is smart client side translation script
 * Create multi language sites simple and fast with the 
 * client side translation script and the online language editor.
 * 
 * Create language packages simple and fast with the online language editor.
 * Online editor version 0.1
 * Http://www.languanizr.com
 * https://github.com/Vaddo/languanizr.js/
 *
 * MIT licensed
 *
 * Copyright (C) 2013 - A project by Vadim Hermann - http://www.vadim-hermann.com
 */
var languanizrEditor = {
  // -------------------------------------------------------------------------------
  // properties --------------------------------------------------------------------
  // -------------------------------------------------------------------------------
  _version: 0.1,
  _editor: $("#languanizrEditor"),
  _body: $("#editorBody"),
  _head: $("#editorHead"),



  // -------------------------------------------------------------------------------
  // public functions --------------------------------------------------------------
  // -------------------------------------------------------------------------------
  init: function(){
    $("#version").text(languanizrEditor._version);
    var bodyCells = this._body.find(".dataCol");
    var headCells = this._head.find(".langCol");
    this._bindDocumentEvents()
        ._bindBodyCellEvents(bodyCells)
        ._bindHeadCellEvents(headCells)
        ._head.find(".col1").focus();
    return this;
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
      languanizrEditor._escapeBehavior(keyCode); // back to editor
    });

    return this;
  },
  _bindBodyCellEvents: function(cells){
    // cell events
    cells.on("focusin", function(){
      var me = $(this);
      me.parent().addClass("selected");
      me.one("focusout", function(){
        $("#lastFocused").attr("id", "");
        $(this).off("keydown").attr("id", "lastFocused").parent().removeClass("selected");
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
          if(languanizrEditor._controlEBehavior(me, keyCode)){return false;} // generate language json and make it ready for copy
        } 

        languanizrEditor._arrowTopBehaviour(me, keyCode); // top cell
        languanizrEditor._arrowRightBehaviour(me, keyCode); // right cell
        languanizrEditor._arrowBottomBehaviour(me, keyCode); // bottom cell
        languanizrEditor._arrowLeftBehaviour(me, keyCode); // left cell

      });
    });

    return this;
  },
  _bindHeadCellEvents: function(cells){
    // cell events
    cells.on("focusin", function(){
      var me = $(this);
      me.one("focusout", function(){
        $(this).off("keydown");
      }).on("keydown", function(e){
        var keyCode = e.keyCode;
        var me      = $(this);

        if(!e.ctrlKey){
          if(languanizrEditor._enterBehavior(me, keyCode)){return false;} // first row
        }

        if(e.ctrlKey){ // control
          languanizrEditor._controlPosBehavior(keyCode); // first cell
          languanizrEditor._controlEndBehavior(keyCode); // last cell
          if(languanizrEditor._controlBackspaceBehavior(me, keyCode)){return false;} // delete language package
          if(languanizrEditor._controlEBehavior(me, keyCode)){return false;} // generate language json and make it ready for copy
        } 

        languanizrEditor._arrowRightBehaviour(me, keyCode); // right cell
        languanizrEditor._arrowBottomBehaviour(me, keyCode); // bottom cell
        languanizrEditor._arrowLeftBehaviour(me, keyCode); // left cell
      });
    });

    return this;
  },



  // -------------------------------------------------------------------------------
  // private keycode functions -----------------------------------------------------
  // -------------------------------------------------------------------------------
  _tabBehavior: function(cell, keyCode){
    if((keyCode == 9) && languanizrEditor._isLastCell(cell)){
      languanizrEditor._createRow();
    }
  },
  _enterBehavior: function(cell, keyCode){
    if(keyCode == 13){
      var col = languanizrEditor._getColIndex(cell);

      if(cell.context.tagName.toLowerCase() == "th"){
        languanizrEditor._focusFirstRow(col);
      }else{

        if(languanizrEditor._isLastRow(cell)){
          languanizrEditor._createRow();
        }

        languanizrEditor._focusNextRow(cell, col);
      }
      return true;
    }
    return false;
  },
  _escapeBehavior: function(keyCode){
    if(keyCode == 27){
      var content = $("#contentWrapper");

      if(content.hasClass("json")){
        content.removeClass("json").addClass("editor");
        $("#lastFocused").focus();
      } 
    }
  },
  
  // --------------------------------------------------------------- ctrl combo keys
  _controlPBehavior: function(keyCode){
    if(keyCode == 80){
      languanizrEditor._createColumn();
      return true;
    }
    return false;
  },
  _controlEBehavior: function(cell, keyCode){
    if(keyCode == 69){
      var ids      = languanizrEditor._body.find(".idCol");
      var rowCount = languanizrEditor._getRowCount();
      var col      = languanizrEditor._getColIndex(cell);
      var transI, json, me;

      json = '{"title": "Languanizr language package", ' + 
              '"description": "Languanizr is a smart multilanguage toolkit for websites.", ' +
              '"url": "http://www.languanizr.com", ' +
              '"editor_version": ' + languanizrEditor._version + ', ' +
              '"package_version": ' + $("#nextPackageVersion").text() + ', ' + 
              '"language": "' + languanizrEditor._head.find(".col" + col).text() + '", ' +
              '"words": {';

      for(transI = 1; transI <= rowCount; ++transI){
        me   = $(ids[(transI - 1)]);
        json += ('"' + me.text() + '": "' + me.siblings(".col" + col).text() + '"');
        json += (transI != rowCount) ? ", " : "";
      }

      json += '}}';
      

      $("#contentWrapper").removeClass().addClass("contentWrapper json");
      $("#field").val(json).select();

      return true;
    }
    return false;
  },
  _controlDelBehavior: function(cell, keyCode){
    if((keyCode == 46) && (languanizrEditor._getRowCount() > 1)){
      var col = languanizrEditor._getColIndex(cell);

      // prev element exists?
      if(!languanizrEditor._focusNextRow(cell, col)){
        languanizrEditor._focusPrevRow(cell, col);
      }
      cell.off("keydown").parent().remove();
     
      return true;
    }
    return false;
  },
  _controlCBehavior: function(cell, keyCode){
    if(keyCode == 67){
      var value = "{$#" + cell.siblings(".idCol").text() + "#" + cell.text() + "$}"
      $("#languanizrEditorPlaceholder").val(value).select();
      setTimeout(function(){
        $("#lastFocused").focus();
      }, 100);
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
      var col = languanizrEditor._getColIndex(cell);

      (languanizrEditor._isFirstRow(cell)) ? languanizrEditor._focusHeadRow(col) : languanizrEditor._focusPrevRow(cell, col);
    }
  },
  _arrowRightBehaviour: function(cell, keyCode){
    if(keyCode == 39){
      var col  = parseInt(languanizrEditor._getColIndex(cell));
      cell.siblings(".col" + (col + 1)).focus();
    }
  },
  _arrowBottomBehaviour: function(cell, keyCode){
    if(keyCode == 40){
      var col = languanizrEditor._getColIndex(cell);
      if(cell.context.tagName.toLowerCase() == "th"){
        languanizrEditor._focusFirstRow(col);
      }else{
        languanizrEditor._focusNextRow(cell, col);
      }
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
    languanizrEditor._bindBodyCellEvents(cols)
                    ._body.append(newElement);
  },
  _createColumn: function(){
    var count    = languanizrEditor._getColCount();
    var rowCount = languanizrEditor._getRowCount();
    var rows     = languanizrEditor._body.find("tr");
    var curRow, rowIndex, element, headElement;

    if(count == 0){head.append('<th id="idCol"></th>');}
    ++count;

    headElement = $('<th class="col' + count + ' langCol" contenteditable="true">' + "super cool language" + '</th>');
    languanizrEditor._bindHeadCellEvents(headElement)
                    ._head.append(headElement);

    for(rowIndex = 0; rowIndex < rowCount; ++rowIndex){

      curRow = $(rows[rowIndex]);

      if(curRow.has("td").length == 0){
        curRow.append('<td class="idField">' + i +'</td>')
      }

      element = $('<td class="col' + count + ' dataCol" contenteditable="true"></td>');
      languanizrEditor._bindBodyCellEvents(element);
      curRow.append(element);
    }
    languanizrEditor._head.find("th:last").focus();
  },



  // -------------------------------------------------------------------------------
  // private cell helper functions -------------------------------------------------
  // -------------------------------------------------------------------------------
  _isLastCell: function(cell){
    return ((cell.parent().is(":last-child")) && cell.is(":last-child"));
  },
  _isFirstRow: function(cell){
    return (cell.parent().is(":first-child"));
  },
  _isLastRow: function(cell){
    return (cell.parent().is(":last-child"));
  },
  _getColIndex: function(cell){
    return cell.attr("class")
               .replace("dataCol", "")
               .replace("langCol", "")
               .replace("col", "");
  },
  _focusPrevRow: function(curCell, col){
    var prev = curCell.parent().prev("tr");

    // prev element exists?
    if(prev.length != 0){
      var cell = prev.find(".col" + col).focus();
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
    return languanizrEditor._head.find("th").length - 1; // count not the id column
  },
  _getRowCount: function(){
    return languanizrEditor._body.find("tr").length;
  },
  _focusHeadRow: function(col){
    languanizrEditor._head.find(".col" + col).focus();
  }
}