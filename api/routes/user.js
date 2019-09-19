const express=require('express')
const mongoose=require('mongoose');
const router=express.Router();
const User=require('../models/user');
const bcrypt=require('bcrypt');

router.post('/signUp',(req,res,nxt)=>{
    //create a new user
    User.find({email:req.body.email}).exec()
    .then(user=>{
        if(user.length>=1){
            return res.status(409).json({
                message:'Email already exists'
            })
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.json(500).json({
                        error:err
                    })
                }
                else{
                    const user=new User({
                        _id:new mongoose.Types.ObjectId(),
                        email:req.body.email,
                        password: hash
                });
                user.save()
                .then(result=>{
                    console.log(result);
                    res.status(201).json({
                        message:'User created'
                    })
                }).catch(err=>{
                    console.log(err);
                    res.status(500).json({
                        error:err
                    })
                })
            }
        })
        }
    })
    .catch();
    
});

router.delete('/:userId',(req,res,nxt)=>{
    User.remove({_id:req.params.userId})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'User deleted'
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

module.exports=router;