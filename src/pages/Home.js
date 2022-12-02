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
import { useNavigate } from "react-router-dom";
import { client } from "../utils";

function Home() {
  const [open, setOpen] = React.useState(false);
  const [newProjectName, setNewProjectName] = React.useState("");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: rows,
    error,
  } = useQuery("project", () => client("project"));

  const handleAddNew = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { isLoading: isMutationLoading, mutate: addProject } = useMutation(
    (projectName) =>
      client("project", {
        data: {
          project_name: projectName,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("project");
      },
    }
  );

  return (
    <Container>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h2">Projects</Typography>
        {isMutationLoading ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" onClick={handleAddNew}>
            Add New Project
          </Button>
        )}
      </Stack>
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add new project, please enter your project name here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="newProjectName"
            label="Project Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNewProjectName(e.target.value)}
            value={newProjectName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              addProject(newProjectName);
              setOpen(false);
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Home;
