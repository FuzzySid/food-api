const express=require('express');
const router=express.Router();


//handle incoming GET requests on an order
router.get('/',(req,res,nxt)=>{
    res.status(200).json({
        message: "Orders were fetched"
    })
})

router.post('/',(req,res,nxt)=>{
    res.status(200).json({
        message: "Added a new order"
    })
})

router.get('/:orderId',(req,res,nxt)=>{
    res.status(200).json({
        message: "Got the order wohoo",
        id: req.params.orderId
    })
})

router.delete('/:orderId',(req,res,nxt)=>{
    res.status(200).json({
        message: "Order deleted!"
    })
})

module.exports=router;