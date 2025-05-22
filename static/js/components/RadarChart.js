import { times } from "../utils/index.js";
import { degreeToXY } from "../utils/math.js";
import { circle, polygon, svg } from "./native/svg.js";

export const RadarChart = (values) => {
  const points = values.map((v, i) => {
    const degree = (i + 1) * (360 / values.length);
    const radius = (v.amount * 40) / 100;
    const { x, y } = degreeToXY(degree, radius);
    return `${x},${y}`;
  });

  return svg({ viewBox: "0 0 100 100" }).add(
    ...times(4, (i) =>
      circle({
        cx: 50,
        cy: 50,
        r: (i + 1) * 10,
        fill: "none",
        stroke: "gray",
        "stroke-width": 0.4,
      })
    ),
    polygon({
      fill: "rgba(0, 0, 255, 0.3)",
      stroke: "blue",
      "stroke-width": 0.5,
      points: points.join(" "),
    })
  );
};
