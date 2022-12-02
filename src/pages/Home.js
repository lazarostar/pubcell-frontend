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
  CircularProgress,
} from "@mui/material";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { client } from "../utils";

function Home() {
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    data: rows,
    error,
  } = useQuery("project", () => client("project"));

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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={3}>
                  Error occured: {error.message}
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, i) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  hover={true}
                  onClick={() => {
                    navigate(`/project/${row.project_name}`);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell>{row.project_name}</TableCell>
                  <TableCell align="right">{row.functions.length}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Home;
