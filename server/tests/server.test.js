const expect = require('expect'); //expect for assertion
const request = require('supertest');// mocha for the entire test sweet
                                     // super test for test our express routes
                                        // nodemon for watching out for the changes
                                     // remember in these test cases, we are not passing the data from url 
                                      // data passed are mock data
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo'); // one folder to another folder

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id : new ObjectID(),
    text: 'Second tst todo'
}];


beforeEach((done) => {    // beforeEach let us run our code before any test code runs
                          // here we are making sure that database is empty by using beforeEach
       Todo.remove({}).then(() => { // the below test cases only runs after getting the result from 'done'
          return Todo.insertMany(todos);
       }).then(() => done());
});

describe('POST / todos', () => {
    
    it('should create a new todo', (done)=> { //done used for asynchronous test
        
        var text = 'Test todo text';
        
        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);     // todo[0] means the todo saved data on position 0                                          that why we use beforeEach  
                done();
            }).catch((e) => done(e));    // catch added because even if the above two expects fails
                                         // the test is still going to pass
        });
    });
    
    it('should not create a todo with a invalid body data', (done) => {
        
        var text = '';
        request(app)
        .post('/todos')
        .send({text})
        .expect(400)
        .end((err, res) => {
           if(err) {
               return done(err);
           }
            
            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
            
        });
    });
    
}); 


describe('GET /todos', () => {
   it('should get all todos', (done) => {
       request(app)
       .get('/todos')
       .expect(200)
       .expect((res) => {
           expect(res.body.todos.length).toBe(2);
       })
       .end(done);
   }); 
});


describe('GET /todo/:id', () => {
    it('should return todo doc', (done)=> {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)//toHexString methods converts the object ID to the str
        .expect(200)                               //because we pass string from the url so id has to be str
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text); //this is a custom expect
        })
        .end(done);
    });  
    
    it('should return 404 if todo not found', (done) => {
       var hexID = new ObjectID().toHexString(); //this creates a valid ID but not present in the database
        request(app)
        .get(`/todos/${hexID}`)
        .expect(404)
        .end(done);
    });
    
    it('should return 404 for non-object ids', (done) => {
        request(app)
        .get('/todos/123abc') // this is a wrong ID attached, so on our get route, it expectsg 400
        .expect(400)
        .end(done);
    });
});














