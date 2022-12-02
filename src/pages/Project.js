import React from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import Functions from "../components/Functions";

function Project() {
  const { projectName } = useParams();

  return (
    <Container>
      <Typography variant="h2" align="center">Project: {projectName}</Typography>
      <Functions projectName={projectName} />
    </Container>
  );
}

export default Project;
