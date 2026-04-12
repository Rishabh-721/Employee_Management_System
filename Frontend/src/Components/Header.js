import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <h1>Employee Management System</h1>
      <button onClick={() => navigate("/create")}>+ Create Employee</button>
    </header>
  )
}

export default Header
