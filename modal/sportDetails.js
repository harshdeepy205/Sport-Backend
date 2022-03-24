const mongoose = require("mongoose");

const sportDetails = mongoose.Schema({
  turfId: {
    type: String,
    required: true,
  },
  sportName: {
    type: String,
    required: true,
  },
  sportPrice: {
    type: String,
    required: true,
  },
});

mongoose.model("SportDetails", sportDetails);
