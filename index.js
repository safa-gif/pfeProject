const express = require('express');
const cors = require ("cors");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const  app = express();
const db = require('./database/db.config');
const path = require('path');
const DataRouter = require('./routes/dataroute');
const UserRouter = require ('./routes/userroute');
const EventRouter = require('./routes/eventroute');
const DateRouter =  require('./routes/dateroute');
const CmdRouter = require ('./routes/cmdroute');
const StockRouter = require ('./routes/stockroute');
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
app.use('/data',DataRouter);
app.use('/user',UserRouter);
app.use('/events',EventRouter);
app.use('/date', DateRouter);
app.use('/cmd', CmdRouter);
app.use('/stock', StockRouter);
//connect backend to frontend
app.use(cors({origin: "http://localhost:4200"}));
app.use(morgan("dev")); 
// configire morgan
const port =  process.env.port ||  2000;

//server listening on port
app.listen(port, (req, res) => {
    console.log(`Server is running and listening on http://localhost:${port} `)
})

