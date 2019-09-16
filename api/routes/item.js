const express=require('express');
//subpackage with express to handle routes
const router=express.Router();
//register different routes using the router

//handle incoming get requests
router.get('/',(req,res,nxt)=>{
    res.status(200).json({
        message: "Handing GET reqests to /items"
    })
});

//handle incoming post requests
router.post('/',(req,res,nxt)=>{
    res.status(200).json({
        message: "Handline POST requests to /items"
    })
});

router.get('/:itemId',(req,res,nxt)=>{
    const id=req.params.itemId;
    if(id==='special'){
        res.status(200).json({
            message: "Works like a charms",
            id: id
        })
    
    }
    else{
        res.status(200).json({
            message:"You passed an Id"
        })
    }
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