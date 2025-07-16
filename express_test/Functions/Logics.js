const User = require("../Collection/User");

 let all_func ={
    Register : async function(req ,res){
      try{
       let{n,e,p,a}= req.body;
       let savedata =new User({
         name : n,
         email : e,
         password : p,
         age : a,
       })
       await savedata.save()
       res.status(200).json({msg : "data saved successfully"})
       
   }catch(error){
           res.status(504).json({msg : error.message})
          }
   }}
   
   module.exports = all_func