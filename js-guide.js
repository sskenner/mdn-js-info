// Functions /////////////////////////////////////////////////////////

// callbacks
//a function to be executed after another function is executed
// > what is a callback: bc JS in the browser is single threaded, when a call is made to an entity external to JS code, the code cannot usully afford to wait for a reply which may be seconds in coming.. Thus, callbacks, pass along with a call to the server a JS f()that the server should invoke whenever the result is ready

// http://www.mosync.com/docs/sdk/js/guides/basic/using-javascript-callbacks/index.html
// .. simple callback
target.addEventListener(event-type, callback);
/////////////
var myButton = document.getNativeElementById("myButton");
myButton.addEventListner("Clicked",
  function() {
    alert("The button was clicked");
  });
// .. standalone callback functions
// define the callback f()
function buttonCallback()
{
  alert("a button was clicked");
}

// define two event listeners
myButton1.addEventListener("Clicked", buttonCallback);
myButton2.addEventListener("Clicked", buttonCallback);

// .. wormhole callback function
// initializer of the accelerometer sensor
var accelerometer = new SensotConnection("Accelerometer");

// add an event listener to the sensor and identify a callback function
accelerometer.addEventListener("onsensordata", updateAccelerometer);

// start monitoring the accelerometer every 1 second
accelerometer.startWatch({interval:1000});

// define the callback function
function updateAccelerometer(sensorData)
{
  console.log("X:" + sensorData.data.x);
  console.log("Y:" + sensorData.data.y);
  console.log("Z:" + sensorData.data.z);
}

// defining functions w callback arguments
//--server side
function randomGenerator(min, max, callback)
{
  var myNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  setTimeout(function() { callback(myNumber); }, 500);
}
//--client side
randomGenerator( 5, 15, function(num) {
  console.log("Your number is " + num);
});

// parallel operations via callbacks
$("element").fadeIn( 2000, function() {
  alert("Fade in complete");
});

//closures .. a f() that remembers refernces to variable outside of it's local scope .. i.e. variables that are neither parameters of the function, nor local variables defined inside the f() with var keyword, but vars defined outside of the functions, e.g. global vars or local vars defined in the containing f()
// global var
var name = "Chris";

function lottery() {
  // local vars
  var win = ", u win!";
  var lose = "better luck next time ";

  // the f() in the 3rd parameter is a closure that refers to the variables name, win, lose
  randomGenerator( 0, 100, function(num) {
    if (num > 50) {
      //alert(name + win);
      console.log(name + win);
    } else {
      //alert(name + lose);
      console.log(name + lose);
    }
  });
}

// http://dreamerslab.com/blog/en/javascript-callbacks/
// normally...
function do_a(){
  console.log("'do_a': this comes out first");
}
function do_b(){
  console.log("'do_b': this comes out later");
}

do_a();
do_b();
// bc js is an event driven language, if do_a takes longer than do_b, the result
//of do_b comes out first than do_a
function do_a(){
  // simulate a time consuming function
  setTimeout(function(){
    console.log( "'do_a': this takes longer than 'do_b'");
  }, 1000);
}
function do_b(){
  console.log( "'do_b': this is supposed to come out after 'do_a' but it comes out before 'do_a' ");
}
do_a();
do_b();
////////////
//..different ways
function basic( callback ) {
  console.log( 'do something here' );

  var result = "i am result of 'do something' to be passed to callback";

  // if callback exists execute it
  callback && callback( result );
}

function callbacks_with_call( arg1, arg2, callback ) {
  console.log( 'do something here' );

  var result1 = arg1.replace( 'argument', 'result' ), // ?? replace()
      result2 = arg2.replace( 'argument', 'result' );

  this.data = "some data that can be used for callback f() w 'this' keyword";

  // if callback exists execute it
  callback && callback.call( this, result1, result2 );
}
// this is similar to 'callbacks_with_call'.. the only difference is we 'apply'
// instead of 'call' so we need to pass arguments as an array
function callbacks_with_apply( arg1, arg2, callback ) {
  console.log( 'do something here' );

  var result1 = arg1.replace( 'argument', 'result' ),
      result2 = arg2.replace( 'argument', 'result' );

  this.data = "some data that can be used for callback f() w 'this' keyword";

  // if callback exist execute it
  callback && callback.apply( this, [ result1, result2 ] );
}

