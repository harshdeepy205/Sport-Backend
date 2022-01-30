const mongoose = require('mongoose');

const user=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
    }
})

mongoose.model('UserDetails',user);