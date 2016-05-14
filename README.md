# droideka

[![build status](https://secure.travis-ci.org/smallhelm/droideka.png)](https://travis-ci.org/smallhelm/droideka)
[![dependency status](https://david-dm.org/smallhelm/droideka.svg)](https://david-dm.org/smallhelm/droideka)

fight back against email scrapers

## What it does

 * finds all `<a href="mailto:...` email addresses in your html
 * encrypts them
 * appends some JS to your html that decrypts them 1/2 second after the page loads

## How to use it

```js
var droideka = require('droideka');
```

### html = droideka(html)

Your HTML
```html
<p>
  Here is my email:
  <a href="mailto:some@email">some@email.com</a>
</p>
<p>
  Here is some more html stuff
</p>
```

In node run it through droideka
```js
html = droideka(html);
```

Here is the output
```html
<p>
  Here is my email:
  <span id="cihzenf7j0000i4dxll7gftvj"><noscript>You must enable JavaScript to see the email.</noscript></span>
</p>
<p>
  Here is some more html stuff
</p>
<script type="application/javascript">setTimeout(function(){var d=function(b){var c=b.substring(0,87);b=b.substring(c.length);var e,f,g,h='',d;for(e=0;e<b.length;e++)f=b.charAt(e),g=c.indexOf(f),d=(g-b.length+c.length)%c.length,d=0>d?c.length+d:d,h+=0<=g?c[d]:f;return h};(function(){var a=document.getElementById("cihzenf7j0000i4dxll7gftvj");if(!a)return;a.innerHTML=d("eY\"1]U.ZbrBtmCh[-:VpK!6WuXx8dlwM2GJ,kfT#(RHD&5L}I^o7~F*4S0{qzO%n3>gsQPvA'@cyjN<9=)a+iE$Gf S7H9,&*f#AFUq6U*HdH*f#A&K6U*HdH*f#AG/fK");}());}, 500);</script>
```
Take that spammers!

### var encoded = droideka.encode(text)

Lightly encrypt some text. (not cryptographically secure)

### droideka.js\_code\_decode

A string of JS code that creates a local function `d` that can be used for decoding.

```js
haml += '<script>';
html += droideka.js_code_decode;//insert the decoding function
html += 'var email = d(' + JSON.stringify(encoded) + ');';//call it
html += '</script>';
```

## License
MIT
