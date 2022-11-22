import { Button } from "@mui/material";
import TasksTable from "./TasksTable";
import { useState, forwardRef } from "react";
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from "@mui/material/MenuItem";
import http from './http';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function TasksView() {
    const [open, setOpen] = useState(false);
    const [payload, setPayload] = useState("");
    const [url, setUrl] = useState("");
    const [word_length, setWordLength] = useState(0);
    const [status, setStatus] = useState("PENDING");
    const [due_date, setDueDate] = useState(new Date(Date.now()));

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleCloseAndSubmit = () => {
        setOpen(false);
        const data = {payload, url, word_length, status, due_date}
        createTask(data);
        location.reload();
    }

    const createTask = async (data) => {
        const res = await http.post("tasks", data);
        return res.json();
    };

    const handlePayload = (event) => {
        setPayload(event.target.value)
    }

    const handleUrl = (event) => {
        setUrl(event.target.value)
    }

    const handleWordLength = (event) => {
        setWordLength(parseInt(event.target.value))
    }

    const handleStatus = (event) => {
        setStatus(event.target.value)
    }

    const handleDueDate = (event) => {
        setDueDate(new Date(event.target.value))
    }

   

    const statusOptions = [
        {
          value: 'PENDING',
          label: 'Pending'
        },
        {
          value: 'REVIEW',
          label: 'Review'
        },
        {
          value: 'COMPLETED',
          label: 'Completed'
        }
      ]

    return (
        <>
            <TasksTable />
            <Button onClick={handleClickOpen} 
                sx={{ 
                    width: "100%",
                    marginTop: "20px"
                     }}>
                Crear tarea
            </Button>
            <Dialog
            open={open}
            TransitionComponent={Transition}
            onClose={handleClose}
            aria-labelledby="edit-apartment"
            >
                <DialogTitle id="edit-apartment">Crear tarea</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Por favor, añada los campos de la tarea
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="payload"
              label="Texto"
              value={payload}
              onChange={handlePayload}
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="url"
              label="URL"
              value={url}
              onChange={handleUrl}
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="word_length"
              label="Longitud (palabras)"
              onChange={handleWordLength}
              type="number"
              fullWidth
            />
            <TextField
              select
              margin="dense"
              id="status"
              label="Status"
              fullWidth
              value={status}
              onChange={handleStatus}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="dense"
              label="Fecha de entrega"
              defaultValue={due_date}
              onChange={handleDueDate}
              type="datetime-local"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleCloseAndSubmit} color="primary">
              Aceptar
            </Button>
          </DialogActions>
            </Dialog>
        </>
    )
}