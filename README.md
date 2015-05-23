# droideka
fight back against email scrapers

# What it does

 * finds all `<a href="mailto:...` email addresses in your html
 * encrypts them
 * appends some JS to your html that decrypts them 1/2 second after the page loads

# How to use it

```js
var droideka = require('droideka');
```

## html = droideka(html)

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
  <span id="cff32a62-3eb9-45d2-b623-f4644ba44b6a"><noscript>You must enable JavaScript to see the email.</noscript></span>
</p>
<p>
  Here is some more html stuff
</p>
<script type="application/javascript">setTimeout(function(){var d=function(b){var c=b.substring(0,87);b=b.substring(c.length);var e,f,g,h='',d;for(e=0;e<b.length;e++)f=b.charAt(e),g=c.indexOf(f),d=(g-b.length+c.length)%c.length,d=0>d?c.length+d:d,h+=0<=g?c[d]:f;return h};(function(){var a=document.getElementById("cff32a62-3eb9-45d2-b623-f4644ba44b6a");if(!a)return;a.innerHTML=d("eY\"1]U.ZbrBtmCh[-:VpK!6WuXx8dlwM2GJ,kfT#(RHD&5L}I^o7~F*4S0{qzO%n3>gsQPvA'@cyjN<9=)a+iE$Gf S7H9,&*f#AFUq6U*HdH*f#A&K6U*HdH*f#AG/fK");}());}, 500);</script>
```
Take that spammers!

## var encoded = droideka.encode(text)

Lightly encrypt some text.

## droideka.js\_code\_decode

A string of JS code that creates a function `d` that can be used for decoding.

```js
haml += '<script>';
html += droideka.js_code_decode;//insert the decoding function
html += 'var email = d(' + JSON.stringify(encoded) + ');';//call it
html += '</script>';
```

# License

The MIT License (MIT)

Copyright (c) 2015 Small Helm LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
