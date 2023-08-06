import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
// import axios from "axios";
import "./DisplayDataGrid.css"
import { data } from "../../data";
import { Grid, Pagination } from "@mui/material";
import Filter from "../Filter";
import {handleSearch} from "../../constants"


const DisplayDataGrid = () => {
  // const [resData, setResData] = useState([]);

  const [filterData, setFilterData] = useState({})

  const handleChangeFilters = (e) => {
      const name = e.target.name
      const value = e.target.value
      setFilterData((prevstate) => ({
          ...prevstate,
          [name]: value
      }))
  }   

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = handleSearch({})
  //       console.log("response:::",response)
  //       if (response.status === 200) {
  //         setResData(response.data);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, []);

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

  const rows = data.map((item) => {
    return {
      queryId: item.QUERY_ID,
      queryState: item.QUERY_STATE,
      querrySource: item.QUERY_SRC,
      eventTime: item.EVENTTIME_UTC,
      queryData: item.QUERY_DATA,
      queryResults: item.QUERY_RESULTS
    }
  })


  return (
    <Grid className="grid-root" container spacing={2}>
      <Grid item md={3}>
        <Filter data={data} filterData={filterData} handleFilterChange={handleChangeFilters}/>
      </Grid>
      <Grid item md={9}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Query ID</StyledTableCell>
                <StyledTableCell align="center">Query State</StyledTableCell>
                <StyledTableCell align="center">Query Source</StyledTableCell>
                <StyledTableCell align="center">Event Time</StyledTableCell>
                <StyledTableCell align="center">Query Data</StyledTableCell>
                <StyledTableCell align="center">Query Results</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.query_id}>
                  <StyledTableCell align="center">{row.queryId}</StyledTableCell>
                  <StyledTableCell align="center">{row.queryState}</StyledTableCell>
                  <StyledTableCell align="center">{row.querrySource}</StyledTableCell>
                  <StyledTableCell align="center">{row.eventTime}</StyledTableCell>
                  <StyledTableCell align="center">{row.queryData}</StyledTableCell>
                  <StyledTableCell align="center">{row.queryResults}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </ TableContainer >
        <div className="pagination-container">
          <Pagination count={10} />
        </div>
      </Grid>

    </Grid>
  );
};

export default DisplayDataGrid;
