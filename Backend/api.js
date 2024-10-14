const { ObjectId } = require("mongodb")
var connection=require("./Connect")
var express=require("express")
var app=express()
app.use(express.json())

app.get("/fetch",async function(req,res){
    var con=await connection()
var abc=await con.find().toArray()
res.send(abc)
console.log(abc)    
    }),
  
app.post("/Ins", async function(req,res){
    var con=await connection()
    var abc=await con.insertOne(req.body)
res.send(abc)       
console.log(abc)
}),
app.delete("/Remove", async function(req,res){
    var con=await connection()
    var abc=await con.deleteOne({_id:new ObjectId(req.body.id)})
    res.send(abc)
    console.log(abc)
}),
app.put("/New", async function(req,res){
    var con=await connection()
    var abc=await con.updateOne({_id:new ObjectId(req.body.id)},{$set:(req.body.xyz)})
    res.send(abc)
        console.log(abc)
 })
app.listen(3010)
