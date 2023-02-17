import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead  ";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalComponent from "@components/atoms/ModalComponent";
import FormButton from "@components/atoms/FormButton";
import { PostsContext } from "@components/templates/Context";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TABLE_COLUMNS, COLORS_SCSS } from "@/assets/dictionary";

const ACTIONS = {
  DELETE: 'delete'
}

const TABLE_STYLES = {
  table_sx: {
    backgroundColor: COLORS_SCSS.white, 
    minWidth: 360, 
    maxWidth: 769
  },
  tableHead_sx: {
    backgroundColor: COLORS_SCSS.primary,
  },
  tableHeadCell_sx: {
    color: COLORS_SCSS.secondary
  },
  tableCellBtns_sx: {
    width:'105px',
    borderColor: COLORS_SCSS.secondary
  },
  tableIcons_sx: {
    fill: COLORS_SCSS.warning,
  },
  tableCells_sx: {
    color: COLORS_SCSS.primary,
    borderColor: COLORS_SCSS.secondary
  },
  tableSort_sx:{
    '&.MuiTableSortLabel-root': {
        color: COLORS_SCSS.secondary,
      },
    '&.MuiTableSortLabel-root:hover': {
        color: COLORS_SCSS.secondary,
      },
    '&.Mui-active': {
        color: COLORS_SCSS.secondary,
      },
    '& .MuiTableSortLabel-icon': {
        color: `${COLORS_SCSS.secondary} !important`,
      },
  },
  tablePagination_sx: {
    minWidth: 360, 
    maxWidth: 769,
    color: COLORS_SCSS.primary
  }
}

const ROWS_OPTIONS = [5,10,15]


function PostsTable({data, order, handleOrder, setAlert}){
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
          modalTitle: `No. ${item} post wil be deleted`,
          modalSubtitle: 'Are you sure? This action cannot be reversed',
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
      const idDropped = dropPostFromList(currentItem)
      
      setAlert({
        value:true,
        label: `Post No.${idDropped} was successfully deleted from database`
      })
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
                      align='center'
                    >
                      {
                        column.id === TABLE_COLUMNS[1].id &&
                        <TableSortLabel
                          active
                          direction={order}
                          onClick={handleOrder}
                          sx={TABLE_STYLES.tableSort_sx}
                        >
                          {column.label}
                        </TableSortLabel>
                      }
                      {
                        column.id !== TABLE_COLUMNS[1].id &&
                        column.label
                      }
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
                    sx={{
                      borderBottomColor: 'white'
                    }}
                  >
                    <TableCell
                      sx={TABLE_STYLES.tableCellBtns_sx}
                      align='left'
                    >
                      <Tooltip title="Edit row">
                        <IconButton
                          onClick={() => onEditRow(post.id)}
                        >
                          <EditIcon fontSize="small" sx={TABLE_STYLES.tableIcons_sx} />
                      </IconButton>
                      </Tooltip>
                      <Tooltip title='Delete row'>
                        <IconButton
                          onClick={() => openModal(ACTIONS.DELETE, post.id)}
                        >
                          <DeleteIcon fontSize="small" sx={TABLE_STYLES.tableIcons_sx} />
                        </IconButton>
                      </Tooltip>
                      
                    </TableCell>
                    <TableCell sx={TABLE_STYLES.tableCells_sx}>{post.id}</TableCell>
                    <TableCell sx={TABLE_STYLES.tableCells_sx}>{post.title}</TableCell>
                    <TableCell sx={TABLE_STYLES.tableCells_sx}>{post.body}</TableCell>
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
                        type={'delete'}
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