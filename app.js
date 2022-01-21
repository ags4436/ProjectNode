const express=require('express');
const app=express();

app.get("/",(req,res)=>{
    res.setHeader('content-type','text/html')
    res.status(200).send("<h1>Home Page</h1>");
})

app.get("/about",(req,res)=>{
    res.status(200).send("about Page");
})



app.listen(5000,()=>{
    console.log("Listening To port 5000!")
})