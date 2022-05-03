const express = require('express');
const cors = require ("cors");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const  app = express();
const db = require('./database/db.config');
const path = require('path');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');



//Using routes
const Account = require('./routes/accountroute');
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

//using middelware that parses incoming JSON requests and puts the parsed data in req.body
app.use(bodyParser.json());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === "JWT") {
        jwt.verify(req.headers.authorization.split(' ')[1], "Authentication", (err, decode) => {
            if (err) req.account = undefined;
            req.account = decode;
            next();
        })
    } else {
        req.account = undefined;
        next();
    }
})
app.use(helmet());



//using apis 
app.use('/data',DataRouter);
app.use('/user',UserRouter);
app.use('/events',EventRouter);
app.use('/date', DateRouter);
app.use('/cmd', CmdRouter);
app.use('/stock', StockRouter);
app.use('/account', Account);
//connect backend to frontend
// app.use(cors({origin: "http://localhost:4200"}));
app.use(morgan("dev")); 

// configire morgan
const port =  process.env.port ||  2000;

//app listening on port
app.listen(port, (req, res) => {
    console.log(`app is running and listening on http://localhost:${port} `)
})

