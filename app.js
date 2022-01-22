const express=require('express');
const path=require('path');
const {products}=require("./data");
const app=express();

//app.use(express.static("./public"));

 app.get("/",(req,res)=>{
   res.json(products);
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