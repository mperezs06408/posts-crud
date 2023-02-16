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
import Alert from "@mui/material/Alert";
import ModalComponent from "../atoms/ModalComponent";
import FormButton from "../atoms/FormButton";
import TablePagination from "@mui/material/TablePagination";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "@components/templates/Context";
import { Collapse } from "@mui/material";

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
        posts,
        setPosts,
        postsFiltered,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        initRow,
        finishRow,
        postsDeleted,
        setPostsDeleted
    } = useContext(PostsContext);
    const navigation = useNavigate();
    const [modalData, setModalData] = useState({
        modalOpen: false,
        modalTitle:'',
        modalSubtitle:'',
        currentItem:''
    })
    const {
        modalOpen,
        modalTitle,
        modalSubtitle,
        currentItem
    } = modalData;

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

    const openModal = (action, item = null) => {
      if (action === 'DELETE') {
        setModalData({
          modalOpen: true,
          modalTitle: 'Are you sure?',
          modalSubtitle: 'This action cannot be reversed',
          currentItem: item
        })
      }
    }
    const onCloseModal = () => {
      setModalData({
        modalOpen: false,
        modalTitle: '',
        modalSubtitle: '',
        currentItem: null
      })
    }

    const onDeletePost = () => {
      const postListCopy = [...posts]

      setPosts(postListCopy.filter( post => post.id !== currentItem));
      setPostsDeleted(postsDeleted + 1)
      onCloseModal();
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
                      <IconButton
                        onClick={() => openModal('DELETE', post.id)}
                      >
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
        <ModalComponent
            isOpen={modalOpen}
            title={modalTitle}
            subtitle={modalSubtitle}
            buttons={
                <>
                    <FormButton 
                        id={'modal-cancel'}
                        type={'button'}
                        label={'Cancel'}
                        onClick={onCloseModal}
                    />
                    <FormButton 
                        id={'modal-continue'}
                        type={'submit'}
                        label={'Continue'}
                        onClick={() => onDeletePost()}
                    />
                </>
            }
        />
      </Box>
    )
}

export default PostsTable;