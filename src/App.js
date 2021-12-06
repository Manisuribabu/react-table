import React, { useState } from "react";

import Demo from "./Table";
import PostDetails from "./PostDetails";
import TodoDetails from "./TodoDetails"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

export default function EnhancedTable(props) {
  let postdata = [];

  const [dataDetails, setDataDetails] = useState([]);
 const [todoDetails,setTodoDetails]=useState([])
  const handlePostData = (e) => {
    if (postdata.length > 0) {
      let data = postdata.filter((item) => item.id === e.id);
      if (data.length === 0) {
        postdata.push(e);
      }
      console.log(postdata);
    } else {
      postdata.push(e);
    }
    setDataDetails(postdata);
    setTodoDetails(postdata);
  };

  // const handleTodoData = (e) => {
  //   debugger
  //   if (postdata.length > 0) {
  //     let data = postdata.filter((item) => item.id === e.id);
  //     if (data.length === 0) {
  //       postdata.push(e);
  //     }
  //     console.log(postdata);
  //   } else {
  //     postdata.push(e);
  //   }
  //   setTodoDetails(postdata);
  // };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Demo 
             onProductData={(e) => handlePostData(e)} />}  
          />

          <Route
            path="/post"
            
            element={<PostDetails dataDetails={dataDetails} />}
          />
          <Route
            path="/todo"
            
            element={<TodoDetails todoDetails={dataDetails} />}
          />
        </Routes>
      </Router>
    </>
    // <div className={classes.root}>
    //   <div className={classes.header}>
    //     <div className={classes.post}>Posts</div>

    //     <div className={classes.search}>
    //       <TextField
    //         placeholder="Search"
    //         type="text"
    //         variant="outlined"
    //         fullWidth
    //         size="small"
    //         onChange={(e) => setValue(e.target.value)}
    //         value={value}
    //         InputProps={{
    //           startAdornment: (
    //             <InputAdornment position="start">
    //               <SearchIcon onClick={() => handleSearch()} />
    //             </InputAdornment>
    //           ),

    //           endAdornment: value && (
    //             <IconButton
    //               aria-label="toggle password visibility"
    //               onClick={() => setValue("")}
    //             >
    //               <CancelRoundedIcon />
    //             </IconButton>
    //           ),
    //         }}
    //       />
    //     </div>
    //   </div>

    //   <Paper className={classes.paper}>

    //     <Demo
    //       rows={filterData}
    //       users={users}
    //       todos={todos}
    //       emptyRows={emptyRows}
    //       pageNumber={page}
    //       rowsPerPage={rowsPerPage}
    //     />
    //       <BrowserRouter>
    //   <>
    //       <Routes>
    //       <Route path="/products" component={Demo }/>

    //       </Routes>
    //       </>
    //       </BrowserRouter>

    //     <TablePagination
    //       rowsPerPageOptions={[5, 10, 25]}
    //       component="div"
    //       count={rows.length}
    //       rowsPerPage={rowsPerPage}
    //       page={page}
    //       onPageChange={handleChangePage}
    //       onRowsPerPageChange={handleChangeRowsPerPage}
    //     />
    //   </Paper>

    // </div>
  );
}
