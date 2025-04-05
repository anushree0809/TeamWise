import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import { Typography, IconButton } from "@mui/material";
import { Add, FilterList, Sort } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TaskCard from "./TaskCard"; // Import TaskCard component
import axios from "axios";
import AddTaskButton from "./AddTaskButton";

const ProjectDashboard = ({ selectedProject }) => {
  if (!selectedProject) return <Typography>No project selected.</Typography>;
    const [tasks, setTasks] = useState([]);
  
    useEffect(() => {
      if (!selectedProject?._id) return; // Ensure project is selected
      fetchTasks(selectedProject._id);
    }, [selectedProject]); // ✅ Re-run when `selectedProject` changes
  
    const fetchTasks = async (projectId) => {
      if (!projectId) return;
      try {
        const response = await axios.get(`http://localhost:3000/api/tasks/project/${projectId}`);
        setTasks(response.data);  
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    const handleTaskAdded = async () => {
      await fetchTasks(selectedProject._id); // Ensure fresh data
    };
    
  
    console.log("Selected Project:", selectedProject); // ✅ Check if it updates
    console.log("Tasks:", tasks); // ✅ Check if tasks update
  // const [tasks, setTasks] = useState([]);


  // const fetchTasks = async (projectId) => {  
  //   if (!projectId) return; // Ensure project ID is valid  
  
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:3000/api/tasks/project/${projectId}`
  //     );
  //     setTasks(response.data);  
  //   } catch (error) {
  //     console.error("Error fetching tasks:", error);
  //   }
  // };
  
  useEffect(() => {
    fetchTasks(selectedProject?._id); // ✅ Fetch new tasks when project changes
  }, [selectedProject]);
  
  const [members, setMembers] = useState([]);

useEffect(() => {
  if (selectedProject) {
    axios
      .get(`http://localhost:3000/api/projects/user/project/${selectedProject._id}`)
      .then((response) => {
        console.log("Project Members:", response.data.members);
        setMembers(response.data.members);
      })
      .catch((error) => console.error("Error fetching members:", error));
  }
}, [selectedProject]);
  
  const taskArray = tasks?.tasks ?? []; // Extract the array correctly
console.log("taskArray:", taskArray);

const toDoTasks = taskArray.filter((task) => task.status === "To Do");
const inProgressTasks = taskArray.filter((task) => task.status === "In Progress");
const completedTasks = taskArray.filter((task) => task.status === "Completed");

console.log("Filtered tasks!!", completedTasks);
const handleDeleteTask = async (taskId, event) => {
  if (event) event.stopPropagation(); // Prevent unwanted event bubbling

  try {
      await axios.delete(`http://localhost:3000/api/tasks/${taskId}`);
      await fetchTasks(selectedProject._id);

      // ✅ Ensure prevTasks is an array before filtering
      // setTasks((prevTasks) => Array.isArray(prevTasks) ? prevTasks.filter(task => task._id !== taskId) : []);
      
      console.log("Task deleted successfully");
  } catch (error) {
      console.error("Error deleting task:", error);
  }
};

const handleEditTask = async (updatedTask) => {
  try {
    const response = await axios.put(`http://localhost:3000/api/tasks/${updatedTask._id}`, updatedTask);
    
    // Optimistically update state without refetching
    fetchTasks(selectedProject._id);   

    console.log("Task updated successfully");
  } catch (error) {
    console.error("Error updating task:", error);
  }
};




  return (
    <Box sx={{ flexGrow: 1, overflowY: "auto", padding: 3, width: "100%" }}>
      {/* Project Name */}
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        {selectedProject?.name}
      </Typography>

      {/* Buttons Section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}>
        {/* <Button variant="contained" sx={{ bgcolor: "#6C4EFF", color: "#fff" }} startIcon={<Add />}>
          Add New Task
        </Button> */}
<AddTaskButton projectId={selectedProject._id} onTaskAdded={handleTaskAdded} members={members} />

        <Button variant="outlined" startIcon={<FilterList />}>
          Filter
        </Button>
        <Button variant="outlined" startIcon={<Sort />}>
          Sort by
        </Button>
      </Box>

      {/* Task Columns */}
      <Grid container spacing={2} sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* To-Do Column */}
        <Grid item sx={{ flex: 1 }}>
          <ColumnHeader title="To Do" />
          {toDoTasks.map((task) => (
            <TaskCard key={task._id} task={task} onDelete={handleDeleteTask} onEdit={handleEditTask}/>
          ))}
        </Grid>

        {/* In Progress Column */}
        <Grid item sx={{ flex: 1 }}>
          <ColumnHeader title="In Progress" />
          {inProgressTasks.map((task) => (
            <TaskCard key={task._id} task={task} onDelete={handleDeleteTask} onEdit={handleEditTask} />
          ))}
        </Grid>

        {/* Done Column */}
        <Grid item sx={{ flex: 1 }}>
          <ColumnHeader title="Completed" />
          {completedTasks.map((task) => (
            <TaskCard key={task._id} task={task} onDelete={handleDeleteTask} onEdit={handleEditTask} />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

// Column Header Component
const ColumnHeader = ({ title }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 2,
      height: "50px",
      backgroundColor: "#f4f4f4",
      borderRadius: "8px",
      marginBottom: 2,
    }}
  >
    <Typography variant="subtitle2" fontWeight="bold">
      {title}
    </Typography>
    <Box>
      <IconButton size="small">
        <AddIcon fontSize="small" />
      </IconButton>
      <IconButton size="small">
        <MoreVertIcon fontSize="small" />
      </IconButton>
    </Box>
  </Box>
);

export default ProjectDashboard;
