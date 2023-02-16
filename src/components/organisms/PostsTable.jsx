import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead  ";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete'
import TableSortLabel from "@mui/material/TableSortLabel";
import TablePagination from "@mui/material/TablePagination";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "@components/templates/Context";

const TABLE_COLUMNS = [
  {
    id:'actions',
    label: 'Actions'
  },
  {
    id: 'Id',
    label: '#',
  },{
    id: 'title',
    label: 'Post Title',
  },{
    id: 'body',
    label: 'Post Body',
  }
]

function PostsTable(){
    const {
        postsFiltered,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        initRow,
        finishRow
    } = useContext(PostsContext);
    const navigation = useNavigate();

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    }

    const onEditRow = (id) => {
      console.log(id)
      navigation(`/form/${id}`)
    }

    return(
      <Box>
        <TableContainer>
          <Table sx={{backgroundColor: '#ffffff', minWidth: 360, maxWidth: 769}} area-label="simple table">
            <TableHead
              sx={{backgroundColor:'#000'}}
            >
              <TableRow>
                {
                  TABLE_COLUMNS.map( column => (
                    <TableCell
                      key={column.id}
                      sx={{color:'#fff'}}
                    >
                      {column.label}
                    </TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                postsFiltered.slice(initRow() ,finishRow()).map((post) => (
                  <TableRow
                    key={post.id}
                  >
                    <TableCell
                      sx={{width:'105px'}}
                    >
                      <IconButton
                        onClick={() => onEditRow(post.id)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                      
                    </TableCell>
                    <TableCell>{post.id}</TableCell>
                    <TableCell>{post.title}</TableCell>
                    <TableCell>{post.body}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination 
          sx={{minWidth: 360, maxWidth: 769}}
          rowsPerPageOptions={[5,10,15]}
          component='div'
          count={postsFiltered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    )
}

export default PostsTable;