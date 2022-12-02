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

export default function RedisDBs({ projectName }) {
  const [open, setOpen] = React.useState(false);

  const [newKey, setNewKey] = React.useState("");
  const [newValue, setNewValue] = React.useState("");

  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: pairs,
    error,
  } = useQuery(`${projectName}/redisdb`, () =>
    client(`${projectName}/redisdb`, { _: true })
  );

  const { isLoading: isMutationLoading, mutate: addKeyValue } = useMutation(
    ({ newKey, newValue }) =>
      client(`${projectName}/redisdb`, {
        data: {
          key: newKey,
          value: newValue,
        },
        _: true,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`${projectName}/redisdb`);
      },
    }
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h3">RedisDB</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          New Key/Value
        </Button>
      </Stack>
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add new project, please enter your project name here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Key"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNewKey(e.target.value)}
            value={newKey}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Value"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNewValue(e.target.value)}
            value={newValue}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              addKeyValue({ newKey, newValue });
              setOpen(false);
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
