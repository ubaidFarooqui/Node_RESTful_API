var express = require('express');
var bodyParser = require('body-Parser'); // extracts the body of the incoming request and makes it available                                             to req.body , it also makes bodyParser.json() method makes sure                                               that the body of the incoming equest is properly JSON formatted
const {ObjectID}= require('mongodb');

var {mongoose} = require('./db/mongoose'); // file to a folder
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => { //this is server routes handlers for post todo request
    var todo = new Todo({
        text: req.body.text 
    });
    
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => { //this is server route handlers for get todo request
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});


app.get('/todos/:id', (req, res) => { //todo with id from postman route
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
    } 
    Todo.findById(id).then((todo) => {
        if (todo) {
        res.send({todo});    
        }
        else {
            res.status(404).send('todo not found with this ID');
        }
    }).catch((err) => {
       res.status(400).send();
    })
});



app.listen(3000, () => {
    console.log('Started on Port 3000');
}); 


module.exports = {app}; 



