let all = require("../Functions/Logics");
let exp =require("express")

let r =exp.Router();

r.post("/",all.Register);
r.get("/r",all.Read);

module.exports = r