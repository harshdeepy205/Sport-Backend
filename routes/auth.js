const express = require("express");
const router = express.Router();
const fast2sms = require("fast-two-sms");
const mongoose = require("mongoose");
const cors = require("cors");
const UserDetails = mongoose.model("UserDetails");
const ClubDetails = mongoose.model("ClubDetails");
const NewUserDetails = mongoose.model("NewUserDetails");
const UserBooking = mongoose.model("UserBooking");
const Slot = mongoose.model("Slot");
const SportDetails = mongoose.model("SportDetails");
require("dotenv").config();

router.use(express.json({ extended: false }));

router.post("/userentry", (req, res) => {
  const { fname, lname, email, mobile } = req.body;

  if (!fname || !lname || !email || !mobile) {
    return res.status(422).json({ error: "Please Fill the details" });
  }

  UserDetails.findOne({ mobile: mobile }).then((saveduser) => {
    if (saveduser) {
      return res.status(422).json({ error: "User already exists" });
    }
    const details = new UserDetails({
      fname,
      lname,
      email,
      mobile,
    });

    details
      .save()
      .then((user) => {
        res.status(200).json({ message: "saved successfully" });
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  });
});

router.get("/userall", (req, res) => {
  UserDetails.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

router.get("/turfadminlogin/:mobileNo", (req, res) => {
  ClubDetails.findOne({ mobileNo: req.params.mobileNo })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/userinfo/:mobile", (req, res) => {
  console.log(req.params.mobile);
  UserDetails.find({ mobile: req.params.mobile })
    .then((result) => {
      res.json(result);
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/clubdetails", (req, res) => {
  const { name, image, address, banners, mobileNo, start_time, end_time } =
    req.body;

  if (!name || !image || !address || !mobileNo || !banners) {
    return res.status(422).json({ error: "Please Fill the details" });
  }

  ClubDetails.findOne({ name: name }).then((saveduser) => {
    if (saveduser) {
      return res.status(422).json({ error: "User already exists" });
    }
    const clubetails = new ClubDetails({
      name,
      image,
      address,
      mobileNo,
      banners,
      start_time,
      end_time,
    });

    clubetails
      .save()
      .then((user) => {
        res.status(200).json({ message: "saved successfully", details: user });
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  });
});

router.post("/sportDetails", (req, res) => {
  const { turfId, sportName, sportPrice } = req.body;
  const sportDetails = new SportDetails({
    turfId,
    sportName,
    sportPrice,
  });
  sportDetails
    .save()
    .then((user) => {
      res.status(200).json({ message: "saved successfully" });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

router.get("/getSportDetails/:id", (req, res) => {
  var id = req.params.id;
  SportDetails.find(
    {
      turfId: id,
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    }
  );
});

router.post("/userBooking", (req, res) => {
  const {
    fname,
    lname,
    email,
    userId,
    date,
    price,
    time,
    clubId,
    clubName,
    isPaymentDone,
    paymentMode,
    clubImage,
    sportName,
    razorpaySignature,
    slotId,
  } = req.body;
  const userBooking = new UserBooking({
    fname,
    lname,
    email,
    userId,
    date,
    price,
    time,
    clubId,
    clubName,
    isPaymentDone,
    paymentMode,
    clubImage,
    sportName,
    razorpaySignature,
    slotId,
  });
  userBooking
    .save()
    .then((user) => {
      res.status(200).json({ message: "saved successfully" });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

router.get("/getUserBooking/:id", (req, res) => {
  var id = req.params.id;
  UserBooking.find(
    {
      userId: id,
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    }
  );
});

router.post("/slots", (req, res) => {
  const {
    user_id_admin,
    slot_date,
    slot_price,
    slot_count,
    slot_start_time,
    slot_end_time,
    slot_status,
    slot_booked_by,
    sport_name,
  } = req.body;

  const slot = new Slot({
    user_id_admin,
    slot_date,
    slot_price,
    slot_count,
    slot_start_time,
    slot_end_time,
    slot_status,
    slot_booked_by,
    sport_name,
  });

  slot
    .save()
    .then((user) => {
      res.status(200).json({ message: "saved successfully" });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

router.get("/getavailableslots/:id/:date", (req, res) => {
  var id = req.params.id;
  var date = req.params.date;
  UserBooking.find(
    {
      clubId: id,
      date: date,
    },
    { _id: false, slotId: true },
    (err, data) => {
      if (err) {
        console.log(err, "err");
        return res.status(422).json({ error: error });
      }
      console.log(data, "data");
      res.status(200).json(data);
    }
  );
});

router.post("/checkuser", (req, res) => {
  const { mobile } = req.body;

  if (!mobile) {
    return res.status(422).json({ error: "Please Fill the details" });
  }

  UserDetails.findOne({ mobile: mobile }).then((saveduser) => {
    if (saveduser) {
      return res.status(200).json({ message: true });
    } else {
      return res.status(422).json({ message: false });
    }
  });
});

router.post("/sendmessage", async (req, res) => {
  console.log(req.body);
  const { message, number } = req.body;
  if (!message || !number) {
    return res.status(422).json({ error: "Please Fill the details" });
  }
  const response = { message: message, number: number };
  res.send(response);
  // const response = await fast2sms.sendMessage({
  //   authorization: process.env.API_KEY,
  //   message: req.body.message,
  //   numbers: [req.body.number],
  // });
  // res.send(response);
});

router.get("/getclubsinfo", (req, res) => {
  ClubDetails.find({}, (err, data) => {
    if (err) {
      console.log(err, "err");
      return res.status(422).json({ error: error });
    }
    res.status(200).json(data);
  });
});

router.get("/getuserinfo", (req, res) => {
  UserDetails.find({}, (err, data) => {
    if (err) {
      console.log(err, "err");
      return res.status(422).json({ error: error });
    }
    res.status(200).json(data);
  });
});

module.exports = router;
