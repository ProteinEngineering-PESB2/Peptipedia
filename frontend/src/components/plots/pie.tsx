import Plot from "react-plotly.js";

interface IData {
  x: Array<any>;
  y_label: Array<number>;
  y_predicted: Array<number>;
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
          values: plot.y_label,
          type: "pie",
          marker: {
            color: "#2962ff",
          },
          domain: {
            row: 0,
            column: 0
          },
          name: 'Labeled',
        },
        {
          labels: plot.x,
          values: plot.y_predicted,
          type: "pie",
          marker: {
            color: "#2962ff",
          },
          domain: {
            row: 0,
            column: 1
          },
          name: 'Predicted',
        },
      ]}
      layout={{
        height: 700,
        title: title,
        font: {
          size: 15,
        },
        autosize: true,
        grid: {rows: 1, columns: 2}
      }}
      style={{width: "100%"}}
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
