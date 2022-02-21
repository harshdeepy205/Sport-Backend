const express=require('express')
const router=express.Router()
const fast2sms=require('fast-two-sms')
const mongoose=require('mongoose')
const cors=require('cors')
const UserDetails=mongoose.model('UserDetails')
const ClubDetails=mongoose.model('ClubDetails')

require("dotenv").config();

router.use(express.json({ extended: false }));



router.post('/userentry',(req,res)=>{
    const {name,email,mobile}=req.body;

    if (!name || !email || !mobile) {
        return res.status(422).json({ error: "Please Fill the details" })
    }

    UserDetails.findOne({mobile:mobile})
        .then((saveduser)=>{
            if(saveduser){
                return res.status(422).json({error:"User already exists"})
            }
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
   
   
})


router.post('/clubdetails',(req,res)=>{
    const {name,image,address, sports,clubImages}=req.body;

    if (!name || !image || !address || !sports || !clubImages) {
        return res.status(422).json({ error: "Please Fill the details" })
    }

    ClubDetails.findOne({name:name})
        .then((saveduser)=>{
            if(saveduser){
                return res.status(422).json({error:"User already exists"})
            }
            const clubetails=new ClubDetails({
                name,
                image,
                address,
                sports,
                clubImages
            });

            clubetails.save()
            .then(user=>{
                res.status(200).json({message:"saved successfully"})
            })
            .catch(err=>{
                res.status(400).json({error:err})
            })
        })
   
   
})

router.post('/sendmessage',async (req,res)=>{
    console.log(req.body)
    const {message,number } = req.body
    if (!message || !number) {
        return res.status(422).json({ error: "Please Fill the details" })
    }
    const response=await fast2sms.sendMessage({authorization:process.env.API_KEY,message:req.body.message,numbers:[req.body.number]})
    res.send(response)
})

router.get('/getclubsinfo', (req, res) => {
    ClubDetails.find({ }, (err, data) => {
        if (err) {
            console.log(err,"err");
            return res.status(422).json({ error: error })
        }
        res.status(200).json(data)
    })
})


router.get('/getuserinfo', (req, res) => {
    UserDetails.find({ }, (err, data) => {
        if (err) {
            console.log(err,"err");
            return res.status(422).json({ error: error })
        }
        res.status(200).json(data)
    })
})




module.exports=router