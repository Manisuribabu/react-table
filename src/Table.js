import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { Select, MenuItem, InputLabel } from "@material-ui/core";

import { fetchDataAPI, fetchUser, fetchTodos } from "./api";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     margin: 20,
//   },
//   paper: {
//     width: "100%",
//     marginBottom: theme.spacing(2),
//   },
//   input: {
//     marginLeft: theme.spacing(2),
//     flex: 1,
//   },
//   iconButton: {
//     padding: 5,
//   },

//   search: {
//     width: 272,
//   },
//   header: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   post: {
//     fontWeight: 700,
//   },
//   table: {
//     minWidth: 650,
//   },
// }));

export default function BasicTable(props) {
  // const  = useStyles();
  const navigate = useNavigate();
  const [userdata, setUserData] = React.useState(false);
  // const [tododata, setTodoData] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
const [todoDetails,setTodoDetails]=React.useState([]);
  const [value, setValue] = React.useState("");
  const [filterData, setFilterData] = React.useState([]);
  const [users, setUser] = React.useState([]);
  const [todos, setTodos] = React.useState([]);
  const [showPostData, setShowPostData] = React.useState(true);


  const switchTable =(e)=>{
    setShowPostData(e);
  }
 
  const fetchData = async () => {
    const data = await fetchDataAPI();
    setRows(data);
    setFilterData(data);
  };

  const getUsers = async () => {
    const users = await fetchUser();
    setUser(users);
  };
  const getTodos = async () => {
    const todos = await fetchTodos();
    setTodos(todos);
    setTodoDetails(todos);
  };
  React.useEffect(() => {
    fetchData();
    debugger
    getUsers();
    getTodos();
  }, []);

  const handleChangePage = (event, newPage) => {
    debugger
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    debugger
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = () => {
    const input = value.replace(/\s/g, "");
    const data = rows.filter((item) => {
      return (
        item.title.replace(/\s/g, "").includes(input) || item.id === +input || item.body.replace(/\s/g, "").includes(input) || item.id === +input
      );
    });
    setFilterData(data);
  };

  const handleUpdate = (userdata) => {
    if (userdata) {
      setUserData(false);
    } else {
      setUserData(true);
    }
  };

  function addDetails(postData, userData) {
    props.onProductData({ ...postData, ...userData });
    navigate("/post");
  }
  function addTodoDetails(todoData, userData2){
    debugger
    props.onTodoData({...todoData, ...userData2});
    navigate("/todo");
  }

  return (
    <>
      <div className="root">
        <div className="header">
          <div className="post">Posts</div>

          <div className="search">
            <TextField
              placeholder="Search"
              type="text"
              variant="outlined"
              fullWidth
              size="small"
              onChange={(e) => setValue(e.target.value)}
              value={value}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon onClick={() => handleSearch()} />
                  </InputAdornment>
                ),

                endAdornment: value && (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setValue("")}
                  >
                    <CancelRoundedIcon />
                  </IconButton>
                ),
              }}
            />
          </div>
        </div>
        <div className="check-div">
          <input type="checkbox" onClick={() => handleUpdate(userdata)} />
          UserDetails
        </div>
        <div className="select-style">
          <InputLabel>Posts:</InputLabel>
          <Select>
            <MenuItem onClick={()=>switchTable(true)} value="PS">
              Posts
            </MenuItem>
            <MenuItem onClick={()=>switchTable(false)} value="TS">
              Todos
            </MenuItem>
          </Select>
        </div>
        {showPostData ? ( //post Data
          <Paper >
            {filterData && (
              <TableContainer component={Paper}>
                <Table className="table" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      
                      <TableCell align="right">username</TableCell>
                      <TableCell align="right">email</TableCell>
                      <TableCell align="right">post title</TableCell>

                      <TableCell align="right">post body</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filterData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        // <a href="/products">
                        <TableRow
                          key={row.name}
                          onClick={() => addDetails(row, users[row.userId - 1])}
                        >
                          <TableCell align="right">
                            {userdata ? users[row.userId - 1].username : null}
                          </TableCell>
                          <TableCell align="right">
                            {userdata ? users[row.userId - 1].email : null}
                          </TableCell>

                          <TableCell align="right">{row.title}</TableCell>

                          <TableCell align="right">{row.body}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filterData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        ) : ( //todo data
          <Paper className="paper">
            {todoDetails && (
              <TableContainer component={Paper}>
                <Table className="table" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">username</TableCell>
                      <TableCell align="right">email</TableCell>
                      <TableCell align="right">todo title</TableCell>

                      <TableCell align="right">Completed</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {todoDetails
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        // <a href="/products">
                        <TableRow
                          key={row.name}
                          onClick={() => addDetails(row, users[row.userId - 1])}
                        >
                          <TableCell align="right">
                            {userdata ? users[row.userId - 1].username : null}
                          </TableCell>
                          <TableCell align="right">
                            {userdata ? users[row.userId - 1].email : null}
                          </TableCell>

                          <TableCell align="right">
                            {todos[row.userId - 1].title}
                          </TableCell>

                          <TableCell align="right">
                            {todos[row.userId - 1].completed
                              ? "completed"
                              : "not completed"}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={todoDetails.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </div>

      <div></div>
    </>
  );
}
//todos[row.id-1].title
