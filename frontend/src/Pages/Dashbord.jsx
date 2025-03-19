import React from 'react'
import { useSelector } from 'react-redux';
import AdminDashbord from '../Admin/AdminDashbord';
import FacultyDasbord from '../Faculty/FacultyDasbord';
import StudentDashbord from '../Student/StudentDashbord';

function Dashbord() {
  const { user } = useSelector((state) => state.loginSlice);  
  return (
    <>
      {
        user ? 
        user && user.role === "admin" && user.id ? (
          <AdminDashbord/>
        ) : user && user.role === "faculty" && user.id ? (
          <FacultyDasbord/>
        ) : user && user.role === "student" && user.id ? (
          <StudentDashbord/>
        ) : (
          <h1>Dashbord</h1>
        )
        : 
        <>
          <h1>Loading...</h1>
        </>
      }
    </>
  )
}

export default Dashbord
