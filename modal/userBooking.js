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
});

mongoose.model("UserBooking", userBooking);
