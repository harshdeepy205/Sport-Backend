require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require('crypto');
const router = express.Router();
const mongoose = require('mongoose');


const PaymentDetailsSchema = mongoose.Schema({
    razorpayDetails: {
      orderId: String,
      paymentId: String,
      signature: String,
    },
    success: Boolean,
  });
  
  const PaymentDetails = mongoose.model('PatmentDetail', PaymentDetailsSchema);



router.post("/orders", async (req, res) => {
    console.log("test")

    const{amount,cludId,userId}=req.body
    try {
        console.log("try")
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = {
            amount: amount*100, 
            currency: "INR",
            receipt: "receipt_order_74394",
        };
        // console.log(options,"options")
        const order = await instance.orders.create(options);
        // console.log(order,"before if")
        if (!order) return res.status(500).send("Some error occured");
        // console.log(order,"after if")
        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.post("/success", async (req, res) => {
    try {
       
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

        console.log(razorpaySignature,"razorpaySignature")

        const shasum = crypto.createHmac("sha256", "ax4zcjxK4dHvQKI5aUxWebp1");
       
        console.log(shasum,"hash generated first")

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });
        
        const newPayment = PaymentDetails({
            razorpayDetails: {
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
            signature: razorpaySignature,
            },
            success: true,
        });
          
        await newPayment.save();
          
    
        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports = router;