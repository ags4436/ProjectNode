const express=require('express');
const path=require('path');
var bodyParser = require('body-parser');
const {products}=require("./data");
const { exec } = require("child_process");
const app=express();


let validateKey=((req,res,next)=>{
    const key=req.body.key
    let verify="";
    exec("python v.py "+key, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(stdout);
    });
    console.log(verify);
    if(verify!="Entered key is valid!"){
    return res.send("Invalid Key!")
    }

    console.log("Success")
    next()
})

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static("./public"));

 app.post("/submit",validateKey,(req,res)=>{
    console.log(req.body.key)
    res.send("Checking..")
})

app.get("/about",(req,res)=>{
    res.status(200).send("about Page");
})

app.all("*",(req,res)=>{
    res.status(404).send("404 :)")
})


app.listen(5000,()=>{
    console.log("Listening To port 5000!")
})

