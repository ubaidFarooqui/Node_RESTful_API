var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let db = {
    
    localhost: 'mongodb://localhost:27017/TodoApp',
    mlab: 'mongodb://<ubaidFarooqui>:<Ubaid1987>@ds121371.mlab.com:21371/todoapp'
}
mongoose.connect(db.localhost || db.mlab);

module.exports ={mongoose};