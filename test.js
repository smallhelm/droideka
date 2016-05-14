var _ = require('lodash');
var test = require('tape');
var droideka = require('./index');

var n_tests_to_run = 1000;

var randomChar = (function(){
  var chars = "\"'~!@#$%^&*()<:>[]{}.,+=-ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
  return function(){
    return _.sample(chars);
  };
}());
var randomString = function(){
  return _.map(_.range(1, _.random(0, 10000)), randomChar).join("");
};

test('encoding then decoding strings', function(t){
  _.each(_.range(0, n_tests_to_run), function(){
    var text = randomString();
    var encoded = droideka.encode(text);
    eval(droideka.js_code_decode);
    var decoded = d(encoded);
    t.notEquals(text, encoded);
    t.equals(text, decoded);
  });
  t.end();
});

test('seeded encoding', function(t){
  var text = 'hello world';
  t.equals(
    droideka.encode(text, 'seed?'),
    "Z3.k+u*@]D)Qwfs{A'06S%(a&gX2t9^xCdRI5cJHmjL[NhyO7<T}Uo:1$YFEMrvp\"#nP>elq~,W-VGKbiz84!=B$izz\" a\"~zN"
  );
  console.log(JSON.stringify(droideka.encode(text, 'something else')));
  t.equals(
    droideka.encode(text, 'something else'),
    "){j^6=PZX1<B-V.3n!D%a2O#*iNv[fb4whtF5Kgl~dLCuk9UT@R7WrImY>:xpJ'+yMG\"HAoSe,&z80}]EQc($qsu(RRQ CQyRW"
  );
  t.end();
});
