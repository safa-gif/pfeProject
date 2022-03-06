// const db = require('../database/db.config');
// const express = require ('express');
// const router= express.Router();
// const app = express()
// app.get('/safa', (req, res, next)=> {
//   const cursor = db.collection('filtreData').aggregate(
//     [
//                 {
//                     "$match": {item_number: "Z64314M1"}
//                 },
//                 {
//                   "$count": "count"
//                 },
//                 {
//                     "$distinct" : "item_number"
//                 }
//     ],
     
//   )
//   .then(
//       res.send(data=>res.json({docs}))
//   )
//   .catch(error => {
//       res.send(error.message)
//   })
// })

// // while (await cursor.hasNext()) {
// //     const doc = await cursor.next();
// //     // do whatever, ex.
// //     console.log(doc);
// //   };
// // const cursor = db.collection('filtreData').aggregate(
// //     [
// //         {
// //             "$match": {item_number: "Z64314M1"}
// //         },
// //         {
// //           "$count": "count"
// //         },
// //         {
// //             "$distinct" : "item_number"
// //         }
// //     ]
// //     // {
// //     //     "allowDiskUse": false
// //     // }
// // )
// // for (let doc = await cursor.next(); doc; doc = await cursor.next()) {
// //     // Process the document.
// //     console.log('aggregate:', doc.count);
// // }

// // for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
// //     console.log('aggregate:', doc.count);
// // }