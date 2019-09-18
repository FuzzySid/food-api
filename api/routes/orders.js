const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Order=require('../models/orders');
const Item=require('../models/item');

//handle incoming GET requests on an order
router.get('/',(req,res,nxt)=>{
   Order.find()
   .select('item quanity _id')
   .exec()
   .then(data=>{
       res.status(200).json({
           count: data.length,
           orders: data.map(d=>{
               return{
                   _id:d._id,
                   item:d.item,
                   quanity:d.quanity,
                   request:{
                       type:'GET',
                       url: 'http://localhost:3000/orders/'+d._id
                   }
               }
           })
           
       })
   })
   .catch(err=>{
       res.status(500).json({
           error:err
       })
   })
})

router.post('/',(req,res,nxt)=>{
    //check for creating orders for only existing items
    Item.findByIdAndDelete(req.body.itemId)
    .then(item=>{
        if(!item){
            res.status(404).json({
                message:'Item not found'
            })
        }
        const order= new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            item: req.body.itemId
        })
        return order
        .save()
    })
         //.exec()
        .then(result=>{
            console.log(result)
            res.status(201).json({
                message: "order saved!",
                createdOrder:{
                    _id:result._id,
                    item:result.item,
                    quantity:result.quanity
                },
                request:{
                    type: 'GET',
                    url: 'http://localhost:3000/orders/'+result._id
                }
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        })
        
})

   


router.get('/:orderId',(req,res,nxt)=>{
    Order.findById(req.params.orderId)
    .exec()
    .then(order=>{
        if(!order){
            return res.status(404).json({
                message:'Order not found'
            })
        }
        res.status(200).json({
            order: order,
            request:{
                type:'GET',
                url:'http://localhost:3000/orders'
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
    // res.status(200).json({
    //     message: "Got the order wohoo",
    //     id: req.params.orderId
    // })
})

router.delete('/:orderId',(req,res,nxt)=>{
    Order.remove({_id:req.params.orderId})
    .exec()
    .then(result=>{
        res.status(200).json({
        message: 'Order deleted successfully',
        request:{
            type:'GET',
            url:'http://localhost:3000/orders',
            body:{itemId:'ID',quanity:'Number'}
        }
    })
})
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
    // res.status(200).json({
    //     message: "Order deleted!"
    // })
})

module.exports=router;