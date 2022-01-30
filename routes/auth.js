const express=require('express')
const router=express.Router()
const fast2sms=require('fast-two-sms')
const mongoose=require('mongoose')
const cors=require('cors')
const UserDetails=mongoose.model('UserDetails')
const ClubDetails=mongoose.model('ClubDetails')

require("dotenv").config();

router.use(express.json({ extended: false }));


router.post('/clubentry',(req,res)=>{
    const {name,image,rating}=req.body;
    const borrows=new ClubDetails({
        name,
        image,
        rating
    });
    clubdetails.save()
    .then(details=>{
        res.status(200).json({message:"saved successfully"})
    })
    .catch(err=>{
        res.status(400).json({error:err})
    })
})

router.post('/user-entry',(req,res)=>{
    const {name,email,mobile}=req.body;
    const details=new UserDetails({
        name,
        email,
        mobile
    });
    details.save()
    .then(user=>{
        res.status(200).json({message:"saved successfully"})
    })
    .catch(err=>{
        res.status(400).json({error:err})
    })
})


router.post('/sendmessage',async (req,res)=>{
    console.log(req.body)
   const response=await fast2sms.sendMessage({authorization:process.env.API_KEY,message:req.body.message,numbers:[req.body.number]})
    res.send(response)
})

module.exports=router