basic( function( result ) {
        console.log( "this callback is going to print out the result from the f() 'basic'" );
        console.log( result );
       }
);

console.log( '------------------------------' );

( function() {
    var arg1 = 'i am arg1',
        arg2 = 'i am arg2';

    callbacks_with_call( arg1, arg2,
                         function( result1, result2 ) {
                            console.log( "this callback is going to log the results from the f() 'callbacks_with_call'" );
                            console.log( 'result1: ' + result1 );
                            console.log( 'result2: ' + result2 );
                            console.log( "data from 'callbacks_with_call': " + this.data );
                          }
    );
  }
)();

console.log( '------------------------------' );

( function() {
  var arg1 = 'i am arg1',
      arg2 = 'i am arg2';

  callbacks_with_apply( arg1, arg2,
                        function( result1, result2 ) {
                          console.log( "this callback is going to log the results from the f() 'callbacks_with_apply'" );
                          console.log( 'result1: ' + result1 );
                          console.log( 'result2: ' + result2 );
                          console.log( "data from 'callbacks_with_apply': " + this.data );
                                    }
  );
  }
)();

// http://recurial.com/programming/understanding-callback-functions-in-javascript/
function some_function(a1,a2,callback){
  var my_number = Math.ceil(Math.random()*(a1-a2)+a2);
  callback(my_number);
}
some_function(5,15, function(num){
  console.log("callback called!" + num);
});
////////////
var func_multiply = new Function("a1","a2","return a1*a2;");
func_multiply(5,10);

// closures
// node.js function scope
var name = 'ben';
// above equals to the following
(function(global){
  var name = 'ben';
})(global);

global.name = 'ben';

// ..in oop can store data to 'higher level'(outer scope) vars and reuse it
function photo(){
  var name = 'ben';

  return{
    say_my_name: function(){
      console.log( name );
    },

    rename : function( new_name ){
      name = new_name;
    }
  };
}

var pic = new photo;

pic.say_my_name();

pic.rename( 'bibi' );

pic.say_my_name();

//////////////////
// http://dreamerslab.com/blog/en/javascript-function-scopes-and-closures/
function outer_scope(){
  var a = "i am 'a' from outer scope",
      b = "i am 'b' from outer scope";
  console.log('logging from outer_scope b4 inner scope func declaration');
  console.log('a:' + a);
  console.log('b:' + b);
  console.log('------------------------');

  function inner_scope_1(){
    console.log('logging from inside funct inner_scope_1 b4 var declar');
    console.log('a:' + a);
    a = "overwrite the outer_scope 'a'";
    console.log('logging from inside function inner_scope_1 after var declar');
    console.log('a:' + a);
    console.log('------------------------');
  }

  function inner_scope_2(){
    console.log('logging from inside funct inner_scope_2 b4 var declar');
    console.log('b:' + b);
    var b = "i will not overwrite the outer_scope 'b'";
    console.log('logging from inside function inner_scope_2 after var declar');
    console.log('b:' + b);
    console.log('------------------------');
  }
  inner_scope_1();
  inner_scope_2();

  a = "i will be the new 'a'";
  b = "i will be the new 'b'";

  console.log('logging from outer scope after inner scope executed');
  console.log('a: ' + a);
  console.log('b: ' + b);
  console.log('------------------------');
}
outer_scope();

//// .. IIFE (immediately invoked function expression)
function celebrityIDCreator(theCelebrities){
  var i;
  var uniqueID = 100;
  for(i = 0; i < theCelebrities.length; i++){
    theCelebrities[i]["id"] = function(j){ // j parametric val is the i passed in
                                          //on invocation of this IIFE
      //return uniqueID + i;
      return function(){
        return uniqueID + j; // each iteration of loop passes current val of i into
                            //this IIFE and it saves the correct val to the array
      }() // adding () at the end of funct executes it immediately returning just
          //just the value of uniqueID + j, instead of returning a function
    }(i) // immediately invoke the function passing the i var as a param
  }
  return theCelebrities;
}

var actionCelebs = [{name:"Stallone", id:0}, {name:"Cruise", id:0}, {name:"Willis", id:0}]

var createdIdForActionCelebs = celebrityIDCreator(actionCelebs);

