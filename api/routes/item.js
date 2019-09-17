const express=require('express');
//subpackage with express to handle routes
const router=express.Router();
//register different routes using the router

//import the models and schema of item
const Item=require('../models/item');

const mongoose=require('mongoose');

//handle incoming get requests
router.get('/',(req,res,nxt)=>{
   Item.find()
   //filtering the data you want to fetch
   .select('name price _id')
   .exec()
   .then(data=>{
       const response={
           count: data.length,
           items: data.map(d=>{
               return {
                   name: d.name,
                   price: d.price,
                   _id: d._id,
                   request:{
                       type: 'GET',
                       url: 'https://localhost:3000/items/'+d._id
                   }
               }
           })
       }
       //console.log(data);
       res.status(200).json(response)
   })
   .catch(err=>{
       console.log(err);
       res.status(500).json({
           error:err
       })
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
    .then(result=>{
        console.log(result);
        res.status(201).json({
            message: "Created a new Item!",
            createdItem: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: 'https://localhost:3000'+result._id
                }
            }
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
    
});

router.get('/:itemId',(req,res,nxt)=>{
    const id=req.params.itemId;
    //console.log(1);
   Item.findById(id)
   .select('name price _id')
   .exec()
   .then(data=>{
       //console.log(2);
       console.log(data);
       if(data)
       res.status(200).json({
           item: data,
           request:{
               type: 'GET',
               description: 'GET all items',
               url: 'http://localhost:3000/items'
           }
       });
       else
       res.status(404).json({
           message:'Invalid'
       })
   })
   .catch(err=>{
       console.log(err);
       res.status(500).json({
           error:err
       })
   
   })
      
})



router.patch('/:itemId',(req,res,nxt)=>{
    const id=req.params.itemId;
    const updateOp={};
    for(let ops of req.body){
        updateOp[ops.propName]=ops.value;
    }
    Item.update({_id:id},{$set:updateOp})
    .exec()
    .then(resut=>{
        console.log(result);
        res.status(200).json({
            messgae: 'Item updated',
            request: {
                type: 'GET',
                url: 'http://localhost/items/'+ id
            }
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
    res.status(200).json({
        message:"Item updated!"
    })

})

router.delete('/:itemId',(req,res,nxt)=>{
    const id=req.params.itemId;
    Item.remove({_id: id})
    .exec()
    .then(result=>{
        result.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
    res.status(200).json({
        message: 'Deleted item'
    })
})
module.exports=router;