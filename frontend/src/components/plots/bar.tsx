import Plot from "react-plotly.js"

interface IData {
  x: Array<any>;
  y: Array<number>;
}
interface Props {
  plot: IData;
  title: string;
}

export default function BarChart({ plot, title }: Props) {
  return (
    <Plot
      data={[
        {
          x: plot.x,
          y: plot.y,
          type: "bar",
          marker: {
            color: "#2962ff",
          },
        },
      ]}
      layout={{
        height: 700,
        title: title,
        font: {
          size: 15,
        },
        width: 1000
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
