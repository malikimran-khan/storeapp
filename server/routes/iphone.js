const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const cors = require('cors')
const router = express.Router()
const multer = require('multer')
const nodemailer = require('nodemailer')
const iphonemodel = require('../models/iphoneschema');
const { info } = require('console')
const app = express()
router.use(cors())
const upload = multer({
    storage : multer.diskStorage({
        destination : function(req , file , cb)
        {
            console.log("API hit")
            cb(null , path.resolve(__dirname , '../public/iphoneimages'))
        },
        filename : function(req , file , cb)
        {
             console.log(file.filename)
            cb(null , Date.now() + "-" + file.originalname)
        }
    })
})
router.post('/iphonemulter' , upload.single("file-upload") , (req,res)=>{
    try{
         if(!req)
         {
            throw new Error("No file upload")
         }
         res.json({status:1 , name:req.file.filename})
    }catch(error)
    {
        res.send({status: -1 , massage : error.massage})
    }
})
router.post('/iphoneinsert' , async(req,res)=>{
    try{
         console.log(req.body)
         const b = req.body
         const iphone = new iphonemodel(b)
         await iphone.save()
         res.json({success:true , massage:"save data successfully"})
    }catch(error)
    {
        console.log("Error in inserting iphone" , error)
        res.status(500).json({success:false , error:"Interval server error"})
    }
})
router.get('/iphonefetch' , async(req,res)=>{
    try{
            const iphone = await iphonemodel.find()
            res.status(200).json(iphone)
    }catch(error)
    {
        console.log("Error in fetching data" , error)
        res.status(500).json({success:false , error : "Internal server error"})
    }
})
router.delete('/iphonedelete/:id' , async(req,res)=>{
    console.log("api hit 1")
    const iphoneId = req.params.id 
    try{
            const iphonedelete = await iphonemodel.findByIdAndDelete(iphoneId)
            if(!iphonedelete)
            {
                return res.status(404).json({success:false , error : "Record Not found"})
            }
            res.status(200).json({success:true , massage:"Recored deleted successfully"});

    }catch(error)
    {
        console.log("Error deleteing record in iphone" , error)
            res.status(500).json({ success: false, error: "Internal server error" });
    }
})
router.get('/iphonefetchid/:id' , async(req,res)=>{
    
    const iphoneId = req.params.id
    try{
               const iphone = await iphonemodel.findById(iphoneId)
               if(!iphone)
               {
                return res.status(404).json({success:false , error:"Laptop Not found"})
               }
               res.status(200).json(iphone)
    }catch(error)
    {
        console.log("error in fetch update in iphone id" , error)
        res.status(500).json({success:false , error : "Interval server error"})
    }
})
router.put('/iphoneupdate/:id' ,upload.single("image"), async(req,res)=>{
    const iphoneId = req.params.id
      try{
               const{name , color , price , condition} = req.body
               const imagepath = req.file ? req.file.filename:null
               const updateiphone = await iphonemodel.findByIdAndUpdate(iphoneId ,{
                name , color , price , condition , image : imagepath
               },{new:true})
               if(!updateiphone)
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
router.post('/iphonemail' , (req,res)=>{
    const{email , address} = req.body
    try{
            const transporter = nodemailer.createTransport({
                service : "gmail" ,
                auth : {
                    user :"malikimranawan801@gmail.com" , 
                    pass : "cnwk pdmx gasm rxnu"
                },
            })
            const mailoption = {
                from : "Tchnical store app" ,
                to : email ,
                subject : `you order has been places to the address : ${address}`
            }
            transporter.sendMail(mailoption , (error , info)=>{
                if(error)
                {
                    console.log("Error in send mail in iphone" , error)
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