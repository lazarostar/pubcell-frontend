import * as React from "react";
import { Typography, Button, CircularProgress, Box } from "@mui/material";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Project from "./pages/Project";
import { client } from "./utils";

function App() {
  const [reloading, setReloading] = React.useState(false);

  const reload = async () => {
    setReloading(true);

    await client("reload");
    setReloading(false);
  };

  return (
    <div>
      <Link to="/">
        <Typography variant="h1" align="center">
          Pubcell
        </Typography>
      </Link>
      <Box sx={{ position: "absolute", right: 5, top: 5 }}>
        {reloading ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" color="warning" onClick={reload}>
            Reload
          </Button>
        )}
      </Box>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:projectName" element={<Project />} />
      </Routes>
    </div>
  );
}

export default App;
