import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Record = (props) => (
 <tr>
   <td>{props.record.firstName}</td>
   <td>{props.record.lastName}</td>
   <td>{props.record.middleName}</td>
   <td>{props.record.position}</td>
   <td>{props.record.level}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 const [sorted, setSorted] = useState("");
 const [posFilter, setPosFilter] = useState("");
 const [levFilter, setLevFilter] = useState("");
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5000/record/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:5000/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 
 function handleSort(property) {
    return setSorted(property);
 }

 function handlePosFilter(property) {
  return setPosFilter(property)
}

function handleLevFilter(property) {
  return setLevFilter(property)
}

function filterPos(el){
  if(posFilter===""){
    return el
  }else
  return el.position.toLowerCase().includes(posFilter.toLowerCase())
}
function filterLev(el){
  if(levFilter===""){
    return el
  }else
  return el.level.toLowerCase().includes(levFilter.toLowerCase())
}
 // This method will map out the records on the table
 function recordList() {
   return records.filter(el => filterPos(el)).filter(el => filterLev(el)).sort((a,b) => (a[sorted] > b[sorted]) ? 1 : ((b[sorted] > a[sorted]) ? -1 : 0)).map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Record List</h3>
     <label>Sort by:</label>
      <select onChange={(e) => handleSort(e.target.value)} id="sort">
        <option value=""></option>
        <option value="firstName">First Name</option>
        <option value="lastName">Last Name</option>
        <option value="middleName">Middle Name</option>
        <option value="position">Position</option>
        <option value="level">Level</option>
      </select>
      <label>Filter by position:</label>
      <input onChange={(e) => handlePosFilter(e.target.value)} type="text"></input>
      <label>Filter by level:</label>
      <input onChange={(e) => handleLevFilter(e.target.value)} type="text"></input>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>First Name</th>
           <th>Last Name</th>
           <th>Middle Name</th>
           <th>Position</th>
           <th>Level</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 );
}