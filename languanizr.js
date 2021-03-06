/**
 * Languanizr.js v0.1.1
 *
 * Client side translation script
 * -
 * Create multi language sites fast and simple.
 *
 *
 * Http://www.languanizrjs.com
 * https://github.com/Vaddo/languanizr.js/tree/master
 *
 * MIT licensed
 *
 * Copyright (C) 2013 - A project by Vadim Hermann - http://www.vadim-hermann.com
 */
var languanizr = {
  // -------------------------------------------------------------------------------
  // private properties ------------------------------------------------------------
  // -------------------------------------------------------------------------------
  _version: '0.1.1',
  _defaultOptions: {
    auto: false,
    permanent: false,
    attrScan: ["alt", "value", "title"],
    removeSelectors: true,
    contentEncoding: 'utf-8'
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
  loadLanguage: function(languagePack, afterTranslate){
    languanizr._load(languagePack, afterTranslate);
    return this;
  },
  reloadLanguage: function(languagePack, afterTranslate){
    languanizr._getStorage().clear();
    languanizr._load(languagePack, afterTranslate);
    setTimeout(function(){window.location.reload();}, 100);
    return this;
  },
  doTranslate: function(){
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

      if(curElement.children().length == 0){
        text = curElement.html();
        text = languanizr._replacePlaceholder(text, storage);
        curElement.html(text);
      }

      if(languanizr._options.removeSelectors){
        curElement.removeAttr("data-languanize");
      }
    };

    if(languanizr._options.auto){
      languanizr._bindListener();
    }

    return this;
  },
  getVersion: function(){
    return languanizr._version;
  },



  // -------------------------------------------------------------------------------
  // private functions -------------------------------------------------------------
  // -------------------------------------------------------------------------------
  _load: function(languagePack, afterTranslate){
    if(!languagePack){
      alert("languanizr.js - No language pack found!")
    }else{
      $.ajax({
        type: "GET",
        url: languagePack,
        contentType: "text/plain; charset=" + languanizr._options.contentEncoding,
        dataType: "json",
        success: function(loadedPack) {
          if(languanizr._validateLanguagePack(loadedPack)){
            languanizr._checkAndStore(loadedPack);
            languanizr.doTranslate();
          }
        },
        error: function (xhr, textStatus, errorThrown) {
          alert("languanizr.js - Loading language failed!");
        }
      });
    }
  },
  _validateLanguagePack: function(loadedPack){
    if(languanizr._isNumber(loadedPack.package_version) && 
      loadedPack.text && 
      languanizr._isString(loadedPack.language)){

      return true;
    }else{
      alert("languanizr.js - Invalid language package!");
      return false;
    }
  },
  _isNumber: function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  _isString: function (obj) {
    var toString = Object.prototype.toString;
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
    for(id in loadedPack.text){
      if(loadedPack.text.hasOwnProperty(id)){

        // store the language
        storage.setItem(id, loadedPack.text[id])
        // set some meta data
        storage.setItem("package_version", loadedPack.package_version);
        storage.setItem("language", loadedPack.language);

      }
    }
  },
  _bindListener: function(){
    $("html").one("DOMSubtreeModified", languanizr.doTranslate);
  }
}