import axios from "axios";
import { useState, useEffect } from "react";
const useGetTable = (api:string) =>{
    const [table, setTable] = useState({"data": [], "columns": []})
    const getTable = async () => {
        try {
          const response = await axios.get(api);
          setTable(response.data.table);
        } catch (error) {
          console.log(error);
        }
    };
    useEffect(() => {
        getTable();
    }, []);
    return {
      table
    };
  }
export default useGetTable;