const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// importing api routes
const pasteurRoute = require('./api/route/pasteur-route');
const userRoute  = require('./api/route/user-route');
const paysRoute = require('./api/route/pays-route');
const villeRoute = require('./api/route/commun-route');
const quartierRoute = require('./api/route/quartier-route');
const programRoute = require('./api/route/program-route');
const categoryRoute = require('./api/route/category-route');
const egliseRoute = require('./api/route/eglise-route');


const app = express();

// Locale database
/*
mongoose.connect('mongodb://localhost/church',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
});

*/

// Atlas database
mongoose.connect('mongodb+srv://eservice:admin@cluster0-jotbb.mongodb.net/church?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

app.disable('etag');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res, next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    next();
});



// Defining urls for endpoints(resources) to be access by any request
app.use("/api/church/v-1/users",userRoute);
app.use("/api/church/v-1/pasteurs",pasteurRoute);
app.use("/api/church/v-1/eglises",egliseRoute);
app.use("/api/church/v-1/pays",paysRoute);
app.use("/api/church/v-1/villes",villeRoute);
app.use("/api/church/v-1/quartiers",quartierRoute);
app.use("/api/church/v-1/programs",programRoute);
app.use("/api/church/v-1/categories",categoryRoute);



// Error to be returned in case any happens
app.use((req,res,next)=>{
    const error = new Error("Not found");
    error.stack=404;
    next(error);
});

// Error to be returned in case anything happens
app.use((req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});

// Exporting the app module for external usage
module.exports = app;
