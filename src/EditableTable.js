import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
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
    const [rows, setRows] = useState([ { id: 1, firstname: "", lastname: "", email: "" },
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
    const handleSave = () => {
        setEdit(!isEdit);
        setRows(rows);
        console.log("saved : ", rows);
        setDisable(true);
        setOpen(true);
    };

    const handleEdit = (i) => {
        setEdit(!isEdit);
    };
 return (
        <TableBody>
        <Box margin={1}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                {isEdit ? (
                    <div>
                        <Button onClick={handleAdd}>
                            <AddIcon onClick={handleAdd} />
                            Add
                        </Button>
                        {rows.length !== 0 && (
                            <Button disabled={disable}  align="right" onClick={handleSave}>
                                <DoneIcon />
                                Save
                            </Button>
                        )}
                    </div>
                ) : (
                    <div>
                        <Button onClick={handleAdd}>
                            <AddIcon onClick={handleAdd} />
                            Add
                        </Button>
                        <Button align="right" onClick={handleEdit}>
                            <EditIcon />
                            Edit
                        </Button>
                    </div>
                )}
                </div>
            </div>
            <TableRow align="center"> </TableRow>
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
                            <TableRow key={row.id}> 
                                {isEdit ? (
                                <>
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
                                        name="email"
                                        onChange={(e) => handleInputChange(e, i)}
                                        style={{ width: '70%' }}
                                    />
                                </TableCell>
                                </>
                                ) : (
                                    <>
                                        <TableCell component="th" scope="row">
                                                    {row.firstname}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {row.lastname}
                                                </TableCell>
                                                <TableCell component="th"
                                                           scope="row"
                                                           align="center">
                                                    {row.email}
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    align="center"
                                                ></TableCell>
                                            </>
                                )}
                            </TableRow>
                    );
                })}
            </TableBody>
        </Table>
        </TableContainer>
        </Box>
        </TableBody>
 );
}

export default EditableTable;