# Languanizr.js

> Create multi language sites fast and simple.


## How to use
Languanizr.js can be included easily in your webpage in three steps:

**1)** Include 'languanizr.js' or the minified version in your page.

For example: 
```html
<script src="./js/languanizr.min.js"></script>
````

**2)** Add the attribute 'data-languanize' and a placeholder '{$##$}' to your HTML markup.

For example: 
```html
<span data-languanize>{$#1#$}</span>
````

Optionally you can insert a fallback text into your placeholder

For example: 
```html
<span data-languanize>{$#1:Hello World#$}</span>
````

**3)** Init the languanizr and load a language package

For example: 
```javascript
languanizr.loadLanguage("http://your-website/language/english.json");
````