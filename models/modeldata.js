// var http= require("http");
// var MongoClient = require('mongodb').MongoClient;  
// var url = "mongodb://localhost:27017/pfe";  
// const clt = new MongoClient(url);
// // clt.connect();
// // basededonnees = clt.collection("filtreData")
// MongoClient.connect(url, function(err, db) {  
// if (err) throw err;  
// var query = { planning_date: {$gte:Date("2022-04-01")}, $lt: Date("2022-02-28")};  
// db.collection("filtreData").find(query).toArray(function(err, res) {  
// if (err) throw err;  
// console.log(res);  
// db.close();  
// });  
// });