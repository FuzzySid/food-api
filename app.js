const express=require('express');
const app=express();
const mongoose=require('mongoose');

//Middleware for parsing incoming requests body
const bodyParser=require('body-parser');

//Funnel all requests through this middleware
const morgan=require('morgan');

const orderRoutes=require('./api/routes/orders');
const itemRoutes=require('./api/routes/item');

//connecting to database 
// mongoose.connect('mongodb+srv:fuzzy_sid:'+process.env.MONGO_ATLAS_PWD+'@fuzzy-rest-food-h67r3.mongodb.net/test?retryWrites=true&w=majority',{
//     // useMongoClient:true,
//     useNewUrlParser: true 
// });
// mongoose.Promise=Promise;
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://fuzzy_sid:PYZBaBSeAJr2wKkz@fuzzy-rest-food-h67r3.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
mongoose.set('debug',true);
mongoose.connect('mongodb://localhost/food-db');
mongoose.Promise=Promise;


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

//Middleware to funnel every request for cors handling
app.use((req,res,nxt)=>{
    //give access to any client
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methds','PUT','POST','PATCH','DELETE','GET');
        return res.status(200).json({});
    }
    nxt();
})


//Middleware for all incoming requests
app.use('/items',itemRoutes);
app.use('/orders',orderRoutes);

//handle every rewquest reaching this route and send error
app.use((req,res,nxt)=>{
    const err= new Error('Not found');
    err.status=404;
    nxt(err);
})

//handle all errors here
app.use((err,req,res,nxt)=>{
    res.status(err.status||500);
    res.json({
        error:{
            message: err.message
        }
    })
})
module.exports=app;