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

export default function RedisDBs({ projectName }) {
  const {
    isLoading,
    isError,
    data: pairs,
    error,
  } = useQuery(`${projectName}/redisdb`, () =>
    client(`${projectName}/redisdb`, {_: true})
  );

  return (
    <Box>
      <Typography variant="h3">RedisDB</Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Key</TableCell>
              <TableCell>Value</TableCell>
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
              pairs.keys.map((key, i) => (
                <TableRow
                  key={key}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  hover={true}
                >
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell>{key}</TableCell>
                  <TableCell>{pairs.values[i]}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