var cruiseID = createdIdForActionCelebs[1];
var willisID = createdIdForActionCelebs[2];
var stalloneID = createdIdForActionCelebs[0];
console.log(cruiseID.id()); // 101
console.log(willisID.id()); // 102
console.log(stalloneID.id()); // 103
////////
//// .. gone awry
function celebrityIDCreator(theCelebrities){
  var i;
  var uniqueID = 100;
  for(i = 0; i < theCelebrities.length; i++){
    theCelebrities[i]["id"] = function(){
      return uniqueID + i;
    }
  }
  return theCelebrities;
}

var actionCelebs = [{name:"Stallone", id:0}, {name:"Cruise", id:0}, {name:"Willis", id:0}]

var createdIdForActionCelebs = celebrityIDCreator(actionCelebs);

var cruiseID = createdIdForActionCelebs[0];
var willisID = createdIdForActionCelebs[0];
var stalloneID = createdIdForActionCelebs[0];
console.log(cruiseID.id());
console.log(willisID.id());
console.log(stalloneID.id()); // 103

//// .. store references to outer functs vars
function celebrityID(){
  var celebrityID = 999;
  // we're returning an obj w some inner f()s..all inner
  //f()s hv access to outer f()s vars
  return{
    getID: function(){
      // this inner f() will return UPDATED celebID var..
      //will return the current val of celebID, even after
      //the changeTheID f() changes it
      return celebrityID;
    },
    setID: function(theNewID){
      // inner f() will change outer f()s var anytime
      celebrityID = theNewID;
    }
  }
}

var mjID = celebrityID(); // celebID outer f() has returned
mjID.getID(); // 999
mjID.setID(567); // changes outer f()s var
mjID.getID(); // 567: returns the updated celebID var
////////////
function celebrityName(firstName){
  var nameIntro = "This celebrity is ";
  // inner f() has access to outer f()'s vars, incl params
  function lastName(theLastName){
    return nameIntro+firstName+" "+theLastName;
  }
  return lastName;
}
var mjName = celebrityName("Michael");
mjName("Jackson");

//////////////
$(function(){
  var selections = [];
  $(".niners").click(function() {
    selections.push(this.prop("name"));
  });
});
////////////
function showName(firstName, lastName){
  var nameIntro = "ur name is ";
  // inner f() has access to outer f()'s vars, incl params
  function makeFullName(){
    return nameIntro + firstName + " " + lastName;
  }
  return makeFullName();
}
showName("Michael","Jackson");

// https://github.com/maxogden/art-of-node#callbacks
////////////////
var myNumber = 1
function addOne() { myNumber++ } // define function
addOne() // run the function
console.log(myNumber)

// the parameter this
// .. in an in-line event handler
<button onclick="alert(this.tagName.toLowerCase());">
  Show this

  <button onclick="alert((function(){return this}()));">
    Show inner this
  </button>
</button>

// ..as a DOM event handler
// when called as a listener, turns the related element blue
function bluify(e){
  // always true
  console.log(this === e.currentTarget);
  // true when currentTarget and target are the same object
  console.log(this === e.target);
  this.style.backagroundColor = '#A5D9F3';
}
// get a list of every element in the document
var elements = document.getElementsByTagName('*');

// add bluify as a click listener so when the
//element is clicked on, it turns blue
for(var i=0; i<elements.length; i++){
  elements[i].addEventListner('click', bluify, false);
}

// the bind method
function f(){
  return this.a;
}

var g = f.bind({a:"azerty"});
console.log(g()); // azerty

var o = {a:37, f:f, g:g};

// call and apply
function bar(){
  console.log(Object.prototype.toString.call(this));
}
bar.call(7); // [object Number]
///////////////
function add(c,d){
  return this.a + this.b + c + d;
}

var o = {a:1, b:3};

add.call(o,5,7); // 1+3+5+7=16

add.apply(o,[10,20]); // 1+3+10+20=34

// .. this as a constructor
function C(){
  this.a = 37;
}

var o = new C();
console.log(o.a); // logs 37

function C2(){
  this.a = 37;
  return {a:38};
}

o = new C2();
console.log(o.a); // logs 38

// .. this w a getter or setter
function modulus(){
  return Math.sqrt(this.re * this.re + this.im * this.im);
}

var o = {
  re: 1,
  im: -1,
  get phase(){
    return Math.atan2(this.im, this.re);
  }
};
Object.defineProperty(o, 'modulus', {
  get: modulus, enumerable: true, configurable:true});

console.log(o.phase, o.modulus); // logs -0.78 1.4142

