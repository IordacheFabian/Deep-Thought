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
      <Box sx={{ width: "100%", maxWidth: 700, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h4" gutterBottom display={"flex"} justifyContent={"center"}>
          Jobs
        </Typography>
        <JobList />
        <Button sx={{
          width: "50%",
          display: "flex", 
          justifyContent: "end",
          background: "linear-gradient(90deg, #262626ff 0%, #848484ff 100%)",
          color: "white",
          borderRadius: 3,
          px: 2.5,
          py: 0.6,
          mt: 2,
          boxShadow: "0 6px 18px rgba(59, 59, 59, 0.16)",
          textTransform: "none",
          fontWeight: 700,
          transition: "transform 120ms ease, box-shadow 120ms ease",
          "&:hover": {
            boxShadow: "0 10px 28px rgba(41,182,246,0.22)",
            transform: "translateY(-2px)",
            background: "linear-gradient(90deg, #959595ff 0%, #303030ff 100%)",
            color: "white",
          },}} component={Link} to="/ask">
          Ask something...
        </Button>
      </Box>
    </Box>
  );
}
