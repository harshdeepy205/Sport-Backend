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
    address:{
        type:String,
        required:true
    },
    sports:{
        type:Array,
        required:true
    },
    clubImages:{
        type:Array,
        required:true
    }
})

mongoose.model('ClubDetails',clubDetails);