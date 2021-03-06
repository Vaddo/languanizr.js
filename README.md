# Languanizr.js

> Create multi language sites fast and simple.


## How it works
**1)** The script loading the language package and store it in the browser

**2)** The DOMSubtreeModified event triggers the placeholder replacement

**3)** All placeholder inside elements with the `data-languanize` attribute will be replaced by the specified text

---


## How to use
> Languanizr.js can be included easily in your webpage in four steps


**1)** Include the latest jQuery version and **languanizr.js** in your page.

*Example* 
```html
<script src="./js/languanizr.min.js"></script>
````

**2)** Create your own language package.

> **HINT**: You can find more about the language package system further down in the Language Package section.

*Example* 
```JSON
  {
    "title": "Languanizr language package",
    "url": "http://www.languanizrjs.com",
    "package_version": 1,
    "language": "english",
    "text": {
      "1": "Hello world",
      "2": "this is",
      "3": "languanizr.js"
    }
  }
````

**3)** Add the attribute `data-languanize` and a placeholder **{$#1#$}** to your HTML markup.

> **HINT**: You can use a placeholder more than once.

*Example* 
```html
<span data-languanize>{$#1#$}</span>
````
or
```html
<ul>
  <li data-languanize>{$#1#$}</li>
  <li data-languanize>{$#2#$}</li>
  <li data-languanize>{$#3#$}</li>
</ul>
````
or
```html
<a data-languanize href="#" title="{$#1#$}">{$#1#$}, {$#2#$}</a>
````


Optionally you can insert a fallback text into your placeholder. If no translation text found it will be loaded.

*Example* 
```html
<span data-languanize>{$#1:Hello World#$}</span>
````


**4)** Init the languanizr and load a language package.

> **HINT**: You can set some options before loading a language pack. Look at the API **Options** section further down.

*Example* 
```javascript
languanizr.loadLanguage("http://your-website/languages/english.json");
````

---


## API

###languanizr.setOptions(array);

> Set languanizr options.

> **HINT**: Always set the options first

**Available since**: v0.1.0

**Parameters**: Options

**Returns**: Languanizr object.

*Example*
```javascript
languanizr.setOptions({permanent:true});
````

####Options

You can set following options:

**Available since**: v0.1.0

- `auto`: Automatic translation every time if the DOM changes. Can be `true` or `false`. Default is `false`.

> **HINT**: If you set this option to `true` the translation will be triggered automaticly, every time the DOM changed. 
            Otherwise you need always trigger the translation with `doTranslate()`. Set it to `true`, if you have dynamic content.

> **HINT**: Also if you want IE8 support, because DOMSubtreeModified event support comes by IE9+.

- `permanent`: If you want to store your active language permanent on the client. 
               If `true` the language package will be stored in the Localstorage otherwise in the Sessionstorage. Default is `false`.

> **HINT**: You can boost your translation speed by setting this option to `true`.

> **HINT**: If this option is `true` keep in mind that **only** other language packs 
            or the same language pack with different version can trigger a 
            language reload in the localstorage.

- `attrScan`: Define here what attributes should be searching for placeholders. 
              By default the script searching the HTML text and the attributes `["alt", "value", "title"]` for placeholders.

- `removeSelectors`: If you want to remove the `data-languanize` attribute after the translating, set this property to `true`. 
                     Default is `true`.

> **HINT**: For better performance set this property to `true`, because every time the DOM changes, 
            the script iterate through all `data-langunize` attributes to check the text.
            If you needed max translation support for dynamic content, set it to `false`.

**Available since**: v0.1.1

- `contentEncoding`: Define the endcoding type for the JSON request. Default is `utf-8`.

---

###languanizr.loadLanguage(string, function)

> Loading a language package.

**Available since**: v0.1.0

**Parameters**: Language JSON as url, Callback as function

**Returns**: Languanizr object.

*Example*
```javascript
languanizr.loadLanguage("http://your-website/languages/english.json", function(){alert("Omg! It's done!")});
````

---

###languanizr.reloadLanguage(string, function)

> Clear the storage and load the given language package.

**Available since**: v0.1.0

**Parameters**: Language JSON as url, Callback as function

**Returns**: Languanizr object.

*Example*
```javascript
languanizr.reloadLanguage("http://your-website/languages/english.json", function(){alert("Omg! It's done!")});
````

---

###languanizr.doTranslate()

> Trigger the translation/placeholder replacement.

**Available since**: v0.1.0

**Returns**: Languanizr object.

*Example*
```javascript
languanizr.doTranslate();
````

---

###languanizr.getVersion()

> Gets the version of the script.

**Available since**: v0.1.1

**Returns**: String.

*Example*
```javascript
languanizr.getVersion();
````

---

## Language Package
> **HINT**: Use the online language editor at http://www.languanizrjs.com to create fast and simple language packages or check out 
the **editor branch** - https://github.com/Vaddo/languanizr.js/tree/editor - for more details about the editor.

*Example* 
```JSON
  {
    "title": "Languanizr language package", Optional
    "url": "http://www.languanizrjs.com",   Optional
    "package_version": 1,                   Required
    "language": "english",                  Required
    "text": {                               Required
      "1": "Hello world",
      "2": "this is",
      "3": "languanizr.js"
    }
  }
````
- `title` and `url`: String - Not used in the script. They can be leave.
- `package_version`: Number - Needed to ensure the language package compatibility in the editor. Also needed to trigger a language update, if the package versions differ.
- `language`: String - The name of the language. Needed to differ the languages at the loading process.
- `text`: Object - The id of a text part. It represents the placeholders id and must be unique in the language package.

### Errors:
- "No language pack found!"   - No language package given? Check the `loadLanguage` parameter.
- "Loading language failed!"  - The language request failed. Check the language url in the `loadLanguage` function.
- "Invalid language package!" - The required language properties are not valid. Ensure the property type.

---

## Roadmap
 Check out the issue list https://github.com/Vaddo/languanizr.js/issues or the milestones https://github.com/Vaddo/languanizr.js/issues/milestones for more informations.

---

## Release History

* **v0.1.1** - 2013-06-29
  - Add the option `contentEncoding` to define the JSON request encoding
  - Switched from getJSON function to ajax function for more flexebility
  - Fixed a IE toString javascript exception
  - Added IE9+ support
  - Changed the default of `auto` option to `false`
  - Changed the default of `removeSelector` option to `true`
  - Added private property `version`
  - Added new function `getVersion`

* **v0.1.0** - 2013-06-28
  - First version.

---

## Author
**Vadim Hermann**

- [My page](http://www.vadim-hermann.com)
- [Github](https://github.com/Vaddo)
- [Twitter](https://twitter.com/vadimhermann)
- [Codepen](http://codepen.io/Vaddo)

---

## License
The MIT License (MIT)

> Copyright (C) 2013 Vadim Hermann (contact@vadim-hermann.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions 
of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
IN THE SOFTWARE.