// this on the object's prototype chain
var o = {
  f: function(){
    return this.a + this.b;
  }
};
var p = Object.create(o);
p.a = 1;
p.b = 4;

console.log(p.f()); // 5

// as an object method
var o = {a: 1};

function g() {
  return this;
}
o.b = {
  g: 0, //independent,
  prop: 42
};
console.log(o.b.g());

/////////////
var o = {prop: 37};

function independent(){
  return this.prop;
}
o.f = independent;
console.log(o.f( ));

/////////////
var o = {
  prop: 37,
  f: function(){
    return this.prop;
  }
};
console.log(o.f()); // logs 37

// function context
function f1(){
  // "use strict"; // see strict mode
  return this;
}
f1() === window;

// global context
console.log(this.document === document); // true
// in web browsers, the window obj is also the global obj:
console.log(this === window); // true

this.a = 37;
console.log(window.a);


// calling functions

function factorial(n) {
  if ((n == 0) || (n == 1))
    return 1;
  else
    return (n * factorial(n - 1));
}

var a, b, c, d, e;

// --
console.log(square(5));
/* .. */
function square(n) { return n*n }
// --
square(5);

// function expressions

var myFunc;
if (num == 0) {
  myFunc = function(theObject) {
    theObject.make = "toyota"
  }
}

// --

function map(f,a) {
  var result = [], // create new array
      i;
  for (i = 0; i != a.length; i++)
    result[i] = f(a[i]);
  return result;
}

map(function(x) { return x * x * x }, [0, 1, 2, 5, 10]);
// -- array.prototype.map()
// var numbers = [1, 4, 9];
// var roots = numbers.map(Math.sqrt);
//--
// var kvArray = [{key:1, value:10}, {key:2, value:20}, {key:3, value:30}];
// var reformattedArray = kvArray.map(function(obj) {
//   var rObj = {};
//   rObj[obj.key] = obj.value;
//   return rObj
// });
// --
// var numbers = [1, 4, 9];
// var doubles = numbers.map(function(num) {
//   return num * 2;
// });
var map = Array.prototype.map;
var a = map.call('hello world', function(x) {
  return x.charCodeAt(0);
 });
// --
function threeChars(value, index, str) {
  return str.substring(index - 1, index + 2);
}

var word = "thursday";

var result = [].map.call(word, threeChar);

document.write(result);

// --

// var factorial = function fac(n) {
//   return n < 2 ? 1 : n*fac(n - 1);
// }

// console.log(factorial(3));

// // --
// var square = function(number) {
//   return number * number;
// }
// or
// var square = function(number) { return number * number };

// var x = square(4)

// // --
// function myFunc(theObject) {
// //  theObject.make = "make1";
//   theObject = {make: "make3", model: "model3", year: "year3"};
// }

// var mycar = {make: "make2", model: "model2", year: "year2"};
// var x, y;

// x = mycar.make; // x gets the value "make2"

// myFunc(mycar);
// y = mycar.make; // y gets "make1" .. changed by the function

// //--
// function square(numner) {
//   return number * number;
// }

// Loops and iteration /////////////////////////////////////////////////////////
// > loop mechanisms offer different ways to determine the start and end points
// of the loop

// for, do...while, while, label, break, continue, for...in, for...of

// for...of statement
// > experimental, part of ECMAScript (harmony) proposal, check compatibility table

// for (variable of object) {
//  statement
// }

// let arr = [3, 5, 7];
// arr.foo = "hello";

// for (let i in arr) {
//   console.log(i); // log "0", "1", "2", "foo"
// }

// for (let i of arr) {
//   console.log(i); // logs "3", "5", "7"
// }

// --
// for...in statement
// iterates a specified variable over all the properties of an objec

// for (variable in object) {
//  statements
// }

// var car = {
//   make: "Ford",
//   model: "Mustang"
// }

// function dump_props(obj, obj_name) {
//   var result = "";
//   for (var i in obj) {
//     result += obj_name + "." + i + " = " + obj[i] + "<br>";
//   }
//   result += "<hr>";
//   return result;
// }

// dump_props(car, "car");

// // > for an object car w properties make and model, result would be:
// car.make = Ford
// car.model = Mustang

// continue statement
// > restart a while, do-while, for or label statement

// continue;
// continue label;

// var i = 0, j = 8;

