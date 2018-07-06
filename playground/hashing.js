const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 10
};


var token = jwt.sign(data, '123abc'); //asigns a token, so here we are using jwt which comes from a library
console.log(token);      

var decoded = jwt.verify(token, '123abc');
console.log(decoded);

//
//var message = 'I am user number 3';
//var hash = SHA256(message).toString() //SHA256 converts the string to hash encrypted string;
//
//
//console.log(`Message: ${message}`);
//console.log(`hash: ${hash}`); 
//
//var data = {
//  id: 4  
//};
//
//var token = {
//    data,
//    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
//};
//
//
//token.data.id = 5;
//token.hash = SHA256(JSON.stringify(token.data)).toString();
//
//
//var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//if (resultHash === token.hash) {
//    console.log('Data was not changed');
//}
//else {
//    console.log('Data was changed. Do not trust!');
//} //this all above method is not gonna be used in our server.js file as this method is a bit hectic, so we
   // use jsonwebtoken module using npm