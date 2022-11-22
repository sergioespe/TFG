import { useState, forwardRef, ChangeEvent } from 'react';
import http from './http';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TaskDialog(props) {
    const [open, setOpen] = useState(false);
    const [payload, setPayload] = useState(props.payload);
    const [url, setUrl] = useState(props.url);
    const [word_length, setWordLength] = useState(props.word_length);
    const [due_date, setDueDate] = useState(props.due_date || new Date("2022-07-10"));
  
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleCloseAndSubmit = () => {
      setOpen(false);
      const data = {payload, url, word_length, due_date};
      updateTask(data);
      location.reload();
    }
  
    const handleClose = () => {
      setOpen(false);
    };

    const handlePayload = (event) => {
      setPayload(event.target.value);
    };

    const handleUrl = (event) => {
      setUrl(event.target.value);
    };

    const handleWordLength = (event) => {
      setWordLength(parseInt(event.target.value));
    };

    const handleDueDate = (event) => {
      setDueDate(new Date(event.target.value));
    };

    const updateTask = async (data) => {
      const id = props.id;
      const res = await http.put("tasks/" + id, data);
      return res.json();
    };

  
    return (
      <div>
        <Button onClick={handleClickOpen}>
          Editar
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          onClose={handleClose}
          aria-labelledby="edit-apartment"
        >
          <DialogTitle id="edit-apartment">Editar</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Por favor, edita los campos de la tarea
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Texto"
              value={payload}
              onChange={handlePayload}
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              label="URL"
              value={url}
              onChange={handleUrl}
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              label="Longitud (palabras)"
              value={word_length}
              onChange={handleWordLength}
              type="number"
              fullWidth
            />
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
              Cancel
            </Button>
            <Button onClick={handleCloseAndSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }