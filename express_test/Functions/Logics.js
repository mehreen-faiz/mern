const User = require("../Collection/User");
let bb = require("bcrypt");
let mail = require("nodemailer");
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
   }
  }
   
   module.exports = all_func