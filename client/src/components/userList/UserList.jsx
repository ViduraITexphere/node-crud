import React, { useEffect, useState } from "react";
import "../../App.css";
import { Button, IconButton, Input } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EditModal from "../modals/detailsModal/EditModal";
import AddModal from "../modals/addModal/AddModal";
import "./UserList.css";
import toast, { Toaster } from "react-hot-toast";

// Table
import { styled, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

// Pagination
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import PropTypes from "prop-types";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// Table Styling
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: "#3cd684",
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "Russo One",
  },
  "&.MuiTableCell-body": {
    fontSize: 14,
    fontFamily: "Unbounded",
    textTransform: "capitalize",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "white",
    color: "white",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function UserList() {
  const [open, setOpen] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  // close Modal
  const handleClose = () => setOpen(false);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const [user, setUser] = useState([]);

  const handleOpen = (userData) => {
    setSelectedUser(userData);
    setOpen(true);
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("User deleted successfully");
        const newUser = user.filter((userData) => userData.id !== id);
        setUser(newUser);
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("An error occurred while deleting user");
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("http://localhost:5000/api/users");
      const data = await res.json();
      setUser(data);
    };
    getUser();
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - user.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div className="container">
        <Toaster position="top-right" reverseOrder={false} />
        <EditModal
          open={open}
          handleClose={handleClose}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        <AddModal
          open={openAddModal}
          handleCloseAddModal={handleCloseAddModal}
        />
        <h1>MERN CRUD Table 🔥</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>First Name</StyledTableCell>
                <StyledTableCell align="left">Last Name</StyledTableCell>
                <StyledTableCell align="left">Birth Date</StyledTableCell>
                <StyledTableCell align="left">Maritalstatus</StyledTableCell>
                <StyledTableCell align="left">Address</StyledTableCell>
                <StyledTableCell align="left">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? user.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : user
              ).map((userData, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {userData.firstname}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {userData.lastname}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {userData.birthdate}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {userData.maritalstatus}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {userData.address}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <IconButton onClick={() => handleOpen(userData)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(userData.id)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {emptyRows > 0 && (
                <StyledTableRow style={{ height: 53 * emptyRows }}>
                  <StyledTableCell colSpan={6} />
                </StyledTableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={user.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
      <div className="btn_wrapper">
        <Button
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
            fontFamily: "Russo One",
          }}
          onClick={handleOpenAddModal}
        >
          Add User
        </Button>
      </div>
    </>
  );
}

export default UserList;
