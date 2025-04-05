import { Link } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";

const WelcomePage = () => {
    return (
        <Box sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h3">Welcome to Task Management</Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>Organize your tasks and projects efficiently</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 3 }} component={Link} to="/login">Login</Button>
        </Box>
    );
};

export default WelcomePage;
