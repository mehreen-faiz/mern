let mongo = require("mongoose");
require("dotenv").config();

let db_url = process.env.URL

let Database_connect = async function () {
    if (!db_url) {
        console.log("url not found")
    } else {
try {
         mongo.connect(db_url);
         console.log("database connected");

} catch (error) {
    console.log("error")
}
    }
}

module.exports = Database_connect;