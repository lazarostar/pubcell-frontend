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
  Stack,
} from "@mui/material";

import { useQuery } from "react-query";
import { client } from "../utils";

function MongoCollections({ projectName, dbName, onRowClick }) {
  const {
    isLoading,
    isError,
    data: collections,
    error,
  } = useQuery(`${projectName}/mongodb/${dbName}`, () =>
    dbName
      ? client(`${projectName}/mongodb/${dbName}`, { _: true }).then(
          (response) => response.collections
        )
      : []
  );

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Collection Name</TableCell>
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
              <TableCell colSpan={3}>Error occured: {error.message}</TableCell>
            </TableRow>
          ) : (
            collections.map((row, i) => (
              <TableRow
                key={row}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                hover={true}
                onClick={() => onRowClick(row)}
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
  );
}

function MongoDocuments({ projectName, dbName, collectionName }) {
  const {
    isLoading,
    isError,
    data: documents,
    error,
  } = useQuery(`${projectName}/mongodb/${dbName}/${collectionName}`, () =>
    dbName && collectionName
      ? client(`${projectName}/mongodb/${dbName}/${collectionName}`, {_: true}).then(
          (response) => response.result
        )
      : []
  );

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Document</TableCell>
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
              <TableCell colSpan={3}>Error occured: {error.message}</TableCell>
            </TableRow>
          ) : (
            documents.map((row, i) => (
              <TableRow
                key={row}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                hover={true}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell>{JSON.stringify(row)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function MongoDBs({ projectName }) {
  const [dbName, setDbName] = React.useState("");
  const [collectionName, setCollectionName] = React.useState("");

  const {
    isLoading,
    isError,
    data: dbList,
    error,
  } = useQuery(`${projectName}/mongodb`, () =>
    client(`${projectName}/mongodb`, {_: true}).then(
      (response) => response.databases
    )
  );

  return (
    <Box>
      <Typography variant="h3">MongoDB</Typography>
      <Stack direction="row" spacing={2}>
        <TableContainer>
          <Table aria-label="simple table">
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
                    onClick={() => {
                      setDbName(row);
                      setCollectionName("");
                    }}
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
        <MongoCollections
          projectName={projectName}
          dbName={dbName}
          onRowClick={(selectedName) => setCollectionName(selectedName)}
        />
        <MongoDocuments
          projectName={projectName}
          dbName={dbName}
          collectionName={collectionName}
        />
      </Stack>
    </Box>
  );
}
