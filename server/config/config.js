var env = process.env.NODE_ENV || 'development'; //process.env.NODE_ENV is set to production by default
console.log(`Environment Situation = ${env}`);

if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
}
