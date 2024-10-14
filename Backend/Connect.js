const { MongoClient, Collection } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function Connection(){
var result= await client.connect()
var collect= result.db("Mongo")
return collect.collection("Student")
}
module.exports=Connection