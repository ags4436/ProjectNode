const express=require('express');
const path=require('path');
var bodyParser = require('body-parser');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const app=express();

let validateKey=(async (req,res,next)=>{
    const key=req.body.key
    
    let re = new RegExp('^[A-Z0-9]{5}(-[A-Z0-9]{5})(-[A-Z]{4}[0-9])(-[A-Z0-9]{5})(-[0-9]{1,5})$');
    let result = re.exec(key);
    if(result!==null){
        console.log(result)
        const { stdout, stderr } = await exec("python v.py "+key);
        if(!stdout.includes("Entered key is valid!")){
            return res.send("Invalid Key!<br><a href='/'>Try Again<a/>")
        }
    }else{
        return res.send("Invalid Key!<br><a href='/'>Try Again<a/>")
    }
    
    next()
})

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static("./public"));

 app.post("/submit",validateKey,(req,res)=>{
    res.send("Valid Key!")
})

app.all("*",(req,res)=>{
    res.status(404).send("404 :)")
})


app.listen(5000,()=>{
    console.log("Listening To port 5000!")
})

