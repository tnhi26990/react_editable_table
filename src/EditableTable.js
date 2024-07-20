import React, { useState } from "react";
import CreateIcon from "@mui/material";
import {
    Box, Button, Snackbar, Table,
    TableBody, TableCell, TableHead, TableRow, TableContainer
} from "@mui/material";
import DeleteOutlineIcon from "@mui/material/";
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from '@mui/material/TableCell';
import Alert from "@mui/material";
import Dialog from "@mui/material";
import DialogActions from "@mui/material";
import DialogContent from "@mui/material";
import DialogContentText from "@mui/material";
import DialogTitle from "@mui/material";
import Paper from '@mui/material/Paper';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.info.light,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));


function EditableTable() {
    const [rows, setRows] = useState([
        { id: 1, firstname: "", lastname: "", email: "" },
    ]);
    const [open, setOpen] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [disable, setDisable] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleAdd = () => {
        setRows([
            ...rows,
            {
                id: rows.length + 1, firstname: "",
                lastname: "", email: ""
            },
        ]);
        setEdit(true);
    };

    const handleInputChange = (e, index) => {
        setDisable(false);
        const { name, value } = e.target;
        const list = [...rows];
        list[index][name] = value;
        setRows(list);
    };
 return (
    <div>
        <Box margin={3} sx={{ border: '2px solid green' }} width={170}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button onClick={handleAdd}>
                    <AddIcon onClick={handleAdd} />
                    Add
                </Button>
                <Button>
                    <DoneIcon />
                    Save
                </Button>
            </div>
        </Box>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
        <TableContainer component={Paper} sx={{maxWidth: 800}} padding={50}>
        <Table sx={{ columnCount: 50}}>
            <TableHead>
                <TableRow>
                    <StyledTableCell sx={{ width: 200 }}>First Name</StyledTableCell>
                    <StyledTableCell sx={{ width: 200 }}>Last Name</StyledTableCell>
                    <StyledTableCell sx={{ width: 200 }}>Email</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row, i) => {
                    return (
                            <TableRow> 
                                <TableCell>
                                    <input
                                        value={row.firstname}
                                        name="firstname"
                                        onChange={(e) => handleInputChange(e, i)}
                                        style={{ width: '70%' }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <input
                                        value={row.lastname}
                                        name="lastname"
                                        onChange={(e) => handleInputChange(e, i)}
                                        style={{ width: '70%' }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <input
                                        value={row.email}
                                        name="city"
                                        onChange={(e) => handleInputChange(e, i)}
                                        style={{ width: '70%' }}
                                    />
                                </TableCell>
                            </TableRow>
                    );
                })}
            </TableBody>
        </Table>
        </TableContainer>
        </div>
    </div>
 );
}

export default EditableTable;