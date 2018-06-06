const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    
   if(err) {
       return console.log('Unable to connect to the MongoDB Server');
   }
    console.log('Connect to the MongoDB Server');
    
//    db.collection('Todos').find({
//        _id: new ObjectID('5b1762029b729e21f05caaf3') 
//      }).toArray().then((docs) => {
//        
//        console.log('Todos');
//        console.log(JSON.stringify(docs, undefined, 2));
//        
//    }, (err) => {
//        
//        console.log('Unable to find fecth todos', err)
//    });
    
//     db.collection('Todos').find().count().then((count) => {
//        
//        console.log(`Todos count: ${count}`);
//      
//    }, (err) => {
//        
//        console.log('Unable to find fecth todos', err)
//    });
//    
    
//    console.log('Connect to the MongoDB Server');
    
    db.collection('Users').find({location: 'karachi'}).toArray().then((docs) => {
        
        console.log('Users');
        console.log(JSON.stringify(docs, undefined, 2));
        
    }, (err) => {
        
        console.log('Unable to find fecth todos', err)
    });
    
   
  
    //db.close();
});












