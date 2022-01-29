const express=require('express')
const router=express.Router()
const fast2sms=require('fast-two-sms')
const cors=require('cors')
require("dotenv").config();

router.use(express.json({ extended: false }));


router.post('/clubentry',(req,res)=>{
    const {name,image,rating}=req.body;
    const borrows=new BorrowersList({
        name,
        image,
        rating
    });
    borrows.save()
    .then(borrows=>{
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