import MUIDataTable from "mui-datatables";
import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
interface ITable {
  columns: Array<string>;
  data: Array<Array<any>>;
}
interface Props {
  table: ITable;
  title: string;
  redirect_api?: string;
}

export default function DataTable({ table, title, redirect_api = undefined}: Props) {
  const navigate = useNavigate();

  const clickFunction = (rowData:string[]) =>{
    if (redirect_api !== undefined) navigate(redirect_api + rowData[0])
  }
  const editDisplayColumns = () =>{
    let columns:any[] = []
    table.columns.map((value, index)=>{
      let new_value = {}
      if(value === "_id"){
        new_value = {
          name: value,
          options: {
            display: false
          }
        }
      }
      else {
        new_value = {
          name: value
        }
      }
      columns.push(new_value)
    })
    return {columns}
  }

  const {columns} = editDisplayColumns()

  return (
    <>
        <MUIDataTable
            data={table.data}
            columns={columns}
            title={title}
            options={{
              selectableRowsHideCheckboxes: true,
              rowsPerPageOptions: [5, 10, 100],
              download: false,
              print: false,
              onRowClick: (rowData)=> clickFunction(rowData),
          }}
        />
    </>
  )
}
