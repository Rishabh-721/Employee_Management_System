import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    name: "", 
    empid: "",
    client: ""
  });

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const fetchAllEmployees = async() => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/employee`);
      setEmployees(res.data.data)
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false)
    }
  };
      
  const handleFilterChange = (e) => {
    const {name, value} = e.target;

      setFilters((prev) => ({
        ...prev,[name]: value
      }));
    };

    const handleFind = async() => {
      try {
        const query = new URLSearchParams();
        if(filters.name.trim()) query.append("name", filters.name);
        if(filters.empid.trim()) query.append("empid", filters.empid);
        if(filters.client.trim()) query.append("client", filters.client);
        
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/employee?${query.toString()}`);
        setEmployees(res.data.data)
      } catch (err) {
        console.log(err)
      }
    };

    const handleClear = async () => {
      setFilters({name: "", empid: "", client: ""});
      fetchAllEmployees();
    };

  const handleDelete = async (emp) => {
    const confirmDelete = window.confirm(
      `Delete ${emp.name} (ID : ${emp.empid}) ?`
    );

    if(!confirmDelete) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/employee/${emp._id}`)

      setEmployees((prev) => prev.filter((e) => e._id !== emp._id));
    } catch (err) {
      console.log(err);
    }
  }

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
  <>
    <div className="filter-container">
      <div className="filter-row">
        <label>Employee Name</label>
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
        />
      </div>

      <div className="filter-row">
        <label>Employee Id</label>
        <input
          type="text"
          name="empid"
          value={filters.empid}
          onChange={handleFilterChange}
        />
      </div>

      <div className="filter-row">
        <label>Client Name</label>
        <input
          type="text"
          name="client"
          value={filters.client}
          onChange={handleFilterChange}
        />
      </div>

      <div className="filter-actions">
        <button className="find-btn" onClick={handleFind}>Find</button>
        <button className="clear-btn" onClick={handleClear}>Clear</button>
      </div>
    </div>
    {loading ? ( <div className='loading'> Loading Employees... </div> ): 
       employees.length === 0 ? (
        <p>No Employee Found</p> ) : (
        <div>
        <div className='table-view'>
        <table className='employee-table' border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Employee Id</th>
              <th>Client</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={emp._id}>
                <td>{index + 1}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.position}</td>
                <td>{emp.empid}</td>
                <td>{emp.client}</td>
                <td className='table-actions'>
                  <button onClick={() => 
                    handleEdit(emp._id)
                  }>Edit</button>

                  <button onClick={() => 
                    handleDelete(emp)
                  }>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className='card-view'>
          {employees.map((emp) => (
            <div className='employee-card' key={emp._id}>
              <h3>Name: {emp.name}</h3>
              <p className='position'>Position: {emp.position}</p>
              <p className='id'>Employee Id: {emp.empid}</p>
              <div className='info'>
                <p><strong>Email :</strong> {emp.email}</p>
                <p><strong>Client :</strong> {emp.client}</p>
              </div>
              <div className='actions'>
                <button className='edit' onClick={() => 
                    handleEdit(emp._id)
                  }>Edit </button>
                  <button className='delete' onClick={() => 
                    handleDelete(emp)
                  }>Delete </button>
              </div>
            </div>
          ))}
        </div>
        </div>
        )}
  </>
  );
};
  

export default Dashboard;
