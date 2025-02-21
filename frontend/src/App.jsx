import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./ProtectedRoutes.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import NotFound from "./components/NotFound";
import Unauthorized from "./components/Unauthorized";
import Dashboard from "./components/admin/Dashboard.jsx";

import Header from "./components/Header";
import Body from "./components/homePage/Body";
import Footer from "./components/Footer";

import Project from "./components/project/Project";

import ViewProject from "./components/project/ViewProject.jsx";

import Skills from "./components/skills/Skills";

import Login from "./components/Login";

// admin components imports

import Upload from "./components/admin/Upload";

import "./app.css";
import ProjectType from "./components/admin/ProjectType";

function App() {

  const projects = [
    { title: "Portfolio Website" },
    { title: "E-commerce Platform" },
    { title: "Chat App" },
    { title: "Task Manager" },
    { title: "Weather App" },
  ];

  const skillsArr = ["JavaScript", "React", "Node.js", "CSS", "MongoDB"];


  const homepage = (
    <>
      <Body />
    </>
  );

  const project = (
    <>
      <Project />
    </>
  );

  const skills = (
    <>
      <Skills />
    </>
  );

  return (
    <>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={homepage} />
            <Route path="/project" element={project} />
            <Route path="/skills" element={skills} />
            {/* dynamic route for project viewing */}
            <Route path="/project/:id" element={<ViewProject />} />

            {/* Login Route */}
            <Route path="/login" element={<Login />} />
            {/* Unauthorized Route */}
            <Route path="/Unauthorized" element={<Unauthorized />} />


            {/* Protected Admin Route */}
            <Route
              path="/admin/"
              element={
                <ProtectedRoutes>
                  <Dashboard projects={projects} skills={skillsArr}/>
                </ProtectedRoutes>
              }
            />

            <Route
              path="/admin/projectType"
              element={
                <ProtectedRoutes>
                  <ProjectType />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/admin/addproject"
              element={
                <ProtectedRoutes>
                  <Upload />
                </ProtectedRoutes>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
