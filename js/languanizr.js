/**
 * Languanizr.js is smart client side translation script
 * Create multi language sites simple and fast with the 
 * client side translation script and the online language editor.
 *
 * Http://www.languanizrjs.com
 * https://github.com/Vaddo/languanizr.js/tree/editor
 *
 * MIT licensed
 *
 * Copyright (C) 2013 - A project by Vadim Hermann - http://www.vadim-hermann.com
 */
var languanizr = {
  // -------------------------------------------------------------------------------
  // properties --------------------------------------------------------------------
  // -------------------------------------------------------------------------------
  _toolVersion:0.1,
  _defaultOptions: {
    auto: true,
    permanent: false,
    attrScan: ["alt", "value", "title"]
  },
  _options: {},



  // -------------------------------------------------------------------------------
  // public functions --------------------------------------------------------------
  // -------------------------------------------------------------------------------
  setOptions: function(customOptions){
    // init options
    $.extend(languanizr._options, languanizr._defaultOptions, customOptions);
    return this;
  },
  loadLanguage: function(languagePack){
    languanizr._load(languagePack);
    return this;
  },
  reloadLanguage: function(languagePack){
    languanizr._getStorage().clear();
    languanizr._load(languagePack);
    setTimeout(function(){window.location.reload();}, 100);
    return this;
  },



  // -------------------------------------------------------------------------------
  // private functions -------------------------------------------------------------
  // -------------------------------------------------------------------------------
  _load: function(languagePack){
    if(!languagePack){
      alert("languanizr.js - No language pack found!")
    }else{
      var storage = languanizr._getStorage();

      $.getJSON(languagePack)
       .done(function(loadedPack){
          if(languanizr._validateLanguagePack(loadedPack)){
            languanizr._checkAndStore(loadedPack);
            languanizr._doTranslate();
          }
       })
       .fail(function(){alert("languanizr.js - Loading language failed!");});
    }
  },
  _validateLanguagePack: function(loadedPack){
    if(languanizr._isNumber(loadedPack.editor_version) && 
       languanizr._isNumber(loadedPack.package_version) && 
       loadedPack.words && 
       languanizr._isString(loadedPack.language)){

      if(languanizr._toolVersion != loadedPack.editor_version){
        alert("languanizr.js - Incompatible language package!")
        return false;
      }else{
        return true;
      }

    }else{
      alert("languanizr.js - Invalid language package!");
      return false;
    }
  },
  _isNumber: function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  _isString: function (obj) {
    return toString.call(obj) == '[object String]';
  },
  _replacePlaceholder: function(string, storage){
    var stringRegEx = /\{\$#[0-9]+#[^]*?\$\}/;

    while(string.match(stringRegEx)){
      curText = string.match(stringRegEx)[0];
      langId  = curText.match(/#[0-9]+#/)[0].replace("#", "").replace("#", "");
      string  = string.replace(curText, storage.getItem(langId));
    }

    return string;
  },
  _getStorage: function(){
    return (languanizr._options.permanent) ? 
           window.localStorage : 
           window.sessionStorage;
  },
  _checkAndStore: function(loadedPack){
    var storage = languanizr._getStorage();
    if(((storage.getItem("package_version") == null) &&
          (storage.getItem("language") == null)) || 
        ((storage.getItem("package_version") != loadedPack.package_version)) &&
        (storage.getItem("language") == loadedPack.language)){
      languanizr._store(loadedPack, storage);
    }
  },
  _store: function(loadedPack, storage){
    storage.clear();
    for(id in loadedPack.words){
      if(loadedPack.words.hasOwnProperty(id)){

        // store the language
        storage.setItem(id, loadedPack.words[id])
        // set some meta data
        storage.setItem("package_version", loadedPack.package_version);
        storage.setItem("language", loadedPack.language);

      }
    }
  },
  _doTranslate: function(){
    var allElements = $("[data-languanize]");
    var length      = allElements.length;
    var attrLength  = languanizr._options.attrScan.length;
    var storage     = languanizr._getStorage();
    var curElement, eIndex, aIndex, text, curText, attr, tag;

    for (eIndex = 0; eIndex < length; ++eIndex){
      curElement = $(allElements[eIndex]);
      tag = curElement[0].tagName;

      // attributes
      for(aIndex = 0; aIndex < attrLength; ++aIndex){

        attr = languanizr._options.attrScan[aIndex];
        text = curElement.attr(attr);

        if(typeof text !== 'undefined' && text !== false){
          text = languanizr._replacePlaceholder(text, storage);
          curElement.attr(attr, text);
        }
      }

      // inputs, textareas etc.
      if((tag == "INPUT") || (tag == "TEXTAREA")){
        text = curElement.val();
        text = languanizr._replacePlaceholder(text, storage);
        curElement.val(text);
      }

      text = curElement.html();
      text = languanizr._replacePlaceholder(text, storage);
      curElement.html(text);
    };

    if(languanizr._options.auto){
      languanizr._bindListener();
    }
  },
  _bindListener: function(){
    $("html").one("DOMSubtreeModified", languanizr._doTranslate);
  }
}