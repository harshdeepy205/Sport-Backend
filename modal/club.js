const mongoose = require("mongoose");

const clubDetails = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  start_time: {
    type: String,
    required: true,
  },
  end_time: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  banners: {
    type: Array,
    required: true,
  },
});

mongoose.model("ClubDetails", clubDetails);
