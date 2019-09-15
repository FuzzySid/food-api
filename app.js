const express=require('express');
const app=express();

const itemRoutes=require('./api/routes/item');

//Middleware for all incoming requests
app.use('/items',itemRoutes);

module.exports=app;