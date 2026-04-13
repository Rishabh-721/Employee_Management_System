import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Employeeform = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({name: "", email: "", position: "", empid: "", client: ""})
    const [serverError, setServerError] = useState("");
    const [error, setError] = useState({});
    const [success, setSuccess] = useState("");
    const {id} = useParams();
    const isEdit = Boolean(id);

  useEffect(() => {
      axios.get(`${process.env.REACT_APP_API_URL}/employee/${id}`)
        .then(res => setFormData(res.data.data))
        .catch(err => console.log(err));
    }, [id, isEdit]);

  const handleChange = (e) => {
  const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    setError((prev) => ({
        ...prev,
        [name]: ""
    }));

    setServerError("");
    setSuccess("");
   }

   const validate = () => {
    let newErrors = {};
    
    Object.keys(formData).forEach((key) => {
        if (typeof formData[key] === "string" && formData[key].trim() === "") {
            newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()} is required`;
        }
    });

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format";
    }

    if (formData.empid && !/^\d{6}$/.test(formData.empid)) {
        newErrors.empid = "Employee ID must be exactly 6 digits";
    }

  return newErrors;
   }


   const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setError(validationErrors);

    if(Object.keys(validationErrors).length === 0){
      try {
        if (isEdit) {
          await axios.put(
            `${process.env.REACT_APP_API_URL}/employee/${id}`,
            formData
          );
        
          setSuccess("Employee updated successfully ✅");
        
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }else{
          await axios.post(`${process.env.REACT_APP_API_URL}/employee`, formData);

          setFormData({
                name: "",
                email: "",
                position: "",
                empid: "",
                client: ""
              });
            
          setSuccess("Employee created successfully ✅");
         }

        } catch (err) {
           const message = err.response?.data?.message || err.response?.data ||  "Something went wrong";

           setServerError(message);
        }
    }
   }

  return (
    
    <div className='CreationForm'>
    <button className='back-btn' onClick={() => navigate(-1)}>Back</button>
        <h2>{isEdit ? "Edit Employee" :"Create Employee"}</h2>
    
    {serverError && <p className="server-error">{serverError}</p>}
    {success && <p className="success">{success}</p>}
    <form onSubmit={handleSubmit}>

    <div>
      <label htmlFor="name">Name :</label>  
      <input type='text' 
      name='name' 
      id='name' 
      value={formData.name}
      onChange={handleChange}
      />
      {error.name && <span className="error">{error.name}</span>}
    </div>

    <div>
      <label htmlFor="email">Email :</label>  
      <input type='text' 
      name='email' 
      id='email' 
      value={formData.email}
      onChange={handleChange}
        />
        {error.email && <span className="error">{error.email}</span>}
    </div>

    <div>
      <label htmlFor="position">Position :</label>
      <input type='text' 
      name='position' 
      id='position' 
      value={formData.position}
      onChange={handleChange}
       />
       {error.position && <span className="error">{error.position}</span>}
    </div>

    <div>  
      <label htmlFor="employeeid">Employee Id :</label>
      <input type='text' 
      name='empid' 
      id='employeeid' 
      value={formData.empid}
      onChange={handleChange}
        />
        {error.empid && <span className="error">{error.empid}</span>}
    </div>

    <div>  
      <label htmlFor="client">Client Name :</label>
      <input type='text' 
      name='client' 
      id='client' 
      value={formData.client}
      onChange={handleChange}
        />
        {error.client && <span className="error">{error.client}</span>}
    </div> 

    <button type='Submit' className='submit-btn'>Submit</button>

    </form>
    </div>
  )
}

export default Employeeform;
