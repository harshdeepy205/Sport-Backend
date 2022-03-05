const mongoose = require('mongoose');

const slot=mongoose.Schema({
    user_id_admin:{
        type:String,
        required:true
    },
    slot_date:{
        type:String,
        required:true
    },
    slot_price:{
        type:String,
        required:true
    },
    slot_count:{
        type:String,
        required:true
    },
    slot_start_time:{
        type:String,
        required:true
    },
    slot_end_time:{
        type:String,
        required:true
    },
    slot_status:{
        type:String,
        required:true
    },
    slot_booked_by:{
        type:String,
        required:true
    }
})


mongoose.model('Slot',slot);