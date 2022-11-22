import { Button } from "@mui/material";
import UsersTable from "./UsersTable";
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

export default function UsersView() {
    const [open, setOpen] = useState(false);
    const [id_slack, setIdSlack] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [max_words, setMaxWords] = useState(2000);
    const [role, setRole] = useState("WORKER");

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleCloseAndSubmit = () => {
        setOpen(false);
        const data = {id_slack, name, email, password, max_words, role}
        createUser(data);
        location.reload();
    }

    const createUser = async (data) => {
        const res = await http.post("users", data);
        return res.json();
      };

    const handleIdSlack = (event) => {
        setIdSlack(event.target.value)
    }

    const handleName = (event) => {
        setName(event.target.value)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleMaxWords = (event) => {
        setMaxWords(parseInt(event.target.value))
    }

    const handleRole = (event) => {
        setRole(event.target.value)
    }

    const roleOptions = [
        {
          value: 'WORKER',
          label: 'Worker'
        },
        {
          value: 'MANAGER',
          label: 'Manager'
        }
      ]

    return (
        <>
            <UsersTable />
            <Button onClick={handleClickOpen} 
                sx={{ 
                    width: "100%",
                    marginTop: "20px"
                     }}>
                Crear usuario
            </Button>
            <Dialog
            open={open}
            TransitionComponent={Transition}
            onClose={handleClose}
            aria-labelledby="edit-apartment"
            >
                <DialogTitle id="edit-apartment">Crear usuario</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Por favor, añada los campos del usuario
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="id_slack"
              label="ID_SLACK"
              value={id_slack}
              onChange={handleIdSlack}
              type="number"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nombre"
              defaultValue={name}
              onChange={handleName}
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="correo"
              label="Correo"
              onChange={handleEmail}
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="correo"
              label="Contraseña"
              onChange={handlePassword}
              type="password"
              fullWidth
            />
            <TextField
              select
              margin="dense"
              label="Selecciona rol"
              fullWidth
              value={role}
              onChange={handleRole}
            >
              {roleOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              autoFocus
              margin="dense"
              id="floor"
              label="Max Words"
              defaultValue={max_words}
              onChange={handleMaxWords}
              type="number"
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