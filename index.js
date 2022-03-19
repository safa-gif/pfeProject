const express = require('express');
const cors = require ("cors");
const bodyParser = require('body-parser');
const  app = express();
const db = require('./database/db.config');
const path = require('path');
const DataRouter = require('./routes/dataroute');
const UserRouter = require ('./routes/userroute');
const FuncRouter = require('./routes/functionroute');

//connecting to database
app.connect(db);

//using cors for middlewares
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.urlencoded({extended: true}));

//using middelware that allows us to pass content
app.use(bodyParser.json());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//using apis 
app.use('/api/data',DataRouter);
app.use('/api/user',UserRouter);
app.use('/api/funct', FuncRouter)
//connect backend to frontend
app.use(cors({origin: "http://localhost:4200"}));

const port =  process.env.port ||  2000;

//server listening on port
app.listen(port, (req, res) => {
    console.log(`Server is running and listening on http://localhost:${port} `)
})

