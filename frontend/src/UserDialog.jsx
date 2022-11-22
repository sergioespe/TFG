import { useState, forwardRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Slide from '@mui/material/Slide';
import http from './http';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserDialog(props) {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [name, setName] = useState(props.name);
    const [email, setEmail] = useState(props.email);
    const [role, setRole] = useState(props.role);
    const [max_words, setMaxWords] = useState(props.max_words);
  
    const handleClickOpenEdit = () => {
      setOpenEdit(true);
    };

    const handleClickOpenDelete = () => {
      setOpenDelete(true);
    }

    const handleCloseEditAndSubmit = async () => {
      setOpenEdit(false);
      const data = {name, email, role, max_words};
      await updateUser(data);
      location.reload();
    }

    const handleCloseDeleteAndSubmit = async () => {
      setOpenDelete(false);
      await deleteUser();
      location.reload();
    }
  
    const handleCloseEdit = () => {
      setOpenEdit(false);
    };

    const handleCloseDelete = () => {
      setOpenDelete(false);
    }

    const handleName = (event) => {
      setName(event.target.value);
    }

    const handleEmail = (event) => {
      setEmail(event.target.value);
    }

    const handleMaxWords = (event) => {
      setMaxWords(parseInt(event.target.value));
    }

    const handleRole = (event) => {
      setRole(event.target.value);
    };


    const updateUser = async (data) => {
      const id = props.id;
      await http.put("users/" + id, data);
    };

    const deleteUser = async () => {
      const id = props.id;
      await http.delete("users/" + id);
    };

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
      <div>
        <Button onClick={handleClickOpenEdit}>
          Editar
        </Button>
        <Button onClick={handleClickOpenDelete} sx={{color: "red"}}>
          Borrar
        </Button>
        <Dialog
          open={openEdit}
          TransitionComponent={Transition}
          onClose={handleCloseEdit}
          aria-labelledby="edit-apartment"
        >
          <DialogTitle id="edit-apartment">Editar</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Por favor, edita los campos del usuario
            </DialogContentText>
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
              id="floor"
              label="Correo"
              defaultValue={email}
              onChange={handleEmail}
              type="text"
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
            <Button onClick={handleCloseEdit} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleCloseEditAndSubmit} color="primary">
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDelete}
          TransitionComponent={Transition}
          onClose={handleCloseDelete}
          aria-labelledby="edit-apartment"
        >
          <DialogContentText sx={{width: "500px", padding: "10px"}}>
              <br></br>
              ¿Estás seguro que deseas eliminar?
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleCloseDelete} color="primary">
              NO
            </Button>
            <Button onClick={handleCloseDeleteAndSubmit} sx={{color: "red"}}>
              SI
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }