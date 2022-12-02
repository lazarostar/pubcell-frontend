import * as React from "react";
import { Typography } from "@mui/material";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Project from "./pages/Project";

function App() {
  return (
    <div>
      <Link to="/">
        <Typography variant="h1" align="center">
          Pubcell
        </Typography>
      </Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:projectName" element={<Project />} />
      </Routes>
    </div>
  );
}

export default App;
