let mongo = require("mongoose");

let user_structure = mongo.Schema({
        name:{
        type:String,
        required:true
    },
       email:{
        type:String,
        required:true,
        unique:true
    },
       password:{
        type:String,
        required:true
    },
       age:{
        type:String,
        required:false
    },
       city:{
        type:String,
        default:"karachi"
    },
      record_time:{
        type:String,
        default:"karachi"
    }
})

module.exports =  mongo.model("users",user_structure)