// checkiandj:
// while (i < 4) {
//   console.log(i);
//   i += 1;
//   checkj:
//   while (j > 4) {
//     console.log(j);
//     j -= 1;
//     if ((j % 2) == 0) {
//       continue checkj; // or continue checkiandj;
//     }
//     console.log(j + " is odd.");
//   }
//   console.log("i = " + i);
//   console.log("j = " + j);
// }

// --

// var i = 0;
// var n = 0;
// while (i < 3) {
//   i++;
//   if (i == 2) {
//     continue;
//   }
//   n += i;
// }
// --
// var x = 0;
// var z = 0;
// labelCancelLoops: while (true) {
//   console.log("Outer loops: " + x);
//   x += 1;
//   z = 1;
//   while (true) {
//     console.log("Inner loops: " + z);
//     z += 1;
//     if (z === 10 && x === 10) {
//       break labelCancelLoops;
//     } else if (z === 10) {
//       break;
//     }
//   }
// }

// --
// break statement
// > to terminate a loop, switch, or in conjunction w a label statement

// break;
// break label;

// var a = "areallylongvar"
// var theValue = "y"

// for (var i = 0; i < a.length; i++) {
//   if (a[i] == theValue) {
//     break;
//   }
// }

// label statement
// > statement w/ identifier to refer to elsewhere in code

// label :
//    statement

// markLoop:
// while (theMark == true) {
//   doSomething();
// }

// while statement
// > executes statement(s) as long as specified condition evals to true
// > condition is checkes before statement in the loop are executed

// while (condition)
//   statement

// var n = 0;
// var x = 0;
// while (n < 3) {
//   n++;
//   x += n;
// }

// do...while statement //
// > statement(s) repeat until a specified condition evaluates to false
// > condition is checked at the end of every execution

// do
//   statement
// while (condition);

// var i = 0;

// do {
//   i+=1;
//   console.log(i);
// } while (i < 5);

// for statement //
// for ([initialExpression]; [condition]; [incrementExpression])
//  statement

// <form name="selectForm">
//   <p>
//     <label for="musicTypes">choose some music types, then click...</label>
//     <select id="musicTypes" name="musicTypes" multiple="multiple">
//       <option selected="selected">R&B</option>
//       <option>jazz</option>
//       <option>blues</option>
//       <option>new age</option>
//       <option>classical</option>
//       <option>opera</option>
//     </select>
//   </p>
//   <p><input id="btn" type="button" value="how many..?" /></p>
// </form>

// <script>
// function howMany(selectObject)  {
//   var numberSelected = 0;
//   for (var i = 0; i < selectObject.options.length; i++) {
//     if (selectObject.options[i].selected) {
//       numberSelected++
//     }
//   }
//   return numberSelected;
// }

// var btn = document.getElementById("btn");
// btn.addEventListener("click", function() {
//   alert('Number of options..' + howMany(document.selectForm.musicTypes))
// });
// </script>

// var step;
// for (step = 0; step < 5; step++) {
//   console.log('walking east 1 step')
// }

// Control flow and error handling /////////////////////////////////////////////

// // Promises //

// function imgLoad(url) {
//   return new Promise(function(resolve, reject) {
//     var request = new XMLHttpRequest();
//     request.open('GET', url);
//     request.responseType = 'blob';

//     request.onload = function() {
//       if (request.status === 200) {
//         resolve(request.response);
//       } else {
//         reject(Error('Image didn\'t load successfully; error code:'
//                       + request.statusText));
//       }
//     };
//     request.onerror = function() {
//       reject(Error('There was a network error'));
//     };
//     request.send();
//   });
// }

// var body = document.querySelector('body');
// var myImage = new Image();

// imgLoad('myLittleVader.jpg').then(function(response)  {
//   var imageURL = window.URL.createObjectURL(response);
//   myImage.src = imageURL;
//   body.appendChild(myImage);
// }, function(Error) {
//   console.log(Error);
// })


// Utilizing Error Objects //

// function doSomethingErrorProne() {
//   if (ourCodeMakesAMistake()) {
//     throw (new Error('The Message'));
//   } else {
//     doSomethingToGetAJavascriptError();
//   }
// }
// //....
// try {
//   doSomethingErrorProne();
// }
// catch (e) {
//   console.log(e.name); // logs 'Error'
//   console.log(e.message); // logs 'The Message' or JS error msg
// }

// try...catch Statement //

// the finally block //

