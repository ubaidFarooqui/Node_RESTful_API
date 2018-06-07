const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    
   if(err) {
       return console.log('Unable to connect to the MongoDB Server');
   }
    console.log('Connect to the MongoDB Server');
    
    // deleteMany --> can delete many docuuments
//    db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
//        console.log(result);
//    });
    // delete one --> delete one document
//    db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
//        console.log(result);
//    });
    
    // findOneAndDelete --> delete and returns the doucment which got deleted
    
    db.collection('Todos').findOneAndDelete({completed: false}).then((result)=>{
        console.log(result);
    });

    // db.close();
});