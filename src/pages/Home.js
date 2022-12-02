import React from "react";
import {
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const rows = [
  {
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
  },
  {
    _id: "6389dcf6b3b7ec848c648b5e",
    project_name: "second-app",
    functions: [
      {
        name: "add3",
        parameters: [
          { name: "a", default: null },
          { name: "b", default: null },
          { name: "c", default: null },
        ],
        body: "return ((a + b) + c)",
      },
    ],
  },
  {
    _id: "6389e73e40e1b4eea75a6b7a",
    project_name: "third-app",
    functions: [
      {
        name: "multiply",
        parameters: [
          { name: "a", default: null },
          { name: "b", default: null },
        ],
        body: "return (a * b)",
      },
    ],
  },
];

function Home() {
  const navigate = useNavigate()

  return (
    <Container>
      <Typography variant="h2">Projects</Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell align="right">Functions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                hover={true}
                onClick={() => {navigate(`/project/${row.project_name}`)}}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell>{row.project_name}</TableCell>
                <TableCell align="right">{row.functions.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Home;
