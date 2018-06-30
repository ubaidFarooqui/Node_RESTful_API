var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//let db = {
//    
//    localhost: 'mongodb://localhost:27017/TodoApp',
//    mlab: 'mongodb://ubaidFarooqui:Ubaid1987@ds121251.mlab.com:21251/todoapp1'
//}
//mongoose.connect(process.env.PORT ? db.mlab : db.localhost);

mongoose.connect(process.env.MONGODB_URI);

module.exports ={mongoose};