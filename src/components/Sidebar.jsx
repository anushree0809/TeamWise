import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Collapse, Typography, Box, Avatar } from "@mui/material";
import { ExpandLess, ExpandMore, Folder, Home, Assignment, Archive, People } from "@mui/icons-material";

const Sidebar = ({ userData, projects = [], selectedProject,setSelectedProject }) => {
  const [openProjects, setOpenProjects] = useState(true);
  const projectsList = Array.isArray(projects.projects) ? projects.projects : [];

  const toggleProjects = () => setOpenProjects(!openProjects);

  return (
    <Drawer
  variant="permanent"
  sx={{
    width: 250, // Fixed width
    flexShrink: 0, 
    "& .MuiDrawer-paper": {
      width: 250, // Ensure paper width matches
      position: "relative", // Prevents overlap issues
    },
  }}
>
      {/* Sidebar Header with User Info */}
      <Box sx={{ display: "flex", alignItems: "center", padding: 2, bgcolor: "#ffffff", borderBottom: "1px solid #ddd" }}>
        <Avatar src={userData?.imageUrl} sx={{ marginRight: 1 }} />
        <Typography variant="h6" fontWeight="bold">{userData?.name || "User"}</Typography>
      </Box>

      <List>
        {/* General Section */}
        <ListItem button>
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Assignment /></ListItemIcon>
          <ListItemText primary="My Tasks" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Folder /></ListItemIcon>
          <ListItemText primary="Documents" />
        </ListItem>

        {/* Projects Section */}
        <ListItem button onClick={toggleProjects}>
          <ListItemIcon><Folder /></ListItemIcon>
          <ListItemText primary="Projects" />
          {openProjects ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        {/* Projects Section */}
{projects && projectsList.length > 0 ? (
  <Collapse in={openProjects} timeout="auto" unmountOnExit>
  <List component="div" disablePadding>
    {projectsList.map((project) => (
      <ListItem 
        button 
        key={project._id} 
        sx={{ pl: 4,
          backgroundColor: selectedProject?._id === project._id ? "#E3E4FA" : "transparent", 
          "&:hover": { backgroundColor: "#D6D6F5" }, // Hover effect
          borderRadius: "5px", }} 
        onClick={() => setSelectedProject(project)}
      >
        <ListItemText primary={project.name} />
      </ListItem>
    ))}
  </List>
</Collapse>
) : (
  <Typography sx={{ pl: 4, color: "gray" }}>No projects available</Typography>
)}


        {/* Teams */}
        <ListItem button>
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="Teams" />
        </ListItem>

        {/* Archive */}
        <ListItem button>
          <ListItemIcon><Archive /></ListItemIcon>
          <ListItemText primary="Archive" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
