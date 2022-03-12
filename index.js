const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { MONGOURI } = require("./key");
const myParser = require("body-parser");

const app = express();
require("dotenv").config();

app.use(express.json({ extended: false }));
app.use(cors());
// app.use(express.bodyParser({limit: '10mb'}));
app.use(myParser.text({ limit: "200mb" }));

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected With MongoDb");
});

mongoose.connection.on("error", (err) => {
  console.log("Error in Connection", err);
});

app.use(express.json());
require("./modal/user");
require("./modal/club");
require("./modal/slot");
require("./modal/userBooking");
require("./modal/sportDetails");

app.use("/payment", require("./routes/payment"));
app.use("/auth", require("./routes/auth"));

app.listen(5000, () => {
  console.log("Server is started");
});
