import MUIDataTable from "mui-datatables";
import axios from "axios";
import { useState } from "react";

interface Props {
  title: string;
  count: number;
  redirect_api?: string;
  table_api: string;
}

export default function SequencesDataTable({ title, table_api, count, redirect_api = undefined}: Props) {

  const clickFunction = (rowData:string[]) =>{
    if (redirect_api !== undefined) window.open(redirect_api + rowData[0])
  }
  const [table, setTable] = useState({"data": [], "columns": []})

  const getData = async (tableState: any) => {
    try{
      const response = await axios.post(table_api, tableState);
      setTable({data: response.data.table.data,
        columns: response.data.table.columns});
    } catch (error){
      console.log(error)
    }
  }

  return (
    <>
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
        ></MUIDataTable>
    </>
  )
}
