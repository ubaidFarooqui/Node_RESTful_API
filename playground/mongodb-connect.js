//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    
   if(err) {
       return console.log('Unable to connect to the MongoDB Server');
   }
    console.log('Connect to the MongoDB Server');
    
//    db.collection('Todos').insertOne({
//        
//       text: 'Something to do',
//        completed: false
//        
//    }, (err, result) => {
//        
//        if (err) {
//            return console.log('Unable to insert todo', err);
//        }
//        
//        console.log(JSON.stringify(result.ops, undefined, 2));
//    });
    
    
    
    db.collection('Users').insertOne({
        
       name: 'Ahsan',
        age: '30',
        location: 'karachi'
        
    }, (err, result) => {
        
        if (err) {
            return console.log('Unable to insert todo', err);
        }
        
        console.log(JSON.stringify(result.ops, undefined, 2));
    });
    

    db.close();
});