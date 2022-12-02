import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Box, Tabs, Tab } from "@mui/material";
import Functions from "../components/Functions";

function Project() {
  const { projectName } = useParams();

  return (
    <Container>
      <Typography variant="h2">Project: {projectName}</Typography>
      <Functions projectName={projectName} />
    </Container>
  );
}

export default Project;
