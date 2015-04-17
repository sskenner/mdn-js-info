
// Loops and iteration /////////////////////////////////////////////////////////



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
