const mongoose = require("mongoose");

const userBooking = mongoose.Schema({
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  email: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  clubId: {
    type: String,
    required: true,
  },
  clubName: {
    type: String,
    required: true,
  },
  isPaymentDone: {
    type: Boolean,
    required: true,
  },
  paymentMode: {
    type: String,
    required: true,
  },
  clubImage: {
    type: String,
    required: true,
  },
  sportName: {
    type: String,
    required: true,
  },
  razorpaySignature:{
    type:String,
  }

});

mongoose.model("UserBooking", userBooking);
