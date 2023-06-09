import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import CreateEquip from "./components/createEquip";
import EquipmentList from "./components/equipmentList";
import EditEquip from "./components/editEquip";
import CreateCompany from "./components/CreateCompany";
 
const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
       <Route path="/createCompany" element={<CreateCompany />} />

       <Route exact path="/equipment" element={<EquipmentList />} />
       <Route path="/editEquip/:id" element={<EditEquip />} />
       <Route path="/createEquip" element={<CreateEquip />} />

     </Routes>
   </div>
 );
};
 
export default App;