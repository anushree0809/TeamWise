import { useState, useEffect } from "react";
import { Button, Dialog, DialogTitle, DialogContent, TextField, MenuItem, Select, InputLabel, FormControl, DialogActions } from "@mui/material";
import { Add } from "@mui/icons-material";
import axios from "axios";

const AddTaskButton = ({ projectId, onTaskAdded, members  }) => {
  console.log("memebrs",members);
  const [open, setOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "To Do",
    priority: "Medium",
    assignedTo: "",
  });

  //const [members, setMembers] = useState([]);

  // Fetch project members
  // console.log("open",open)
  // useEffect(() => {
  //   if (open) {
  //     axios.get(`http://localhost:3000/api/projects/user/project/${projectId}`)
  //     .then((response) => {
  //       console.log("API Response:", response.data);
  //       setMembers(response.data.members); // this will now contain proper name + _id
  //     })
  //       .catch((error) => console.error("Error fetching members:", error));
  //   }
  // }, [open, projectId]);
  // console.log("members:",members);

  // Handle input changes
  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!projectId) {
        console.error("Error: projectId is undefined");
        return;  // Prevent API call if projectId is missing
    }

    try {
        console.log("Sending request with projectId:", projectId);
        console.log("Task Data:", taskData);

        await axios.post(`http://localhost:3000/api/tasks/project/${projectId}`, 
            { ...taskData, projectId }
        );

        onTaskAdded(); // Refresh tasks after adding
        setOpen(false);
    } catch (error) {
        console.error("Error adding task:", error.response ? error.response.data : error);
    }
};


  return (
    <>
      {/* Add Task Button */}
      <Button variant="contained" sx={{ bgcolor: "#7F9183", color: "#fff" }} startIcon={<Add />} onClick={() => setOpen(true)}>
        Add New Task
      </Button>

      {/* Dialog for Adding Task */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Title" name="title" value={taskData.title} onChange={handleChange} margin="dense" />
          <TextField fullWidth label="Description" name="description" value={taskData.description} onChange={handleChange} margin="dense" multiline rows={3} />

          {/* Priority Dropdown */}
          <FormControl fullWidth margin="dense">
            <InputLabel>Priority</InputLabel>
            <Select name="priority" value={taskData.priority} onChange={handleChange}>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>

          {/* Status Dropdown */}
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select name="status" value={taskData.status} onChange={handleChange}>
              <MenuItem value="To Do">To Do</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>

          {/* Assigned To Dropdown */}
          <FormControl fullWidth margin="dense">
            <InputLabel>Assign To</InputLabel>
            <Select
  name="assignedTo"
  value={taskData.assignedTo}
  onChange={(e) => setTaskData({ ...taskData, assignedTo: e.target.value })}
>
  {members.map((member) => (
    <MenuItem key={member._id} value={member._id}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img 
          src={member.imageUrl || "default-avatar.png"} 
          alt={member.name} 
          style={{ width: 30, height: 30, borderRadius: "50%", marginRight: 8 }} 
        />
        {member.name}
      </div>
    </MenuItem>
  ))}
</Select>

          </FormControl>
        </DialogContent>

        {/* Dialog Actions */}
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">Add Task</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddTaskButton;
