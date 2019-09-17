const express=require('express');
//subpackage with express to handle routes
const router=express.Router();
//register different routes using the router

//import the models and schema of item
const Item=require('../models/item');

const mongoose=require('mongoose');

//handle incoming get requests
router.get('/',(req,res,nxt)=>{
    res.status(200).json({
        message: "Handing GET reqests to /items"
    })
});

//handle incoming post requests
router.post('/',(req,res,nxt)=>{
   
    const item=new Item({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price:req.body.price
    });
    item
    .save()
    .then(res=>{
        console.log(res);
    })
    .catch(err=>{
        console.log(err);
    })
    res.status(201).json({
        message: "Handling POST requests to /items",
        createdItem: item
    })
});

router.get('/:itemId',(req,res,nxt)=>{
    const id=req.params.itemId;
    console.log(1);
   Item.findById(id)

   .exec()
   .then(data=>{
       console.log(2);
       console.log(data);
       res.status(200).json(data);
   })
   .catch(err=>{
       console.log(err);
       res.status(500).json({
           error:err
       })
   
   })
      
})



router.patch('/:itemId',(req,res,nxt)=>{
    res.status(200).json({
        message:"Item updated!"
    })

})

router.delete('/:itemId',(req,res,nxt)=>{
    res.status(200).json({
        message: 'Deleted item'
    })
})
module.exports=router;