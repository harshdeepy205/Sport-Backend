const express=require('express')
const router=express.Router()
const fast2sms=require('fast-two-sms')
const mongoose=require('mongoose')
const cors=require('cors')
const UserDetails=mongoose.model('UserDetails')
const ClubDetails=mongoose.model('ClubDetails')
const NewUserDetails=mongoose.model('NewUserDetails')

require("dotenv").config();

router.use(express.json({ extended: false }));



router.post('/userentry',(req,res)=>{
    const {fname,lname,email,mobile}=req.body;

    if (!fname || !lname || !email || !mobile) {
        return res.status(422).json({ error: "Please Fill the details" })
    }

    UserDetails.findOne({mobile:mobile})
        .then((saveduser)=>{
            if(saveduser){
                return res.status(422).json({error:"User already exists"})
            }
            const details=new UserDetails({
                fname,
                lname,
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


router.get('/userall',(req,res)=>{

    UserDetails.find({ },(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(data);
        }
    })
        
})


router.get('/userinfo/:mobile', (req, res) => {
    console.log(req.params.mobile);
    UserDetails.find({ mobile: req.params.mobile }, (err, data) => {
        if (err) {
            console.log(err);
        }
        console.log("data", data)
    })
        .then((result) => {
            res.json(result)
            console.log(result)
        })
        .catch(err => {
            console.log(err);
        })
})



router.post('/clubdetails',(req,res)=>{
    const {name,image,address, sports,banners}=req.body;

    if (!name || !image || !address || !sports || !banners) {
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
                banners
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


router.post('/checkuser',(req,res)=>{
    const {mobile}=req.body;

    if (!mobile) {
        return res.status(422).json({ error: "Please Fill the details" })
    }

    UserDetails.findOne({mobile:mobile})
        .then((saveduser)=>{
            if(saveduser){
                return res.status(200).json({message:true})
            }
            else{
                return res.status(422).json({message:false})
            }
        })
})


router.post('/sendmessage',async (req,res)=>{
    console.log(req.body)
    const {message,number } = req.body
    if (!message || !number) {
        return res.status(422).json({ error: "Please Fill the details" })
    }
    // const response= ({message:message,number:number})
    // res.send(response)
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



// router.post('/userentry2',(req,res)=>{
//     const {fname,lname,email,mobile,otp,time}=req.body;

//     NewUserDetails.findOne({mobile:mobile})
//         .then((saveduser)=>{
//             if(saveduser){
//                 NewUserDetails.updateOne({mobile:mobile},
//                     {
//                     fname:fname,
//                     lname:lname,
//                     email:email,
//                     otp:otp,
//                     time:time
//                 })
//                 .then(() => {
//                     res.json({ message: "Restaurant updated successfully" })
//                 }).catch(err => {
//                     console.log(err);
//                 })
//             }
//             const details=new NewUserDetails({
//                 fname,
//                 lname,
//                 email,
//                 mobile,
//                 otp,
//                 time:Date.now()
//             });

//             details.save()
//             .then(user=>{
//                 res.status(200).json({message:"saved successfully"})
//             })
//             .catch(err=>{
//                 console.log(err)
//                 res.status(400).json({error:err})
//             })
//         })
// })



module.exports=router