var _ = require('lodash');

var chars_to_encode = "\"'~!@#$%^&*()<:>[]{}.,+=-ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

var js_code_decode = "var d=function(b){var c=b.substring(0,"+chars_to_encode.length+");b=b.substring(c.length);var e,f,g,h='',d;for(e=0;e<b.length;e++)f=b.charAt(e),g=c.indexOf(f),d=(g-b.length+c.length)%c.length,d=0>d?c.length+d:d,h+=0<=g?c[d]:f;return h}";

var encode = function(text){
	var key = _.shuffle(chars_to_encode.split("")).join("")

	return key + _.map(text.split(""), function(c){
		var i = key.indexOf(c);
		return i < 0 ? c : key[(i + text.length) % key.length];
	}).join("");
};

module.exports.encode = encode;
module.exports.js_code_decode = js_code_decode;
