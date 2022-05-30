//importing dependencies
const express = require('express');

const cors = require ("cors");

const morgan = require("morgan");

const bodyParser = require('body-parser');

const  app = express();

const path = require('path')

//getting database configuration database 
const db = require('./database/db.config');


//Using routes
const UserRouter = require ('./routes/userroute');

const EventRouter = require('./routes/eventroute');

const DimRouter = require('./routes/datedimroute');

const CmdRouter = require ('./routes/cmdroute');

const StockRouter = require ('./routes/stockroute');

const PDPRouter = require ('./routes/pdproute');

//connecting to database
app.connect(db);

//using cors for middlewares
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.urlencoded({extended: true}));


//using middelware that parses incoming JSON requests and puts the parsed data in req.body
app.use(bodyParser.json());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));


//using apis 
app.use('/user',UserRouter);

app.use('/events',EventRouter);

app.use('/cmd', CmdRouter);

app.use('/dim',DimRouter);

app.use('/stock', StockRouter);

app.use('/pdp', PDPRouter);

app.use((req, res, next) => {
    //res.setHeader('Access-Control-Allow-Origin', 'https://cdpn.io')
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})
//connect backend to frontend
app.use(cors({origin: "http://localhost:4200"}));
app.use(morgan("dev")); 

// configuring  morgan
const port =  process.env.port ||  2000;

//app listening on port
app.listen(port, (req, res) => {
    console.log(`app is running and listening on http://localhost:${port} `)
})

