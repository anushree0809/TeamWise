import React, { useState } from "react";
import { Card, CardContent, Typography, Chip, Avatar, Box, IconButton, TextField } from "@mui/material";
import { Delete, Edit, CheckCircle, Cancel } from "@mui/icons-material";

const priorityColors = {
  Low: "#4CAF50",
  Medium: "#FFC107",
  High: "#F44336",
};

const TaskCard = ({ task, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  return (
    <Card sx={{ backgroundColor: "#122932", color: "#E0E0E0", borderRadius: "12px", padding: 2, boxShadow: 4, marginBottom: 2 }}>
      
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Chip label={task.priority} sx={{ backgroundColor: priorityColors[task.priority], color: "#fff", fontWeight: "bold" }} />
        <Typography variant="body2" color="#B0BEC5">
          {new Date(task.createdAt).toDateString()}
        </Typography>
      </Box>

      {isEditing ? (
        <>
          <TextField
            fullWidth
            variant="outlined"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            sx={{ marginTop: 1, backgroundColor: "#1E1E1E", color: "#fff", borderRadius: "5px" }}
            InputProps={{ style: { color: "#E0E0E0" } }}
          />
          <TextField
            fullWidth
            variant="outlined"
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            sx={{ marginTop: 1, backgroundColor: "#1E1E1E", color: "#fff", borderRadius: "5px" }}
            InputProps={{ style: { color: "#E0E0E0" } }}
          />
        </>
      ) : (
        <>
          <Typography variant="h6" sx={{ marginTop: 1, color: "#FFFFFF" }}>{task.title}</Typography>
          <Typography variant="body2" color="#B0BEC5">{task.description}</Typography>
        </>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
        {task.assignedTo && (
          <Avatar 
            key={task.assignedTo._id} 
            src={task.assignedTo.imageUrl} 
            alt={task.assignedTo.name} 
            sx={{ width: 32, height: 32, border: "2px solid #424242" }} 
          />
        )}

        <Box>
          {isEditing ? (
            <>
              <IconButton onClick={handleSave} sx={{ color: "#4CAF50" }}>
                <CheckCircle />
              </IconButton>
              <IconButton onClick={() => setIsEditing(false)} sx={{ color: "#F44336" }}>
                <Cancel />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton onClick={() => setIsEditing(true)} sx={{ color: "#FFC107" }}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => onDelete(task._id)} sx={{ color: "#F44336" }}>
                <Delete />
              </IconButton>
            </>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default TaskCard;
