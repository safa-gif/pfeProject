// const mongo = require ("mongodb").MongoClient;

// // Replace the uri string with your MongoDB deployment's connection string.
// const uri = "mongodb://localhost:27017";

// const client = new mongo(uri);
// // client.connect();
// // const database = client.db("pfe");
// // const movies = database.collection("filtreData");
// async function run() {
//   try {
//     await client.connect();

//     const database = client.db("pfe");
//     const movies = database.collection("filtreData");

//     // Estimate the total number of documents in the collection
//     // and print out the count.
//     const estimate = await movies.estimatedDocumentCount();
//     console.log(`Estimated number of documents in the filtreDataCollection collection: ${estimate}`);

//     // Query for movies from Canada.
//     // const query = {cmd_mois: 3}

//     // Find the number of documents that match the specified
//     // query, (i.e. with "Canada" as a value in the "countries" field)
//     // and print out the count.
//     const countSemaine = movies.find({}).limit(10);
//     res = []
//     for (let i = 0; i < countSemaine; i++) {
//       res = countSemaine[i];
//       console.log(res);
//     }
//     // const countSemaine = await movies.find().sort({planning_date: 1}).limit(10);
//     // res = []
//     // for (let i = 0; i < countSemaine; i++) {
//     //   res = countSemaine[i];
//     //   console.log(res);
//     // }
//     // console.log(`Number of commandes in march: ${countSemaine}`);
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);
// // async function calculfiltrer() 
// const mongo = require ("mongodb").MongoClient;
// // Replace the uri string with your MongoDB deployment's connection string.
// const uri = "mongodb://localhost:27017";

// const client = new mongo(uri);
// client.connect();
// const base = client.db("pfe");
// const cmd = base.collection("filtreData");
// async function donneFilter() {
//    try{
//     base.cmd.aggregate([
//       {"$project" : 
//       {
//          "$count" : { item_name}
//       }
//      }
//  ])
//    }
//    catch(err){

//    }

// }
// donneFilter();


var http= require("http");
var MongoClient = require('mongodb').MongoClient;  
var url = "mongodb://localhost:27017/pfe";  
const clt = new MongoClient(url);
// clt.connect();
// basededonnees = clt.collection("filtreData")
MongoClient.connect(url, function(err, db) {  
if (err) throw err;  
var query = { planning_date: {$gte:Date("2022-04-01")}, $lt: Date("2022-02-28")};  
db.collection("filtreData").find(query).toArray(function(err, res) {  
if (err) throw err;  
console.log(res);  
db.close();  
});  
});