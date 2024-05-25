const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const cors = require('cors')
const multer = require('multer')
const router = express.Router()
const nodemailer = require('nodemailer')
const mobailmodel = require('../models/mobailschema')
const { error } = require('console')
const app = express()
router.use(cors())
const uplaod = multer({
    storage : multer.diskStorage({
        destination : function(req , file , cb)
        {
             console.log("api hit")
            cb(null , path.resolve(__dirname , '../public/mobailimages'))
        },
        filename : function(req , file , cb)
        {   
            console.log(file.filename)
            cb(null , Date.now() +"-" + file.originalname)
        }
    })
})
router.post('/mobailmulter' , uplaod.single("file-upload") , (req,res)=>{
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
router.post('/mobailinsert' ,async(req,res)=>{
    try{
         console.log(req.body)
         const b = req.body
         const mobail = new mobailmodel(b)
         await mobail.save()
         res.json({success:true , massage:"save data successfully"})
    }catch(error)
    {
        console.log("Error in inserting data in mobail" , error)
        res.status(500).json({success:false , error:"Interval server error"})
    }
})
router.get('/mobailfetch' , async(req,res)=>{
    try{
            const mobail = await mobailmodel.find();
            res.status(200).json(mobail)
    }catch(error)
    {
        console.log("Error in fetching data" , error)
        res.status(500).json({success:false , error : "Internal server error"})
    }
})
router.delete('/mobaildelete/:id' , async(req,res)=>{
        const mobailId =req.params.id
        try{
             const mobaildelte  = await mobailmodel.findByIdAndDelete(mobailId)
             if(!mobaildelte)
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
router.get("/fetchid/:id" , async(req,res)=>{
    const mobailId = req.params.id
    try{
            const mobail = await mobailmodel.findById(mobailId)
            if(!mobail)
            {
                return res.status(404).json({success:false , error:"Laptop Not found"})
            }
            res.status(200).json(mobail)
    }catch(error)
    {
        console.log("error in fetch update in mobail" , error)
        res.status(500).json({success:false , error : "Interval server error"})
    }
})
router.put("/mobailupdate/:id" , uplaod.single("image") , async(req,res)=>{
    const mobailId = req.params.id
    try{
          const{company , color , model , ram , memory} = req.body
          const iamgepath = req.file ? req.file.filename:null;
          const updatemobail = await mobailmodel.findByIdAndUpdate(mobailId , {
            company , color , model , ram , memory , 
            image : iamgepath
          },{new:true}
          )
          if(!updatemobail)
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
router.post('/mobailmail' , (req,res)=>{
    const {email , address} = req.body
    try{
        const transporter = nodemailer.createTransport({
            service : "gmail" , 
            auth :{
                user :"malikimranawan801@gmail.com" , 
                pass : "cnwk pdmx gasm rxnu"
            }
        })
        const mailoption = {
            from : "Technical store App" , 
            to : email , 
            subject : `Your order has been placed to the address ${address}`
        }
        transporter.sendMail(mailoption , (error , info)=>{
            if(error)
            {
                console.log("Error in sending email in mobail" , error)
            }else{
                res.status(201).json({status:201 , info})
                console.log("Email sent successfully" , info.response)
            }

        })
    }catch(error)
    {
        res.status(201).json({status:401 , info})
    }
})
module.exports=router