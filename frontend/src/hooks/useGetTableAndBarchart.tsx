import axios from "axios";
import { useState, useEffect } from "react";

const useGetTableAndBarchart = (api:string) =>{
  const [table, setTable] = useState({"data": [], "columns": []})
  const [plot, setPlot] = useState({ "x": [], "y": [] })
  const getData = async () => {
    try {
      const response = await axios.get(api);
      setTable(response.data.table);
      setPlot(response.data.plot);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return {
    table, plot
  }
}

export default useGetTableAndBarchart;