const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose');
const {MONGOURI}=require('./key');


const app=express()
require("dotenv").config();

app.use(express.json({ extended: false }));
app.use(cors())

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',()=>{
    console.log("Connected With MongoDb")
})

mongoose.connection.on('error',(err)=>{
    console.log("Error in Connection",err)
})


app.use(express.json())
require('./modal/user')
require('./modal/club')

app.use("/payment", require("./routes/payment"));
app.use("/auth", require("./routes/auth"));

app.listen(5000,()=>{
    console.log("Server is started")
})