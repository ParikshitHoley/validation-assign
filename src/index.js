const express = require('express');
const connect = require('./configs/db');
const app = express();
const userController = require("./controller/user.controller")



app.use(express.json())

app.use("/users", userController)


// -------------------------------------------connection------------------------------

app.listen(8520,async ()=>{
    try{
        console.log("Listening on port 8520")
        await connect();
    }catch(err){
        console.log(err.message)
    }
})