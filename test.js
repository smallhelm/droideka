var _ = require('lodash');
var droideka = require('./index');

var n_tests_to_run = 1000;

var n_failed = 0;
var n_passed = 0;

var assertRecoded = function(text){
  var e = droideka.encode(text);
  eval(droideka.js_code_decode);
  var decoded = d(e);
  if(decoded === text){
    n_passed++;
  }else{
    console.error("failed to recode", text, "but instead got back", decoded);
    n_failed++;
  }
};

//
//Let's do some generative testing!!!
//

var randomChar = (function(){
  var chars = "\"'~!@#$%^&*()<:>[]{}.,+=-ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
  return function(){
    return _.sample(chars);
  };
}());
var randomString = function(){
  return _.map(_.range(1, _.random(0, 10000)), randomChar).join("");
};

_.each(_.range(0, n_tests_to_run), function(){
  assertRecoded(randomString());
});

console.log("Done");
console.log("#failed:", n_failed);
console.log("#passed:", n_passed);

if(n_failed > 0){
  process.exit(1);
}
