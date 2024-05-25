const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer')
const signupmodel = require('../models/signupschema');
const laptopmodel = require('../models/laptopschema');
const { error } = require('console');
const app = express();
router.use(cors());
//Signup api
router.post('/register' , async(req , res)=>{
    const b = req.body;
    console.log('b' , b)
    signupmodel.create(b)
    .then((user)=>res.json(user))
    .catch((error)=>{
         console.log('Error in signup' , error)
         res.status(500).json({success: false, error: 'Internal server error'})
    });
});
//Login api
router.post('/login' , (req,res)=>{
    const{email , password} = req.body
    signupmodel.findOne({email:email})
    .then((user)=>{
        if(user)
        {
            if(user.password === password)
            {
                res.status(200).json({success:true , massage:"Login successfull"})
            }else{
                console.log("Password is incorrect");
                res.status(401).json({success:false , massage:"incorrect password"})
            }
        }else{
                console.log("No record exist")
                res.status(404).json({success:false , massage:"User Not Found"})
        }
    }).catch((error)=>{
        console.log("Error in login in backened" , error);
        res.status(500).json({success:false , massage:"Interval server error"})
    })
})
//laptop api
const upload = multer({
    storage : multer.diskStorage({
        destination : function(req , file , cb)
        {
            console.log("API hit")
            cb(null ,path.resolve( __dirname,'../public/laptopimages'))
        },
        filename : function(req , file ,cb)
        {
            console.log(file.filename)
            cb(null , Date.now() + "-" + file.originalname)
        }
    })
})
router.post('/multer' , upload.single("file-upload") , (req,res)=>{
    try{
         if(!req.file)
         {
            throw new Error("No File Upload")
         }
         res.json({status:1 , name : req.file.filename})
    }catch(error)
    {
           res.send({status: -1 , massage : error.massage})
    }
})
router.post('/laptop' , async(req,res)=>{
    try{
           console.log(req.body)
           const b = req.body
           const laptop =new laptopmodel(b)
           await laptop.save()
           res.json({success:true , massage:"data save successfully"})
    }catch(error)
    {
         console.log("Error in insert data" , error)
         res.status(500).json({success:false , error:"Internal server error"})
    }

})
router.get('/laptopfetch' , async(req,res)=>{
    try{
        const laptop = await laptopmodel.find();
        res.status(200).json(laptop)
    }catch(error)
    {
        console.log("Error in fetching data" , error)
        res.status(500).json({success:false , error : "Internal server error"})
    }
})
router.get('/laptopfetch/:id' , async(req,res)=>{
    const laptopId = req.params.id
    try{
          const laptop = await laptopmodel.findById(laptopId)
          if(!laptop)
          {
            return res.status(404).json({success:false , error:"Laptop Not found"})
          }
          res.status(200).json(laptop)
    }catch(error)
    {
        console.log("error in fetch update" , error)
        res.status(500).json({success:false , error : "Interval server error"})
    }
})
router.delete("/laptopdelete/:id" , async(req , res)=>{
    
       const laptopId = req.params.id
       try{
        
             const deletelaptop = await laptopmodel.findByIdAndDelete(laptopId);
             if(!deletelaptop)
             {
                return res.status(404).json({success:false , error : "Record Not found"})
             }
             res.status(200).json({success:true , massage:"Recored deleted successfully"});
       }catch(error)
       {
        console.log("Error deleteing record" , error)
        res.status(500).json({ success: false, error: "Internal server error" });
       }
})
router.put("/laptopupdate/:id" ,upload.single("image") ,async(req,res)=>{
               const laptopId = req.params.id
               try{
                      const{laptopname,laptopcompany,laptopprice, condition} = req.body
                      const imagepath = req.file ? req.file.filename:null;
                      const updatelaptop = await laptopmodel.findByIdAndUpdate(laptopId,{
                        laptopname,laptopcompany,laptopprice, condition,
                        image:imagepath 
                      },{new:true})
                      if(!updatelaptop)
                      {
                        return res.status(404).json({success:false , error:"Record not found"})
                      }

                      res.status(200).json({success:true , massage:"Data updated successfully"})
               }catch(error)
               {
                   console.log("Error in updating" , error)
                   res.status(500).json({success:false , error:"Internal server error"})
               }
})
router.post('/laptopmail' , (req,res)=>{
    const{email , address} = req.body
    try{
         const transporter = nodemailer.createTransport({
            service : "gmail" , 
            auth :{
                user :"malikimranawan801@gmail.com" , 
                pass : "cnwk pdmx gasm rxnu"
            }
         })
         const mailoption = {
            from : "Technical store app" , 
            to : email ,
            subject : `Your order has been placed to the ${address}`
         }
         transporter.sendMail(mailoption , (error , info)=>{
            if(error)
            {
                console.log("Error in sending email in laptop" , error)
            }else{
                console.log("Email sent" , info.response)
                res.status(201).json({status:201 , info})
            }
         })
    }catch(error)
    {
        res.status(201).json({status:401 , info})
    }
})
module.exports = router
