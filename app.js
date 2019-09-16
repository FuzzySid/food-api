const express=require('express');
const app=express();

const orderRoutes=require('./api/routes/orders');
const itemRoutes=require('./api/routes/item');

//Middleware for all incoming requests
app.use('/items',itemRoutes);
app.use('/orders',orderRoutes);

module.exports=app;