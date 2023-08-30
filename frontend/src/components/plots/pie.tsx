import Plot from "react-plotly.js";

interface IData {
  x: Array<any>;
  y: Array<number>;
}
interface Props {
  plot: IData;
  title: string;
}

export default function PieChart({ plot, title }: Props) {
  return (
    <Plot
      data={[
        {
          labels: plot.x,
          values: plot.y,
          type: "pie",
          marker: {
            color: "#2962ff",
          },
        },
      ]}
      layout={{
        height: 450,
        title: title,
        font: {
          size: 15,
        },
        width: 500
      }}
      config={{
        displayModeBar: true,
        responsive: true,
        autosizable: true,
        displaylogo: false
      }}
      useResizeHandler
      className="w-full h-full"
    />
  );
}
