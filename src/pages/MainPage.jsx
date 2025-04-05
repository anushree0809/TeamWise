import Sidebar from "../components/Sidebar";
import axios from "axios";
import ProjectDashboard from "../components/ProjectDashboard";
import Navbar from "../components/Navbar"; 
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

const MainPage = ({ userData }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (userData && userData._id) {
      fetchUserProjects();
    }
  }, [userData]);

  const fetchUserProjects = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/projects/user/${userData._id}`);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  console.log("user id:", userData._id);
  console.log("projects: ",projects);
  // if (!localUserData) {
      // return <div>Loading user data...</div>;}
    return (
      <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar userData={userData} />
        <div style={{ display: "flex", flex: 1 }}>
        <Sidebar userData={userData} projects={projects}  selectedProject={selectedProject}  setSelectedProject={setSelectedProject} />
      
          {/* Space between Sidebar and ProjectDashboard */}
          <div style={{ width: "16px" }}></div>
          
          <div style={{ flex: 1, overflow: "auto" }}>
            <ProjectDashboard selectedProject={selectedProject} />
          </div>
        </div>
      </div>
    );
  };

export default MainPage;
