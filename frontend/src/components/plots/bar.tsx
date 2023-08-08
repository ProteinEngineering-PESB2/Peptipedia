import Plot from "react-plotly.js"

interface Props {
  x: any[];
  y: number[];
  title: string;
}

export default function BarChart({ x, y, title }: Props) {
  return (
    <Plot
      data={[
        {
          x,
          y,
          type: "bar",
          marker: {
            color: "#2962ff",
          },
        },
      ]}
      layout={{
        /* autosize: true, */
        height: 700,
        title: title,
        font: {
          size: 15,
        },
        width:1700
      }}
      config={{
        displayModeBar: true,
        responsive: true,
        autosizable: true
      }}
      useResizeHandler
      className="w-full h-full"
    />
  );
}
