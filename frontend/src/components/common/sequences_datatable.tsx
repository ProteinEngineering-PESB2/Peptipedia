import MUIDataTable from "mui-datatables";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  count?: number;
  redirect_api?: string;
  table_api: string;
}

export default function SequencesDataTable({ title, table_api, count, redirect_api = undefined}: Props) {
  const navigate = useNavigate();
  const clickFunction = (rowData:string[]) =>{
    if (redirect_api !== undefined) navigate(redirect_api + rowData[0])
  }
  const [table, setTable] = useState({"data": [], "columns": []})
  const getData = async (tableState: any) => {
    try{
      const post_data = tableState
      const response = await axios.post(table_api, post_data);
      setTable({data: response.data.results.table.data,
        columns: response.data.results.table.columns});
    } catch (error){
      console.log(error)
    }
  }
  return (
    <MUIDataTable
      data = {table.data}
      columns = {table.columns}
      title={title}
      options={{
        count: count,
        selectableRowsHideCheckboxes: true,
        rowsPerPageOptions: [5, 10, 100],
        download: false,
        print: false,
        onRowClick: (rowData)=> clickFunction(rowData),
        serverSide: true,
        onTableChange: (action, tableState) => {
          switch(action){
            case "changePage" :
              getData(tableState)
            case "changeRowsPerPage":
              getData(tableState)
            case "search":
              getData(tableState)
          }
        },
        onTableInit: (action, tableState) => getData(tableState)
      }}
    />
  )
}
