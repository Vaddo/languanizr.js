# Languanizr.js

> Create multi language sites fast and simple.


## How to use
Languanizr.js can be included easily in your webpage in three steps:

**1)** Include **languanizr.js** or the minified version in your page.

For example: 
```html
<script src="./js/languanizr.min.js"></script>
````

**2)** Add the attribute `data-languanize` and a placeholder **{$#1#$}** to your HTML markup.

For example: 
```html
<span data-languanize>{$#1#$}</span>
````
or
```html
<ul>
  <li>{$#1#$}</li>
  <li>{$#2#$}</li>
  <li>{$#3#$}</li>
</ul>
````
or
```html
<a href="#" title="{$#1#$}">{$#1#$}, {$#2#$}</a>
````

**Hint**: You can use a placeholder for a text more than once.

Optionally you can insert a fallback text into your placeholder. If no translation text found it will be loaded.

For example: 
```html
<span data-languanize>**{$#1:Hello World#$}**</span>
````

**3)** Init the languanizr and load a language package.

For example: 
```javascript
languanizr.loadLanguage("http://your-website/languages/english.json");
````

**Hint**: You can set some options before loading a language pack. Look at the API **Options** section further down.



## API


### Options
You can set following options like this:

For example: 
```javascript
languanizr.setOptions({permanent:true});
````

- `auto`: If you want a automatic translation every time if the dom changes, `true` or `false`. Default is `true`.
- `permanent`: If you want to store your active language permanent on the client. 
               If `true` the language package will be stored in the Localstorage otherwise in the Sessionstorage. Default is `false`.

**Hint**: - You can boost your translation speed by setting this option on `true`
          - If this option is `true` keep in mind that **only** other language packs 
            or the same language pack with different version can trigger a 
            language reload in the localstorage.

- `attrScan`: Define here what attributes should be searching for placeholders. 
              By Default the script searching the html text and the attributes `["alt", "value", "title"]` for placeholders.


## Roadmap
- Automatic language selector
- Faster translation

## Release History
---

## Author
**Vadim Hermann**

- [My page](http://www.vadim-hermann.com)
- [Github](https://github.com/Vaddo)
- [Twitter](https://twitter.com/vadimhermann)
- [Codepen](http://codepen.io/Vaddo)


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