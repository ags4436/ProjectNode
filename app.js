const express=require('express');
const path=require('path');
var bodyParser = require('body-parser');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const app=express();

let validateKey=(async (req,res,next)=>{
    const key=req.body.key
    const { stdout, stderr } = await exec("python v.py "+key);
    if(!stdout.includes("Entered key is valid!")){
        console.log('invalid')
        return res.send("Invalid Key!<br><a href='/'>Try Again<a/>")
    }
    next()
})

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static("./public"));

 app.post("/submit",validateKey,(req,res)=>{
    console.log(req.body.key)
    res.send("Valid Key!")
})

app.all("*",(req,res)=>{
    res.status(404).send("404 :)")
})


app.listen(5000,()=>{
    console.log("Listening To port 5000!")
})

