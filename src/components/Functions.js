import React from "react";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";

const projectInfo = {
  _id: "6389dc1db3b7ec848c648b5d",
  project_name: "first-app",
  functions: [
    {
      name: "add",
      parameters: [
        { name: "a", default: null },
        { name: "b", default: null },
      ],
      body: "return (a + b)",
    },
    {
      name: "subtract",
      parameters: [
        { name: "a", default: null },
        { name: "b", default: null },
      ],
      body: "return (a - b)",
    },
  ],
};

export default function Functions({ projectName }) {
  return (
    <Box>
      <Typography variant="h3">Functions</Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Function Name</TableCell>
              <TableCell>Parameters</TableCell>
              <TableCell>Body</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projectInfo.functions.map((row, i) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                hover={true}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  {row.parameters.map((param) => param.name).join(", ")}
                </TableCell>
                <TableCell>{row.body}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
