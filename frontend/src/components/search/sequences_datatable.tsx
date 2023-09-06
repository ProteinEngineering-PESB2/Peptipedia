import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import axios from "axios";

interface Props {
  title: string;
  count?: number;
  redirect_api?: string;
  table_api: string;
  query: {};
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function SequencesDataTable({ page, setPage, title, table_api, query,
  count, redirect_api = undefined}: Props) {
  const [table, setTable] = useState({"data": [], "columns": []})

  const getData = async ( tableState: {}) => {
    const post_data = {...query, ...tableState};
    try{
      const response = await axios.post(table_api, post_data);
      setTable({data: response.data.results.table.data,
        columns: response.data.results.table.columns});
    } catch (error){
      console.log(error)
    }
  }

  const clickFunction = (rowData:string[]) =>{
    if (redirect_api !== undefined) window.open(redirect_api + rowData[0])
  }
  useEffect(()=>{
    getData({rowsPerPage:10, page:0});
  }, [count])
  useEffect(()=>{
    console.log(page)
  }, [page])

  return (
    <MUIDataTable
      data = {table.data}
      columns = {table.columns}
      title={title}
      options={{
        page: page,
        count: count,
        selectableRowsHideCheckboxes: true,
        rowsPerPageOptions: [5, 10, 100],
        download: false,
        print: false,
        search:false,
        onRowClick: (rowData)=> clickFunction(rowData),
        serverSide: true,
        onTableChange: (action, tableState) => {
          switch(action){
            case "changePage":
              getData(tableState)
              setPage(tableState.page)
            case "changeRowsPerPage":
              getData(tableState)
          }
        }
      }}
    />
  )
}
