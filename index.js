const express = require('express');
const cors = require ("cors");
const bodyParser = require('body-parser');
const  app = express();
const db = require('./database/db.config');
const path = require('path');
const DataRouter = require('./routes/dataroute');
const UserRouter = require ('./routes/userroute')



//connecting to database
app.connect(db);

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
//using middelware that allows us to pass content
app.use(bodyParser.json());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//using apis 
app.use('/api/data',DataRouter);
app.use('/api/user',UserRouter);

//connect backend to frontend
app.use(cors({origin: "http://localhost:4200"}));
// app.get('/safa',  async(req, res, next)=> {
//     // const cursor = db.collection('filtreData').aggregate(
//     //   [
//     //               {
//     //                   "$match": {item_number: "Z64314M1"}
//     //               },
//     //               {
//     //                 "$count": "count"
//     //               },
//     //               {
//     //                   "$distinct" : "item_number"
//     //               }
//     //   ]
//     // )
//   })

const port =  process.env.port ||  2000;
//server listening on port
app.listen(port, (req, res) => {
    console.log(`Server is running and listening on http://localhost:${port} `)
})

