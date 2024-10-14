const { ObjectId } = require("mongodb")
var Connect= require("./Connect")

async function Ins(){
    var ab=await Connect()
    var result= await ab.insertOne({"Name":"Ram","City":"Rohtak","Phone":7887887})
    console.log(result)
}
async function Del(){
    var ab=await Connect()
    var result= await ab.deleteOne({"Name":"Ram","City":"Rohtak","Phone":7887887})
    console.log(result)
}

async function Upd(){
    var ab=await Connect()
    var result= await ab.updateOne({"Name":"Mohini"},{$set:{"Name":"Mohini Jangra"}})
    console.log(result)
}

async function Updd(){
    var ab=await Connect()
    var result= await ab.updateOne({_id: new ObjectId("66c0428f85b8c39fdf4836a8")},{$set:{"Name":"Brayer"}})
    console.log(result)
}
async function Dell(){
    var ab=await Connect()
    var result= await ab.deleteOne({_id: new ObjectId("66c0428f85b8c39fdf4836a8")})
    console.log(result)
}
Dell()