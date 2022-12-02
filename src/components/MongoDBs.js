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

export default function MongoDBs({ projectName }) {
  const {
    isLoading,
    isError,
    data: dbList,
    error,
  } = useQuery(`${projectName}/mongodb`, () =>
    client(`${projectName}/mongodb`, true).then(
      (response) => response.databases
    )
  );

  return (
    <Box>
      <Typography variant="h3">MongoDB</Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>DB Name</TableCell>
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
              dbList.map((row, i) => (
                <TableRow
                  key={row}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  hover={true}
                >
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell>{row}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
