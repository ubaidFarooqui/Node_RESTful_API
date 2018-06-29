const {ObjectID}= require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//Todo.remove({}).then(()=> {
//    console.log(result);
//}); this remove all the data documents presents within a Todo collection, and does not return that what was removed but only a number that how many docs were removed

//Todo.findOneAndRemove() this remove the very first document it finds within the Todo collection and also return back that what was removed

//Todo.findByIdAndRemove()  this removes the document with specific ID provided and also return the doc

Todo.findByIdAndRemove('5b36b4ecf46cb80f803623e6').then((todo)=> {
    console.log(todo); 
});