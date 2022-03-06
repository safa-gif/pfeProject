const db = require('mongoose');

db.connect("mongodb://localhost:27017/pfe")
.then(()=> {
console.log(`Connected succesfully to db`)
})
.catch(error => {
    console.log(`Failed to connect to db ${error}`)
})
exports = db;