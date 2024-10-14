const { ObjectId } = require("mongodb")
var connection=require("./Connect")
var express=require("express")
var cors=require("cors")
var app=express()
app.use(express.json())
app.use(cors())

app.get("/get",async function(req,res){
    var result=await connection()
var data=await result.find().toArray()
res.send(data)
    
    }),
  
app.post("/Insert", async function(req,res){
    var result=await connection()
    var data=await result.insertOne(req.body)
res.send(data)       
        res.end()
}),
app.delete("/Delete", async function(req,res){
    var result=await connection()
    var data=await result.deleteOne({_id:new ObjectId(req.body.id)})
    res.send(data)
        
}),
app.put("/Update", async function(req,res){
    var result=await connection()
    var data=await result.updateOne({_id:new ObjectId(req.body.id)},{$set:(req.body.data)})
    res.send(data)
        
 })
 app.delete("/DelAll",async function(req,res) {
var result= await connection()
var data= await result.deleteMany({})
res.send(data)
 })
 app.delete("/Del",async function(req,res) {
    var result= await connection()
     var updatedarray= req.body.map
     (function(item){
        return new ObjectId(item)
     })
     const data= await result.deleteMany({_id:{$in:updatedarray}})
     res.send(data)      
})
app.listen(3010)