// function f() {
//   try {
//     throw "bogus";
//   } catch(e) {
//     console.log('caught inner "bogus');
//     throw e;  // throw is suspended until finally block completed
//   } finally {
//     return false; // overwrites previous "throw"
//   }
//   // "return false" is executed now
// }

// try {
//   f();
// } catch(e) {
//   // never reached bc throw inside catch is overwritten by the return in finally
//   console.log('caught outer "bogus"')
// }

// // $> caught inner "bogus"

// --
// function f() {
//   try {
//     console.log(0);
//     throw "bogus";
//   } catch(e) {
//     console.log(1);
//     return true; //return statement is suspended until finally block complete
//     console.log(2); // not reachable
//   } finally {
//     console.log(3);
//     return false; // overwrites the previous "return"
//     console.log(4); // not reachable
//   }
//   // return false is executed now
//   console.log(5); // not reachable
// }
// f(); // alerts 0, 1, 3; returns false

// --
// openMyFile();
// try {
//   writeMyFile(theData); //may throw an error
// } catch(e); {
//   handleError(e); //if we get error, we handle it
// } finally {
//   closeMyFile(); //always close the resource
// }


// the catch block //
// var myMonth = "8";
// var monthName;

// function getMonthName(mo) {
//   mo = mo-1; // adj month # for array index
//   var months =["Jan","Feb","Mar","Apr","May","Jun","Jul", "Aug","Sep","Oct","Nov","Dec"];
//   if (months[mo] != null) {
//     return months[mo];
//   } else {
//     throw "InvalidMonthNo";
//   }
// }

// try {
//   monthName = getMonthName(myMonth);
// }
// catch (e) {
//   monthName = "unknown";
//   logMyErrors(e);
// }

// getMonthName(myMonth);

// create an object type UserException
// function UserException (message) {
//   this.message=message;
//   this.name="UserException";
// }

// // convert exception to pretty string when used as a string (eg by the error console)
// UserException.prototype.toString = function() {
//   return this.name + ': "' + this.message + '"';
// }

// // create an instance of the object type and throw it
// throw new UserException("value too high");

// var x = 0;
// while (x < 10) {
//   x++;
// }


// Grammar and types ///////////////////////////////////////////////////////////

// // escaping line breaks et al
// var poem =
// "roses violets \n\
// schizo \n\
// and"

// // distinction btw string primitives and objects
// var s_prim = 'foo';
// var s_obj = new String(s_prim);

// console.log(typeof s_prim);
// console.log(typeof s_obj);

// // object literal example 3
// var foo = { a: "alpha", 2: "two" };

// console.log(foo.a);
// console.log(foo[2]);
// // console.log(foo[a]); // Error: a is not defined
// // console.log(foo.2);  // Error: unexpected number or missing )
// console.log(foo["a"]);
// console.log(foo["2"]);


// // object literal example 2
// var car = { manyCars: {a: "Saab", "b": "Jeep"}, 7: "Mazda" };

// console.log(car.manyCars.b);
// console.log(car[7]);


// // object literal example
// var Sales = "Toyota";

// function CarTypes(name) {
//     if (name === "Honda") {
//         return name;
//     } else {
//         return "Sorry " + name + ".";
//     }
// }

// var car = { myCar: "Saturn", getCar: CarTypes("Honda"), getCar2: CarTypes("Ford"), special: Sales };

// console.log(car.myCar);
// console.log(car.getCar);
// console.log(car.getCar2);
// console.log(car.special);

// // creating Boolena objects with inital value of true
// var btrue = new Boolean(true);
// var btrueString = new Boolean('true');
// var bfalseStrig = new Boolean('false');
// var bSuLin = new Boolean('Su Lin');
// var bArrayProto = new Boolean([]);
// var bObjProto = new Boolean({});

// //creating Boolean objects with initial value to false
// var bNoParam = new Boolean();
// var bZero = new Boolean(0);
// var bNull = new Boolean(null);
// var bEmptyString = new Boolean('');
// var bfalse = new Boolean(false);

// /*
// undefined
// */

// if (true) {
//   var x = 5;
// }
// console.log(x);

// undefined // should log 0 to console
// var n = null;
// console.log(n * 32);

// var a;
// a+2
// /*
// NaN
// */

// why does this not work? should invoke myFunction
// var myArray = [];
// function myFunction() {
//   console.log("yo!");
// }

// if (!myArray[0])
//   myFunction();


// var input;
// if(input === undefined) {
//   doThis();
// } else {
//   doThat();
// }
