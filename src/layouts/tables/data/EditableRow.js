import React from 'react'
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const EditableRow = ({editFormData, handleEditFormChange, handleEditFormSubmit, handleCancelClick}) => {
  return (
    <StyledTableRow>
      <StyledTableCell><input type = "number" required = "required" placeholder = "Enter..." name = "SAP_Mat_Num" value = {editFormData.SAP_Mat_Num} onChange = {handleEditFormChange} /></StyledTableCell>
      <StyledTableCell><input type = "text" placeholder = "Enter..." name = "Used_in_Products" value = {editFormData.Used_in_Products} onChange = {handleEditFormChange} /></StyledTableCell>
      <StyledTableCell><input type = "text" required = "required" placeholder = "Enter..." value = {editFormData.Material_Name} name = "Material_Name" onChange = {handleEditFormChange} /></StyledTableCell>
      <StyledTableCell><input type = "text" required = "required" placeholder = "Enter..." value = {editFormData.Criticality} name = "Criticality" onChange = {handleEditFormChange} /></StyledTableCell>
      <StyledTableCell><input type = "text" required = "required" placeholder = "Enter..." value = {editFormData.Work_Stream} name = "Work_Stream" onChange = {handleEditFormChange} /></StyledTableCell>
      <StyledTableCell><input type = "text" required = "required" placeholder = "Enter..." value = {editFormData.Material} name = "Material" onChange = {handleEditFormChange} /></StyledTableCell>
      <StyledTableCell><input type = "text" required = "required" placeholder = "Enter..." value = {editFormData.Supplier} name = "Supplier" onChange = {handleEditFormChange} /></StyledTableCell>
      <StyledTableCell><input type = "text" required = "required" placeholder = "Enter..." value = {editFormData.Manufacturer} name = "Manufacturer" onChange = {handleEditFormChange} /></StyledTableCell>
      <StyledTableCell><input type = "text" required = "required" placeholder = "Enter..." value = {editFormData.Sup_Man_Article_Num} name = "Sup_Man_Article_Num" onChange = {handleEditFormChange} /></StyledTableCell>
      <StyledTableCell><input type = "text" required = "required" placeholder = "Enter..." value = {editFormData.Qual_Status} name = "Qual_Status" onChange = {handleEditFormChange} /></StyledTableCell>
      <StyledTableCell>
        <button type = "submit" onClick ={(event) => handleEditFormSubmit(event)}>
        Submit
        </button>
        <button type = "button" onClick = {handleCancelClick}>
        Cancel
        </button>
      </StyledTableCell>
    </StyledTableRow>
  )
}

export default EditableRow
