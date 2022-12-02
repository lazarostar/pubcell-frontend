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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";

import { useQuery, useMutation, useQueryClient } from "react-query";
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
      ? client(`${projectName}/mongodb/${dbName}/${collectionName}`, {
          _: true,
        }).then((response) => response.result)
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
  const queryClient = useQueryClient();

  const [dbName, setDbName] = React.useState("");
  const [collectionName, setCollectionName] = React.useState("");

  const [newCollectionOpen, setNewCollectionOpen] = React.useState(false);
  const [newDocumentOpen, setNewDocumentOpen] = React.useState(false);

  const [newDbName, setNewDbName] = React.useState("");
  const [newCollectionName, setNewCollectionName] = React.useState("");
  const [newDocument, setNewDocument] = React.useState("");

  const handleCloseNewCollection = () => {
    setNewCollectionOpen(false);
  };
  const handleCloseNewDocument = () => {
    setNewDocumentOpen(false);
  };

  const {
    isLoading,
    isError,
    data: dbList,
    error,
  } = useQuery(`${projectName}/mongodb`, () =>
    client(`${projectName}/mongodb`, { _: true }).then(
      (response) => response.databases
    )
  );

  const { isLoading: isCollectionMutationLoading, mutate: addCollection } =
    useMutation(
      ({ newDbName, newCollectionName }) =>
        client(`${projectName}/mongodb/${newDbName}`, {
          data: {
            collection_name: newCollectionName,
          },
          _: true,
        }),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(`${projectName}/mongodb/${newDbName}`);
        },
      }
    );
  const { isLoading: isDocumentMutationLoading, mutate: addDocument } =
    useMutation(
      ({ newDbName, newCollectionName, newDocument }) =>
        client(`${projectName}/mongodb/${newDbName}/${newCollectionName}`, {
          data: {
            document: JSON.parse(newDocument),
          },
          _: true,
        }),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(
            `${projectName}/mongodb/${newDbName}/${newCollectionName}`
          );
        },
      }
    );

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h3">MongoDB</Typography>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Button
            variant="contained"
            onClick={() => setNewCollectionOpen(true)}
          >
            New Collection
          </Button>
          <Button variant="contained" onClick={() => setNewDocumentOpen(true)}>
            New Document
          </Button>
        </Stack>
      </Stack>
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
                      setNewDbName(row);
                      setCollectionName("");
                      setNewCollectionName("");
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
          onRowClick={(selectedName) => {
            setCollectionName(selectedName);
            setNewCollectionName(selectedName);
          }}
        />
        <MongoDocuments
          projectName={projectName}
          dbName={dbName}
          collectionName={collectionName}
        />
      </Stack>

      <Dialog open={newCollectionOpen} onClose={handleCloseNewCollection}>
        <DialogTitle>Add New Collection</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add new collection, please enter your collection name here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="DB Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNewDbName(e.target.value)}
            value={newDbName}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Collection Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNewCollectionName(e.target.value)}
            value={newCollectionName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewCollection}>Cancel</Button>
          <Button
            onClick={() => {
              addCollection({ newDbName, newCollectionName });
              setNewCollectionOpen(false);
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={newDocumentOpen} onClose={handleCloseNewDocument}>
        <DialogTitle>Add New Document</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add new document, please enter document in json format.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="DB Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNewDbName(e.target.value)}
            value={newDbName}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Collection Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNewCollectionName(e.target.value)}
            value={newCollectionName}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Document"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNewDocument(e.target.value)}
            value={newDocument}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewDocument}>Cancel</Button>
          <Button
            onClick={() => {
              addDocument({ newDbName, newCollectionName, newDocument });
              setNewDocumentOpen(false);
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
