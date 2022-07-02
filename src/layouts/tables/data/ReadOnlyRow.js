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

export const ReadOnlyRow = ({ item, handleEditClick, handleDeleteClick }) => {
  return (
    <StyledTableRow key={item.SAP_Mat_Num}>
    <StyledTableCell component="th" scope="row">{item.SAP_Mat_Num}</StyledTableCell>
    <StyledTableCell align="right">{item.Used_in_Products}</StyledTableCell>
    <StyledTableCell align="right">{item.Material_Name}</StyledTableCell>
    <StyledTableCell align="right">{item.Criticality}</StyledTableCell>
    <StyledTableCell align="right">{item.Work_Stream}</StyledTableCell>
    <StyledTableCell align="right">{item.Material}</StyledTableCell>
    <StyledTableCell align="right">{item.Supplier}</StyledTableCell>
    <StyledTableCell align="right">{item.Manufacturer}</StyledTableCell>
    <StyledTableCell align="right">{item.Sup_Man_Article_Num}</StyledTableCell>
    <StyledTableCell align="right">{item.Qual_Status}</StyledTableCell>
    <StyledTableCell align = "right>">
        <button type = "button" onClick ={(event) => handleEditClick(event, item)}>
            Edit
        </button>
        <button type = "button2" onClick ={(event) => handleDeleteClick(event, item)}>
            Delete
        </button>
    </StyledTableCell>
    </StyledTableRow>
  );
};

export default ReadOnlyRow;
