const User = require("../Collection/User");
let bb = require("bcrypt");
let mail = require("nodemailer");
let jwt = require("jsonwebtoken")
const { use } = require("react");
require("dotenv").config()

let secure_info = mail.createTransport({
  service: "gmail",
  auth:{
    user : process.env.EMAIL,
    pass : process.env.PASSKEY

  }
})

let all_func ={
    Register : async function(req ,res){
      try{
       let{n,e,p,a}= req.body;
       let email_check = await User.findOne({email : e})
       if (email_check){
        res.status(409).json({msg : "Email Already Exist"})
       } else{
            let hashed_p = bb.hashSync(p,15)
       let savedata =new User({
         name : n,
         email : e,
         password : hashed_p,
         age : a,
       })
       await savedata.save()
       res.status(200).json({msg : "Data Saved Successfully"})
       
       }
        
       let EmailBodyInfo = {
        to : e,
        from : process.env.EMAIL,
        subject : "Account Has Been Registered Successfully",
        html : `<h3>hello ${n}</h3><br/><p>Your Acount Has Been Registered Successfully</p>`

       }

       secure_info.SendMail(EmailBodyInfo , function(e,i){
        if (e) {
          console.log(e)
        } else {
          console.log("Email has Been Sent")
        }
       })
   
   }catch(error){
           res.status(504).json({msg : error.message})
          }
   },
  
   Read : async function(req,res){
    try {
      let user_data = await User.find().sort({Record_time : -1})
      res.status(201).json(user_data)
    } catch (error) {
console.log(error.msg)
res.status(504).json({msg : error.msg})
    }
   },
   DeleteRecord : async function(req,res){
    try {
      let {a} = req.params
      let dhondo = await User.findById(a)
      if(!dhondo){
        res.status(404).json({msg:"record does not found"})
      }
      else{
        await User.findByIdAndDelete(dhondo)
        res.status(201).json({msg:"record deleted"})
      }
    } catch (error) {
      res.status(504).json({msg:error.message})
    }
    
   },
   Login: async function (req,res) {
    try {
      let {email, pswd} = req.body;
      let email_check = await User.findOne({email : email})
      if(!email_check){
        res.status(404).json({msg : "Email not Found"})

      }
      let pswd_check = bb.compareSync(pswd , email_check.password)
      if (!pswd_check){
        res.status(404).json({msg : "Password is Invalid"})

      }
      let mera_token = jwt.sign({id: email_check._id}, "mehreen" , {expiresIn : "2h"})
      res.status(200).json({mera_token, "User" : {id : email_check._id , name : email_check.name}})
    } catch (error) {  
      res.status(504).json({msg : error.message})
      console.log(error.message)
    }
   }
   forget_password : async function(req,res){
    try {
      let {e} = req.body
      let email_check = await User.findOne({email : e})
      if(!email_check){
        res.status(404).json({msg : "Email Not Exist"})
      }
      let token = jwt.sign({id : email_check.id}, process.env.KEY, {expiresIn : "1h"})
      let url = `http://localhost:3000/re/${token}`

      let email_body = {
        to : email_check.email,
        from : process.env.EMAIL,
        subject: "Reset Password Link",
        html :`<p>Hi ${email_check.name} <br/> Your Password Reset Link is given below 
        <a href=${url}>Click Here<a></p>`
      }
      datas.sendMail(email_body, function(e,i){
        if(e){
          console.log(e)
        }
      })
      res.status(200).json({msg: "Email Sent Successfully"})

    } catch (error) {
      res.status(504).json({msg: error.message})
    }
  },
  reset_password : async function(req,res){
    try {
      let {token} = req.params
      let {pswd} = req.body

      let check_token = jwt.decode(token, process.env.KEY)

      let haspswd = bb.hashSync(pswd,12)
      
      await User.findByIdAndUpdate(check_token.id, {
        password: haspswd
      })
    } catch (error) {
      res.status(504).json({msg: error.message})
      
    }
  }
}
  }
   
   module.exports = all_func