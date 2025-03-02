import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./Pages/Landing";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Auth/Login";
import { Toaster } from 'react-hot-toast'

import Register from "./Pages/Register";
import AdminRegister from "./Admin/AdminRegister";
import CreateID from "./Auth/CreateID";
import FacultyRegister from "./Faculty/FacultyRegister";
import StudentRegister from "./Student/StudentRegister";
import AdminDashbord from "./Admin/AdminDashbord";
import Dashbord from "./Pages/Dashbord";
import Contact from "./Pages/Contact";
import Course from "./Pages/Course";
import About from "./Pages/About";
import FacultyDasbord from "./Faculty/FacultyDasbord";
import AllFaculty from "./Admin/AllFaculty";
import AllCourse from "./Admin/AllCourse";
import AllStudent from "./Admin/AllStudent";
import { useSelector } from "react-redux";
import ForgatPass from "./Auth/ForgatPass";

function App() {
  const { user } = useSelector((state) => state.loginSlice);
  
 return (
    <>
      <BrowserRouter>
        <div className="fixed w-full z-1">
          <Header />
        </div>
        <div className="pt-20">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashbord" element={<Dashbord />} />
          <Route path="/course" element={<Course />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/about" element={<About />} />
          
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/create-id" element={<CreateID />} />
          <Route path="/forgat" element={<ForgatPass />} />

          {/* Admin */}
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/admin-dashbord" element={<AdminDashbord />} />
          <Route path="/all-faculty" element={<AllFaculty/>}/>
          <Route path="/all-courses" element={<AllCourse/>}/>
          <Route path="/all-students" element={<AllStudent/>}/>

          {/* Faculty */}
          <Route path="/faculty-register" element={<FacultyRegister />} />
          <Route path="/faculty-dashbord" element={<FacultyDasbord />} />

          {/* Student */}
          <Route path="/StudentRegister" element={<StudentRegister />} />
        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
