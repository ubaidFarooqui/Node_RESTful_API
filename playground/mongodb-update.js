const {MongoClient, ObjectID} = require('mongodb');

//MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
//    
//   if(err) {
//       return console.log('Unable to connect to the MongoDB Server');
//   }
//    console.log('Connect to the MongoDB Server');
//    
//    db.collection('Todos').findOneAndUpdate({
//        
//       _id: new ObjectID('5b191317cb41441f54ee06f4') 
//    }, {
//        
//        $set : {
//            completed: true
//        }
//        
//    }, {
//        returnOriginal: false
//    }).then((result) => {
//        console.log(result);
//    })
//
//    
    
    MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    
   if(err) {
       return console.log('Unable to connect to the MongoDB Server');
   }
    console.log('Connect to the MongoDB Server');
    
    db.collection('Users').findOneAndUpdate({
        
       _id: new ObjectID('5b1762029b729e21f05caaf4') 
    }, {
        
        $inc : {
            age: 1
        },
        $set : {
          name: 'Ubaid Ahmed'  
        }
        
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    })

    // db.close();
    
    // db.close();
});