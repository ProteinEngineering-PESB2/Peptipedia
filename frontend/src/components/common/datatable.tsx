import MUIDataTable from "mui-datatables";

interface ITable {
  columns: Array<string>;
  data: Array<Array<any>>;
  ids: Array<number>;
}
interface Props {
  table: ITable;
  title: string;
}

export default function DataTable({ table, title }: Props) {
  return (
  <MUIDataTable
      data={table.data}
      columns={table.columns}
      title={title}
      options={{
        selectableRowsHideCheckboxes: true,
        rowsPerPageOptions: [5, 10, 100],
        download: false,
        print: false,
    }}
  />)
}
