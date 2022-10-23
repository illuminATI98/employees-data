import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 

const Equipment = (props) => (
  <tr>
    <td>{props.equipment.name}</td>
    <td>{props.equipment.type}</td>
    <td>{props.equipment.amount}</td>
    <td>
      <Link className="btn btn-link" to={`/editEquip/${props.equipment._id}`}>Edit</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deleteEquipment(props.equipment._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
 );
 
export default function EquipmentList() {
 const [equipments, setEquipments] = useState([]);
 
 // This method fetches the equipments from the database.
 useEffect(() => {
   async function getEquipments() {
     const response = await fetch(`http://localhost:5000/equipment/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const equipments = await response.json();
     setEquipments(equipments);
   }
 
   getEquipments();
 
   return;
 }, [equipments.length]);
 
 // This method will delete a equipment
 async function deleteEquipment(id) {
   await fetch(`http://localhost:5000/equipment/${id}`, {
     method: "DELETE"
   });
 
   const newEquipments = equipments.filter((el) => el._id !== id);
   setEquipments(newEquipments);
 }
 
 // This method will map out the equipments on the table
 function equipmentList() {
   return equipments.map((equipment) => {
     return (
       <Equipment
         equipment={equipment}
         deleteEquipment={() => deleteEquipment(equipment._id)}
         key={equipment._id}
       />
     );
   });
 }

 
 // This following section will display the table with the equipments of individuals.
 
 return (
   <div>
     <h3>Equipments List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Type</th>
           <th>Amount</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{equipmentList()}</tbody>
     </table>
   </div>
 );
 
}