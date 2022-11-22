import { useLoaderData } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TaskDialog from "./TaskDialog";
import { Link } from "react-router-dom";

export default function TasksTable() {
  const rows = useLoaderData()

  return (
    <TableContainer>
      <Table size="medium" aria-label="tasks table">
        <TableHead>
          <TableRow>
            <h2>Lista de Tareas</h2>
          </TableRow>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Word Length</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Assignee</TableCell>
            <TableCell align="right">Translator</TableCell>
            <TableCell align="right">Update Date</TableCell>
            <TableCell align="right">Due Date</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (  
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <Link to={"/tasks/" + row.id}> {row.payload} </Link>
              </TableCell>
              <TableCell align="right">{row.word_length}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.assignee ? row.assignee.name : "" }</TableCell>
              <TableCell align="right">{row.translator ? row.translator.name : "" }</TableCell>
              <TableCell align="right">{row.update_time}</TableCell>
              <TableCell align="right">{row.due_date}</TableCell>
              <TableCell>
                <TaskDialog
                  id={row.id}
                  payload={row.payload}
                  url={row.url}
                  word_length={row.word_length}
                  due_date={row.due_date}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
