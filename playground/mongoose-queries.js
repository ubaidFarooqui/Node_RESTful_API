const {ObjectID}= require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var user_id = '5b1a216d13241fa839e0a2b0';

//var id = '5b3034b355c5a1381a33080e11';
//
//if (!ObjectID.isValid(id)) {
//    console.log('ID not valid');
//}

//Todo.find({  //finding document with id in Todo
//    _id: id
//}).then((todos) => {
//    console.log('Todos', todos);
//});
//
//Todo.findOne({ //
//    _id: id
//}).then((todo) => {
//    console.log('Todo', todo);
//});

//Todo.findById(id).then((todo) => {
//    console.log('Todo', todo);
//});

//Todo.findById(id).then((todo) => {
//    if(!todo) {
//     return console.log('Id not found')    
//    }
//    console.log('Todo', todo);
//});
//
//Todo.findById(id).then((todo) => {
//    if(!todo) {
//     return console.log('Id not found')    
//    }
//    console.log('Todo', todo);
//}).catch((e) => {
//   console.log(e); 
//});
//
//
//

User.findById(user_id).then((user) => {
    if (!user) {
        return console.log('user not found by this id');
    }
    console.log('user', user)
}).catch((e) => console.log(e));

























































