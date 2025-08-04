let all = require("../Functions/Logics");
let exp =require("express")

let r =exp.Router();

r.post("/",all.Register);
r.get("/r",all.Read);
r.delete("/remove/:a",all.DeleteRecord)
r.post("/login",all.Login)
r.post("/forgot",all.forget_password)
r.put("/reset/:token",all.reset_password)

module.exports = r