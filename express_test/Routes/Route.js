let all = require("../Functions/Logics");
let exp =require("express")

let r =exp.Router();

r.post("/",all.Register);
// r.get("/l",all.login);

module.exports = r