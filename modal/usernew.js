const mongoose = require('mongoose');

const usernew=mongoose.Schema({
    
    fname:{
        type:String,
    },
    lname:{
        type:String,
    },
    email:{
        type:String,
    },
    mobile:{
        type:String,
    },
    otp:{
        type:String,
    },
    time:{
        type:String
    }
})


mongoose.model("NewUserDetails",usernew);