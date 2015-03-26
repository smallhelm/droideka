var _ = require('lodash');
var uuid = require('node-uuid');

var chars_to_encode = "\"'~!@#$%^&*()<:>[]{}.,+=-ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

var js_code_decode = "var d=function(b){var c=b.substring(0,"+chars_to_encode.length+");b=b.substring(c.length);var e,f,g,h='',d;for(e=0;e<b.length;e++)f=b.charAt(e),g=c.indexOf(f),d=(g-b.length+c.length)%c.length,d=0>d?c.length+d:d,h+=0<=g?c[d]:f;return h};";

var encode = function(text){
	var key = _.shuffle(chars_to_encode.split("")).join("")

	return key + _.map(text.split(""), function(c){
		var i = key.indexOf(c);
		return i < 0 ? c : key[(i + text.length) % key.length];
	}).join('');
};

module.exports = function(html){
	var inserts = {};
	html = _.map(html.split(/(<a href="mailto:(?:[^"]*)">(?:[^<]*)<\/a>)/gi), function(html_block, i){
			var matches = /^<a href="mailto:([^"]*)">(?:[^<]*)<\/a>$/gi.exec(html_block);
			if(matches && matches.length === 2){
				var email = matches[1];
				var id = uuid.v4();
				inserts[id] = '<a href="mailto:'+email+'">'+email+'</a>';
				return '<div id="'+id+'"><noscript>You must enable JavaScript to see the email.</noscript></div>';
			}
			return html_block;
	}).join('');
	if(!_.isEmpty(inserts)){
		html += '<script type="application/javascript">';
		html += 'setTimeout(function(){';
		html += js_code_decode;
		html += _.map(inserts, function(html, id){
			return '(function(){var a=document.getElementById("'+id+'");if(!a)return;a.innerHTML=d('+JSON.stringify(encode(html))+');}());';
		}).join('');
		html += '}, 500);';
		html += '</script>';
	}
	return html;
};
module.exports.encode = encode;
module.exports.js_code_decode = js_code_decode;
