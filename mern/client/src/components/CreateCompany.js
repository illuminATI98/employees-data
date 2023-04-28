import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";


const CreateCompany = () => {
  const navigate = useNavigate();

  const [form,setForm] = useState({
    companyName:""
  })

  function updateForm(value) {
   return setForm( (prev)=> {
    return {...prev, ...value}});
  }
  
  async function onSubmit(e){
    e.preventDefault();

    let newCompany = {...form};

    await fetch("http://localhost:5000/company/create", {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCompany)
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({
      companyName: "",
    })
  }
  console.log(form)
  return (
    <div>
      <h3>Add New Company</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="firstName">Name</label>
         <input
           type="text"
           className="form-control"
           id="companyName"
           value={form.companyName}
           onChange={(e) => updateForm({ companyName: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Create company"
           className="btn btn-primary"
         />
       </div>
     </form>
    </div>
  )
}

export default CreateCompany

