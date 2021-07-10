import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import CreateIcon from '@material-ui/icons/Create';
import react from 'react';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import InputBase from "@material-ui/core/InputBase";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const headCells = [
  { id: 'postId', numeric: false, disablePadding: true, label: 'Post Id' },
  { id: 'title', numeric: true, disablePadding: true, label: 'Title' },
  { id: 'user', numeric: true, disablePadding: false, label: 'Users' },
  { id: 'action', numeric: true, disablePadding: false, label: 'Actions' },
];

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={'normal'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          posts
        </Typography>
      )}
      <Paper component="form" className={classes.root}>
        <IconButton className={classes.iconButton} aria-label="menu">
          <SearchIcon />
        </IconButton>
        <InputBase className={classes.input} placeholder="Search " />
      </Paper>
    </Toolbar>

  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 20
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },

  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper2: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: 400,
    width: 530
  },
  // root: {
  //   padding: "2px 4px",
  //   display: "flex",
  //   alignItems: "center",
  //   width: 1800
  // },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  iconButton: {
    padding: 5
  },
  divider: {
    height: 200,
    margin: 52
  },
  border: {
    padding: 111,
    width: 356
  },
  text: {
    paddingleft: 7

  },
  modalfooter: {
    float: 'right'
  },
  notifie: {
    width: 256,
    textAlign: 'center'
  },
  search: {
    width: 272,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  post: {
    fontWeight: 700
  }

}));


export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [editTitle, setEditTitle] = react.useState();
  const [editBody, setEditBody] = react.useState();
  const [userId, setUserId] = react.useState();
  const [id, setId] = react.useState();
  const [alert, setAlert] = react.useState(false);
  const [value, setValue] = React.useState("");
  const [filterData, setFilterData] = React.useState([])

  const fetchData = () => {
    const postUrl = "https://jsonplaceholder.typicode.com/posts";
    fetch(postUrl).then(response => response.json()).then(response => {
      if (response.length > 0) {
        setRows(response)
        setFilterData(response);
      }
    }).catch(error => {
      console.log(error)
    })
  }
  React.useEffect(() => {
    fetchData()
  }, [])

  const handleOpen = (row) => {
    setSelected(row);
    setEditBody(row.body);
    setEditTitle(row.title)
    setUserId(row.userId)
    setId(row.id)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAlert(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUpdate = () => {
    setOpen(false);
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "userId": userId,
        "id": id,
        "title": editTitle,
        "body": editBody
      })
    };
    const putUrl = 'https://jsonplaceholder.typicode.com/posts/'
    fetch(putUrl + id, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data) {
          const newRows = rows.map(item => {
            if (item.id === data.id) {
              const res = {
                id: data.id,
                userId: data.userId,
                title: data.title,
                body: data.body
              }
              return res;
            } else {
              return item
            }

          });
          setAlert(true);
          setRows(newRows)
        }

      }).catch(error => {
        console.log(error)
      })
  };
  const handleSearch = () => {
    const input = value.replace(/\s/g,'')
    const data = rows.filter(item => {
      return (item.title.replace(/\s/g,'').includes(input) || item.id === +input )
    })
    setFilterData(data)
  }
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);


  return (
    <div className={classes.root}>
      <div className={classes.header} >
        <div className={classes.post}>Posts</div>

        <div className={classes.search}>
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
                  <SearchIcon onClick={handleSearch} />
                </InputAdornment>
              ),

              endAdornment: value && (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setValue("")}
                >
                  <CancelRoundedIcon />
                </IconButton>
              )
            }}
          />
        </div>
      </div>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'small'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {filterData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                    >

                      <TableCell component="th" id={labelId} scope="row" padding="normal">
                        {row.id}
                      </TableCell>
                      <TableCell align="right" padding="normal">{row.title}</TableCell>

                      <TableCell align="right" padding="normal">{"Leanne Graham"}</TableCell>
                      <TableCell align="right" padding="normal"><CreateIcon onClick={() => handleOpen(row)} /><DeleteOutlinedIcon /></TableCell>


                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (33) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            {selected &&
              <div className={classes.paper2}>
                <h2 className={classes.text}>Post Details</h2>
                <p>Tittle</p>
                <TextField
                  type="text"
                  value={editTitle}
                  style={{ margin: 8 }}
                  onChange={(e) => setEditTitle(e.target.value)}
                  fullWidth
                  multiline
                  margin="normal"
                />
                
                <p>Body</p>
                <TextField
                  type="text"
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  style={{ margin: 8 }}
                  fullWidth
                  multiline
                  margin="normal"
                />
                
                <div className={classes.modalfooter}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    disabled={selected.title === editTitle && selected.body === editBody}
                    onClick={handleUpdate}>
                    update </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={handleClose}>
                    cancel </Button>
                </div>
              </div>
            }
          </Fade>
        </Modal>
      </div>
      <div className={classes.root}>
        <Snackbar open={alert} autoHideDuration={6000} onClose={handleClose}  >
          <Alert onClose={handleClose} severity="success">
            Post Updated successfully
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
