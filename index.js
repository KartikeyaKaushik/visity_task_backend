// ------------ importing modues -------------- //
const express = require('express');
const app = express();
const router = express.Router;
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const port = process.env.PORT;
require('./database/db_connection.js');



// -------------- middlewares -------------- //
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', require('./routes/routes.js'));
app.use('/', router);

// server
app.listen(port, ()=>{console.log(`Server running at ${port}`)})

