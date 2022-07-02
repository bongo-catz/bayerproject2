import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReadOnlyRow from './data/ReadOnlyRow';
import EditableRow from './data/EditableRow';
import { Fragment } from 'react';
import $ from "jquery";

const PATH = "http://localhost:8080/Materials/includes/edit_materials.inc.php";
const PATH2 = "http://localhost:8080/Materials/includes/del_materials.inc.php";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function Material_Table() {

  const [item, setItem] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/Materials/includes/view_all_materials.inc.php")
    .then(res => res.json())
    .then(
        (result) => {
          setItem(result);
        }
      )
  }, [])
  
  const [editRow, setEditRow] = useState(null);

  const handleEditClick = (event, item) => {
    event.preventDefault();
    setEditRow(item.SAP_Mat_Num);

    const formValues = {
      id: item.id,
      SAP_Mat_Num: item.SAP_Mat_Num,
      Used_in_Products: item.Used_in_Products,
      Material_Name: item.Material_Name,
      Criticality: item.Criticality,
      Work_Stream: item.Work_Stream,
      Material: item.Material,
      Supplier: item.Supplier,
      Manufacturer: item.Manufacturer,
      Sup_Man_Article_Num: item.Sup_Man_Article_Num,
      Qual_Status: item.Qual_Status,
    }
    setEditFormData(formValues);
  }

  const [editFormData, setEditFormData] = useState({
    id: "",
    SAP_Mat_Num: "",
    Used_in_Products: "",
    Material_Name: "",
    Criticality: "",
    Work_Stream: "",
    Material: "",
    Supplier: "",
    Manufacturer: "",
    Sup_Man_Article_Num: "",
    Qual_Status: "",
  })

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  }
 
  const refreshPage = () => {
    window.location.reload(false);
  }

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedData = {
      id: editFormData.id,
      SAP_Mat_Num: editFormData.SAP_Mat_Num,
      Used_in_Products: editFormData.Used_in_Products,
      Material_Name: editFormData.Material_Name,
      Criticality: editFormData.Criticality,
      Work_Stream: editFormData.Work_Stream,
      Material: editFormData.Material,
      Supplier: editFormData.Supplier,
      Manufacturer: editFormData.Manufacturer,
      Sup_Man_Article_Num: editFormData.Sup_Man_Article_Num,
      Qual_Status: editFormData.Qual_Status
    }
    $.ajax({
        type: "POST",
        url: `${PATH}`,
        data: editedData
    });  
    refreshPage();
  }

  const handleCancelClick = () => {
    setEditRow(null);
  }
  
  const handleDeleteClick = (event, item) => {
    event.preventDefault();
  
    const info = {
      id: item.id
    }
    
    $.ajax({
      type: "POST",
      url: `${PATH2}`,
      data: info
    });  
    refreshPage();
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>SAP Material #</StyledTableCell>
            <StyledTableCell align="right">Used in Products</StyledTableCell>
            <StyledTableCell align="right">Material Name</StyledTableCell>
            <StyledTableCell align="right">Criticality</StyledTableCell>
            <StyledTableCell align="right">Work Stream</StyledTableCell>
            <StyledTableCell align="right">Material</StyledTableCell>
            <StyledTableCell align="right">Supplier</StyledTableCell>
            <StyledTableCell align="right">Manufacturer</StyledTableCell>
            <StyledTableCell align="right">Sup/Manu #</StyledTableCell>
            <StyledTableCell align="right">Qualification</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        <TableBody>
          {item.map((item) => (
              <Fragment>
                {editRow === item.SAP_Mat_Num ? ( 
                  <EditableRow editFormData = {editFormData} handleEditFormChange = {handleEditFormChange} handleEditFormSubmit = {handleEditFormSubmit} handleCancelClick = {handleCancelClick}/> 
                ) : (
                  <ReadOnlyRow item = {item} handleEditClick = {handleEditClick} handleDeleteClick = {handleDeleteClick}/>
                )}
              </Fragment>
            ))}
        </TableBody>
        </TableHead>
      </Table>
    </TableContainer>
  );
}
