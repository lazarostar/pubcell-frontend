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
  CircularProgress,
} from "@mui/material";

import { useQuery } from "react-query";
import { client } from "../utils";

export default function Functions({ projectName }) {
  const {
    isLoading,
    isError,
    data: projectInfo,
    error,
  } = useQuery(`project/${projectName}`, () =>
    client(`project/${projectName}`)
  );

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
              projectInfo.functions.map((row, i) => (
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
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
