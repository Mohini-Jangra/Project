var Connection=require("./Connect")

async function Insert(){
    var collect=await Connection()
    var data= await collect.insertOne({"Name":"XYZ","Phone":87687676})
    console.log(data)
}
async function Show(){
    var collect=await Connection()
    var data= await collect.find().toArray()
    console.log(data)
}
async function Delete(){
    var collect=await Connection()
    var data= await collect.deleteMany({"Name":"XYZ","Phone":87687676})
    console.log(data)
}
async function Update(){
    var collect=await Connection()
    var data= await collect.updateOne({"Name":"Arjun"},{$set:{"Name":"Arjun Singh"}})
    console.log(data)
}
Update()