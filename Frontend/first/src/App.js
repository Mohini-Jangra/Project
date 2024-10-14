import React, { useEffect, useRef, useState } from 'react'

const App = () => {
  const[Arr,SetArr]=useState([])
  const[Obj,SetObj]=useState({})
  const [Key,SetKey]= useState("")
  const[Check,SetCheck]= useState([])
  var name=useRef()
  var phone= useRef()
  var city=useRef()
  var selected= useRef()
useEffect(function(){
show()
})
  async function show(){
var result= await fetch("http://localhost:3010/get")
var data= await result.json()
SetArr(data)  
}
function set(event){
SetObj({...Obj,[event.target.name]:event.target.value})
}
async function save(e){
e.preventDefault()
if(Obj.Name && Obj.Phone && Obj.City){
var result= await fetch("http://localhost:3010/Insert",{
   method:"post",
    body:JSON.stringify(Obj),
  headers:{
    "Content-Type":"application/json"
  }
})
if(result.status==200){
var data= await result.json()
console.log(data);
alert("Inserted Successfully")
show()
}
else{
alert("Error Occured")
}
}
else{
  alert("Field is empty")
}
}
 async function dell(e){
e.preventDefault()
var result= await fetch("http://localhost:3010/DelAll",{
  method:"delete",
  headers:{
    "Content-Type":"application/json"
  }
})
if(result.status==200){
  var data= await result.json()
  console.log(data)
  alert("Deleted Successfully")
}
else{
  alert("Error Occured")
}
}
async function del(id){
var result= await fetch("http://localhost:3010/Delete",{
  method:"delete",
  body:JSON.stringify({"id":id}),
  headers:{
    "Content-Type":"application/json"
  }
})
if(result.status==200){
  var data= await result.json()
  console.log(data)
  alert("Deleted Successfully")
}
else{
  alert("Error Occured")
}
}
function edit(id){
SetKey(id)
var result= Arr.filter(function(obj){
return (obj._id==id)
})
name.current.value=result[0].Name
phone.current.value=result[0].Phone
city.current.value=result[0].City
}
async function update(e){
e.preventDefault()
var Name= name.current.value
var Phone= phone.current.value
var City= city.current.value

var obj={
"Name":Name,
"Phone":Phone,
"City":City
}
var object={
"id":Key,
"data":obj
}

 var result= await fetch("http://localhost:3010/Update",{
 method:"put",
 body:JSON.stringify(object),
 headers:{
 "Content-Type":"application/json"
 }
 })
 if(result.status==200){
 var data= await result.json()
 console.log(data)
 alert("Updated Successfully")
 show()
 }
 else{
 alert("Error Occured")
 }
}
function Checking(input,id){
  if(input.target.checked==true){
    SetCheck([...Check,id])
  }
  else{
    var array= Check.filter(function(keys){
      return keys=id
    })
    SetCheck(array)
  }
}
 async function DelSel(e) {
  e.preventDefault()
  const result= await fetch("http://localhost:3010/Del",{
    method:"delete",
    body:JSON.stringify(Check),
    headers:{
      "Content-Type":"application/json"
    }
  })
  if(result.status==200){
    const data= await result.json()
    console.log(data);
    alert("Deleted Successfully")
    show()
    SetCheck([])
  }
  else{
    alert("Error Occured")
  }
 }
 return (
    <div className='container'>
      <h1 className='text-center text-white'>Registration Form</h1>
      {/* <button className='btn btn-success' onClick={show}>Show</button> */}
      <div>
        <label className='text-white'>Name:</label>
        <input type='text' onChange={set} ref={name} name='Name' className='form-control' placeholder='Enter your Name....'/>
        <label className='text-white'>Phone:</label>
        <input type='text' onChange={set} ref={phone} name='Phone' className='form-control' placeholder='Enter your Phone'/>
        <label className='text-white'>City:</label>
        <input type='text' onChange={set} ref={city} name='City' className='form-control' placeholder='Enter your City'/>
        <button onClick={save} className='btn btn-primary'>Save</button>
        <button onClick={dell} className='btn btn-danger'>Delete</button>
        <button onClick={update} className='btn btn-warning'>Update</button>
        <button onClick={DelSel} className='btn btn-info'>Delete-Selected</button>
        </div>
      <br/>
      <table className='table table-hover table-striped'>
        <thead>
          <tr>
            <th>Select</th>
            <th>Sr.No.</th>
            <th>Name</th>
            <th>City</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
{
  Arr.map(function(obj,index){
return(
  <tr>
    <td><input onClick={(e)=>Checking(e,obj._id)} type='checkbox'/></td>
    <td>{index+1}</td>
    <td>{obj.Name}</td>
    <td>{obj.City}</td>
    <td>{obj.Phone}</td>
    <td><button onClick={()=>del(obj._id)} className='btn btn-danger'>Delete</button>
    <button onClick={()=>edit(obj._id)} className='btn btn-success'>Edit</button></td>
  </tr>
)
  })
}
        </tbody>
      </table>
    </div>
  )
}

export default App