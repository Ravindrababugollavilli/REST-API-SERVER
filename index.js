const express=require("express")
const app=express()
const port=3005

app.get("/",(req,res)=>{
    res.send("Hello Node API")
})

app.listen(port,()=>{
    console.log(`Node API is running on port ${port}`)
})