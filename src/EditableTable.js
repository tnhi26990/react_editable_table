import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import {
    Box, Button, Snackbar, Table,
    TableBody, TableCell, TableHead, TableRow, TableContainer
} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from "@mui/material/styles";
import { tableCellClasses } from '@mui/material/TableCell';
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from '@mui/material/Paper';
import { orange, red, green, blue} from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.warning.light,
      color: theme.palette.common.white,
      fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

const theme = createTheme({
    palette: {
        primary: orange,
        secondary: red,
        customColors: {
            success: green,
            info: blue,
          },
    },
});

function EditableTable() {
    const [rows, setRows] = useState([ { id: 1, firstname: "", lastname: "", email: "" },
    ]);
    const [open, setOpen] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [disable, setDisable] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };
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

    const handleRemoveClick = (i) => {
        const list = [...rows];
        list.splice(i, 1);
        setRows(list);
        setShowConfirm(false);
        if (list.length === 0) {
            setEdit(false);
            setRows([ { id: 1, firstname: "", lastname: "", email: "" }]);
        }
    };

    const handleNo = () => {
        setShowConfirm(false);
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

    const handleConfirm = () => {
        setShowConfirm(true);
    };
 return (
        <>
        <Box margin={1}>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success">
                    Record saved successfully!
                </Alert>
            </Snackbar>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                {isEdit ? (
                    <div>
                        <Button onClick={handleAdd} color="info">
                            <AddIcon onClick={handleAdd} />
                            Add
                        </Button>
                        {rows.length !== 0 && (
                            <Button disabled={disable}  align="right" onClick={handleSave} color="success">
                                <DoneIcon />
                                Save
                            </Button>
                        )}  
                    </div>
                ) : (
                    <div>
                        <Button onClick={handleAdd} color="info">
                            <AddIcon onClick={handleAdd} />
                            Add
                        </Button>
                        <Button align="right" onClick={handleEdit} color="success">
                            <EditIcon />
                            Edit
                        </Button>
                    </div>
                )}
                </div>
            </div>
            <TableRow align="center"> </TableRow>
            </Box>
            <div style={{ display: "flex", justifyContent: "center" }}>
            <TableContainer component={Paper} sx={{maxWidth: 800}} padding={50}>
                <Table sx={{ columnCount: 50}}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell sx={{ width: 250 }}>First Name</StyledTableCell>
                        <StyledTableCell sx={{ width: 250 }}>Last Name</StyledTableCell>
                        <StyledTableCell sx={{ width: 250 }}>Email</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
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
                                            style={{ width: '80%' }}
                                        />
                                        </TableCell>
                                        <TableCell>
                                        <input
                                            value={row.lastname}
                                            name="lastname"
                                            onChange={(e) => handleInputChange(e, i)}
                                            style={{ width: '80%' }}
                                        />
                                        </TableCell>
                                        <TableCell>
                                        <input
                                            value={row.email}
                                            name="email"
                                            onChange={(e) => handleInputChange(e, i)}
                                            style={{ width: '80%' }}
                                        />
                                        </TableCell>
                                    </>
                                ) : (
                                    <>
                                        <TableCell>
                                            {row.firstname}
                                        </TableCell>
                                        <TableCell>
                                            {row.lastname}
                                        </TableCell>
                                        <TableCell>
                                            {row.email}
                                        </TableCell>
                                    </>
                                )}
                                {isEdit ? (
                                    <ThemeProvider theme={theme}>
                                    <Button onClick={handleConfirm} color="secondary">
                                        <ClearIcon />
                                    </Button>
                                    </ThemeProvider>
                                ) : (
                                    <ThemeProvider theme={theme}>
                                    <Button onClick={handleConfirm} color="secondary">
                                        <DeleteOutlineIcon />
                                    </Button>
                                    </ThemeProvider>
                                )}
                                {showConfirm && (
                                    <div>
                                        <Dialog
                                            open={showConfirm}
                                            onClose={handleNo}>
                                            <DialogTitle>
                                                {"Confirm Delete"}
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText >
                                                    Are you sure to delete it?
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button
                                                    onClick={() => 
                                                    handleRemoveClick(i)}
                                                    color="info"
                                                    autoFocus
                                                >
                                                Yes
                                                </Button>
                                                <Button
                                                    onClick={handleNo}
                                                    color="info"
                                                    autoFocus
                                                >
                                                No
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </div>
                                )}
                            </TableRow>
                        );
                    })}
            </TableBody>
            </Table>
            </TableContainer>
            </div>
            </>
 );
}

export default EditableTable;