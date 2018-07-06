require('./config/config.js');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser'); // extracts the body of the incoming request and makes it                                                       available to req.body , it also makes bodyParser.json() method                                               makes sure that the body of the incoming equest is properly                                                   JSON formatted

const {ObjectID}= require('mongodb');

var {mongoose} = require('./db/mongoose'); // file to a folder
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express(); 
const port = process.env.PORT;

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


app.get('/todos/:id', (req, res) => { //getting todos route with id from postman
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

app.delete('/todos/:id', (req, res) => { // deleting todo route with id from postman
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(400).send() 
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (todo) {
            res.status(200).send({todo});
        }
        else {
            res.status(404).send('todo to be deleted not found with this ID');
        }
    }).catch((err) => {
        res.status(400).send();
    })
});


app.patch('/todos/:id', (req, res) => { //Updating todo route with id provided
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    
    if(!ObjectID.isValid(id)) {
        return res.status(400).send() 
    }
    
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (todo) {
            res.status(200).send({todo});
        }
        else {
            res.status(404).send('todo to be updated not found with this ID');
        }
    }).catch((e) => {
        res.status(400).send();
    })
});

//POST /users

app.post('/users', (req, res) => {
   var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
    
    user.save().then(() => {  //this is not clear Lecture:90 :S
        return user.generateAuthToken();
        //res.send(user);
    }).then((token) => {
        /* we use header to send the token back as http response header, header accept 2 arguments as key value pair, key=headername, value= value that is needed to be set for header, we 'x-auth'for custom header which means it not necessary this header is supported by http by default, for example in this project, we use jwt token scheme, we use custom header to store the value */ 
        
        res.header('x-auth', token).send(user);
    }).catch((e) => {
       res.status(400).send(e); 
    });
});


app.listen(port, () => {
    console.log(`Started on Port ${port}`);
}); 


module.exports = {app};