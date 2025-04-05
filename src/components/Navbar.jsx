import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#122932", color: "white", padding: "5px" }}>
      <Toolbar>

        {/* Title/Logo */}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          TeamWise
        </Typography>

        {/* Right Side - Login/Signup Buttons */}
        <Box>
          {/* Left Side - Notification Icon */}
        <IconButton color="inherit">
          <Badge badgeContent={3} color="error" marginRight="12px">
            <NotificationsIcon marginRight="12px"/>
          </Badge>
        </IconButton>
          <Button variant="outlined" sx={{ color: "white", borderColor: "white", marginRight: 1 }}>
            Sign Out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
