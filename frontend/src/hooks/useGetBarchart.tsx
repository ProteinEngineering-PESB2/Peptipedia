import axios from "axios";
import { useState, useEffect } from "react";

const useGetBarchart = (api:string) =>{
  const [plot, setPlot] = useState({ "x": [], "y": [] })
  const getData = async () => {
    try {
      const response = await axios.get(api);
      setPlot(response.data.results.plot);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return {
    plot
  }
}

export default useGetBarchart;