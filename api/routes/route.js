const router=require("express").Router();
const User= require("../models/User.js")
const Fav= require("../models/Fav.js")
const Otp= require("../models/Otp.js")
const bcrypt=require('bcrypt');
const jwt = require("jsonwebtoken")
const jwtKey = "my_secret_key"
const jwtExpirySeconds =24*3600
const jwt_decode = require('jwt-decode');
const validator = require("email-validator");
const nodemailer=require("nodemailer");
const dotenv=require("dotenv");
const e = require("express");

var minm = 100000;
var maxm = 999999;


router.post('/signup', async(req,res)=>{
    const {username,email,password}= req.body;
    try{
        const email_genuine= validator.validate(email)
        if(!email_genuine)  throw Error("Not a valid email");
        if(password.length<6) throw Error("Minimum password length should be 6");
        const hash = bcrypt.hashSync(password, 10);
        const newUser= await User.create({username:username, email:email, password:hash});
        console.log("New user created!")
        res.status(201).send("New user created!"); 
    }catch(err){  
        if(err.message.includes("E11000 duplicate key error collection")){
            console.log("Username, email, passwd should be unique");
            res.status(400).send("Username, email, passwd should be unique");
        }
        res.status(400).send(err.message);
    }
});

router.post('/login',async(req,res)=> {
    const {username,password}= req.body;
    try {
      if(password.length<6) throw Error("Minimum password length should be 6");

      const user = await User.findOne({ username: req.body.username });
      if (!user) throw Error('username doesnot exist');
      
      const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
      if (!isPasswordCorrect) throw Error('Wrong password!!');

      
        var token = jwt.sign({ username: req.body,username, email:user.email }, process.env.JWT_KEY);
        // console.log(token);
      
      res.status(200).json({username:username, email:user.email, jwt: token});
    } 
    catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);
    }
});

router.post('/verify',async(req,res)=> {
    console.log("Verify API HITTED");
    var token = req.body.jwt.slice(1,-1);
    var username= req.body.username;
    var email= req.body.email;
    
    try {
        if (!token) throw Error("No token. Logging you out now!");
        var payload = jwt.verify(token, process.env.JWT_KEY)
        try {
            if(username!=payload.username || email!=payload.email) throw Error("UNATHORIZED!");
            res.status(200).json("Authorised");
          } 
        catch (err) {
            res.status(400).json(err.message);
        }
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			return res.status(401).json("Invalid token")
		}
		return res.status(400).json("Invalid token")
	}
});

router.post('/favs', async(req,res)=>{
    try {
        const all_consumer_nos = await Fav.find({ username: req.body.username });
        // console.log(all_consumer_nos)
        res.status(200).json(all_consumer_nos);
      }  
    catch (err) {
        res.status(400).json(err);
    }
});

router.post('/favs/add', async(req,res)=>{
    try {
        if((req.body.cons_no).length!=12) throw Error("Consumer no should be 12 digits long.")
        const all_consumer_nos = await Fav.find({ username: req.body.username });
        const len=all_consumer_nos.length
        if(len>=10) throw Error("Cannot add more favourites. Delete some.")
        for(i=0;i<len;i++){
            if(all_consumer_nos[i].cons_no===req.body.cons_no) throw Error("Already added!")
        }
        const newfav= await Fav.create({username:req.body.username, cons_no:req.body.cons_no});
        res.status(200).json("newfav added");
      } 
    catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);
    }
});

router.post('/favs/delete', async(req,res)=>{
    try {
        const deleted = await Fav.deleteOne({ username: req.body.username, cons_no: req.body.cons_no });
        console.log("deleted Successs");
        res.status(200).json("deleted Successs");
      } 
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

//generate otp and send email
router.post('/generateotp', async(req,res)=>{
    try {
        const user = await User.findOne({ email: req.body.email});
        if(!user) throw Error("Email don't exist!.")
        const otpreceived= Math.floor(Math.random() * (maxm - minm + 1)) + minm;
        
        try{
            const query = { email: req.body.email };
            const update = { $set: { email:req.body.email, otp:otpreceived }};
            const options = { upsert: true };
            const newOTP= await Otp.updateOne(query, update, options);
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: process.env.USERMAIL,
                  pass: process.env.MAILPSWD
                }
              });
              
              var mailOptions = {
                from: process.env.USERMAIL,
                to: req.body.email,
                subject: 'PASSWORD RESET FROM APDCL CLONE',
                text: otpreceived.toString()
              };
    
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } 
                else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).json("otp sent");
                }
              });
            res.status(200).send("OTP sent to your mail.");
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err.message);
        }
      } 
    catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.post('/setnewpassword', async(req,res)=>{
    try {
        console.log("Api hitted")
        const {otp,email,password}= req.body;

        const  otpdoc= await Otp.findOne({ email: req.body.email});
        // console.log(otpdoc)
        if(otp!=otpdoc.otp) throw Error("OTP don't match");
        else if(password.length<6) throw Error("Minimum password length should be 6");
        else{
            const hash = bcrypt.hashSync(password, 10);
            const user = await User.findOne({ email: req.body.email});
            if(user){
                try{
                    const updatedUser= await User.findByIdAndUpdate(
                        user._id,
                        {
                            $set:{
                                username:user.username,
                                email:user.email,
                                password:hash
                            }
                        },
                        {new:true}
                    ); 
                    res.status(201).json("Password changed success!");
                }catch(err){
                    res.status(500).json(err);  
                }
            }
        }
      } 
    catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
});

module.exports=router;

