import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead  ";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalComponent from "@components/atoms/ModalComponent";
import FormButton from "@components/atoms/FormButton";
import { PostsContext } from "@components/templates/Context";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TABLE_COLUMNS } from "@/assets/dictionary";

const ACTIONS = {
  DELETE: 'delete'
}

const TABLE_STYLES = {
  table_sx: {
    backgroundColor: '#ffffff', 
    minWidth: 360, 
    maxWidth: 769
  },
  tableHead_sx: {
    backgroundColor:'#000'
  },
  tableHeadCell_sx: {
    color:'#fff'
  },
  tableCellBtns_sx: {
    width:'105px'
  },
  tablePagination_sx: {
    minWidth: 360, 
    maxWidth: 769
  }
}

const ROWS_OPTIONS = [5,10,15]


function PostsTable({data}){
    const {
        page,
        rowsPerPage,
        initRow,
        finishRow,
        handleChangePage,
        handleChangeRowsPerPage,
        dropPostFromList
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

    const onEditRow = (id) => {
      console.log(id)
      navigation(`/form/${id}`)
    }

    const openModal = (action, item = null) => {
      if (action === ACTIONS.DELETE) {
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
      dropPostFromList(currentItem)
      onCloseModal();
    }

    return(
      <Box>
        <TableContainer>
          <Table sx={TABLE_STYLES.table_sx} area-label="simple table">
            <TableHead
              sx={TABLE_STYLES.tableHead_sx}
            >
              <TableRow>
                {
                  TABLE_COLUMNS.map( column => (
                    <TableCell
                      key={column.id}
                      sx={TABLE_STYLES.tableHeadCell_sx}
                    >
                      {column.label}
                    </TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                  data.slice(initRow() ,finishRow()).map((post) => (
                  <TableRow
                    key={post.id}
                  >
                    <TableCell
                      sx={TABLE_STYLES.tableCellBtns_sx}
                    >
                      <IconButton
                        onClick={() => onEditRow(post.id)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => openModal(ACTIONS.DELETE, post.id)}
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
          sx={TABLE_STYLES.tablePagination_sx}
          rowsPerPageOptions={ROWS_OPTIONS}
          component='div'
          count={data.length}
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