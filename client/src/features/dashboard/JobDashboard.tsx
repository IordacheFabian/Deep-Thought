import { Box, Button, Typography } from "@mui/material";
import JobList from "./JobList";
import { Link } from "react-router";

export default function JobDashboard() {
  return (
    <Box
      sx={{
        minHeight: "20vh", // full viewport height
        minWidth: "100vh", // full viewport width
        display: "flex",
        justifyContent: "center", // center horizontally
        alignItems: "center", // center vertically
        p: 3,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 700 }}>
        <Typography variant="h4" gutterBottom display={"flex"} justifyContent={"center"}>
          Jobs
        </Typography>
        <JobList />
        <Button sx={{display: "flex", justifyContent: "end"}} component={Link} to="/ask">
          Ask something...
        </Button>
      </Box>
    </Box>
  );
}
