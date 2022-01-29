const mongoose = require('mongoose');

const clubDetails=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    }
})

mongoose.model('ClubDetails',clubDetails);