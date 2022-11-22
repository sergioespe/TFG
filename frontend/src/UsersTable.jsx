import { useLoaderData } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import UserDialog from './UserDialog';
import http from './http';


export default function UsersTable() {
  const rows = useLoaderData()

  return (
    <TableContainer>
      <TableRow>
        <h2>Lista de Usuarios</h2>
      </TableRow>
      <Table size="medium" aria-label="tasks table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Max Words</TableCell>
            <TableCell align="right">Current Avaliability</TableCell>
            <TableCell align="right">Last Assignment</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.role}</TableCell>
              <TableCell align="right">{row.max_words}</TableCell>
              <TableCell align="right">{row.current_availability}</TableCell>
              <TableCell align="right">{row.last_assignment}</TableCell>
              <TableCell>
                <UserDialog 
                  id={row.id}
                  name={row.name}
                  email={row.email}
                  role={row.role}
                  max_words={row.max_words}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
