import React,{useState,useEffect} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import { IoIosTrash } from "react-icons/io";
import { FiDatabase } from "react-icons/fi";
import Logo from "./logo.png";

const App=()=>{
  return <Insert />
}
const Insert=()=>{
  const[input,inputchange]=useState("");
  const[print,printchange]=useState([]);
  
  useEffect(()=>{
    axios.get("http://localhost:8000/postdata").then(succdata=>{
      printchange(succdata.data)
    })
  },[])
  
  const changevalue=(event)=>{
  inputchange(event.target.value)
  }
  const itemdelete=(itemdata)=>{
    axios.delete("http://localhost:8000/postdata/"+itemdata).then(success=>{
      if(success.status===200 && success.settext==="OK")
      {
        printchange([print.filter(i=>i.id!==itemdata)])
      }
    })
  }

  const updateitem=(updateid)=>{
    let c=prompt("enter the rename value");
    axios.put("http://localhost:8000/postdata/"+updateid,{name:c})
  }

  const printvalues=()=>{
    if(input.length===0){
      alert("Text box must not be empty");
    }else{
      axios.post("http://localhost:8000/postdata",{name:input}).then(successdata=>{
        console.log(successdata);
        printchange([...print,successdata.data])
        inputchange("")
    })
    }  
  }
  return(
    <div style={{backgroundColor:"#EC0C57",width:"800px"}} className="container"> 
      <h3 className="text-white float-left" style={{backgroundColor:"#EC0C57",height : "60px"}} > <img  style={{height:"50px"}}src={Logo} alt="website logo" className="rounded-circle"/> Instagram</h3>
      <input style={{height:150}}className="form-control" type="text"  value={input} placeholder="lets Rock........."  onChange={changevalue} ></input>
      <center>
      <button  className="btn btn-primary center-block" style={{width:500,height:50}}  onClick={printvalues}>Add Story <FiDatabase/></button>
      </center>
      <ul className="list-group">
      {
        print.map(i=>{
          return (<li key={i.id} style={{backgroundColor:"lightgrey",margin:"10px"}} className="list-group-item" >
          {i.name} 
          <button  className="btn btn-info"  style={{float:"right",marginLeft:"10px"}} onClick={()=>itemdelete(i.id)}><IoIosTrash/></button>
          <button  className="btn btn-info " style={{float:"right"}} onClick={()=>updateitem(i.id)}>Update</button>
            </li>);
        })
      }
      </ul>
    </div>
  );
}
export default App;