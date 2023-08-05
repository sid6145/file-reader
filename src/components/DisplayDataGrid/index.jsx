import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableColumnResizing,
  DragDropProvider,
  TableColumnReordering,
} from "@devexpress/dx-react-grid-material-ui";
// import { data } from "../../data";
import axios from "axios";
import "./DisplayDataGrid.css"

const DisplayDataGrid = () => {
  const [resData, setResData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8082/logs/search",
          {}
        );
        console.log("response:::",response)
        if (response.status === 200) {
          setResData(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  console.log("resData:::",resData)

  const columns = [
    { name: "query_id", title: "Query ID" },
    { name: "query_state", title: "Query State" },
    { name: "query_src", title: "Query Src" },
    { name: "eventtime_utc", title: "Event Time UTC" },
    { name: "query_data", title: "Query Data" },
    { name: "query_results", title: "Query Results" },
  ];
  const rows = resData.map((item) => {
    return {
      query_id: item.QUERY_ID,
      query_state: item.QUERY_STATE,
      query_src: item.QUERY_SRC,
      eventtime_utc: item.EVENTTIME_UTC,
      query_data: item.QUERY_DATA,
      query_results: item.QUERY_RESULTS,
    };
  });
  const [columnWidths, setColumnWidths] = useState([
    { columnName: "query_id", width: 100 },
    { columnName: "query_state", width: 255 },
    { columnName: "query_src", width: 255 },
    { columnName: "eventtime_utc", width: 255 },
    { columnName: "query_data", width: 255 },
    { columnName: "query_results", width: 255 },
  ]);

  return (
    <div className="container">
      <div className="side-bar"></div>
      <Paper className="grid-root">
        <Grid rows={rows} columns={columns}>
          <DragDropProvider />
          <Table
            cellComponent={({ children }) => (
              <tr>
                <td
                  style={{
                    // padding: "8px",
                    // borderBottom: "1px solid #e0e0e0",
                    // fontWeight: "bold",
                    // fontFamily: "Arial, sans-serif",
                    background: "#F5F5F5",
                    color: "#fff",
                  }}
                >
                  {children}
                </td>
              </tr>
            )}
          />
          <TableColumnReordering
            defaultOrder={[
              "query_id",
              "query_state",
              "query_src",
              "eventtime_utc",
              "query_data",
              "query_results",
            ]}
          />
          <TableColumnResizing
            columnWidths={columnWidths}
            onColumnWidthsChange={setColumnWidths}
          />
          <TableHeaderRow
            cellComponent={({ children }) => (
              <th
                style={{
                  padding: "8px",
                  borderBottom: "1px solid #e0e0e0",
                  fontWeight: "bold",
                  fontFamily: "Arial, sans-serif",
                  background: "#333333",
                  color: "#fff",
                }}
              >
                {children}
              </th>
            )}
          />
        </Grid>
      </Paper>
    </div>
  );
};

export default DisplayDataGrid;
