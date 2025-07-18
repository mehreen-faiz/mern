const User = require("../Collection/User");
let bb = require("bcrypt")
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
   
   }catch(error){
           res.status(504).json({msg : error.message})
          }
   }}
   
   module.exports = all_func