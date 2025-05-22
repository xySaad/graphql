import { times } from "../utils/index.js";
import { degreeToXY } from "../utils/math.js";
import { circle, line, polygon, svg, text } from "./native/svg.js";

export const RadarChart = (values) => {
  const points = values.map((v, i) => {
    const degree = (i + 1) * (360 / values.length);
    const radius = (v.amount * 40) / 100;
    const { x: fullX, y: fullY } = degreeToXY(degree, 40);
    return {
      ...degreeToXY(degree, radius),
      label: v.label,
      fullX,
      fullY,
      amount: v.amount,
    };
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
      points: points.map(({ x, y }) => `${x},${y}`).join(" "),
    }),
    ...points.flatMap(({ x, y, label, fullX, fullY, amount }) => [
      text(label, {
        class: "label",
        x: fullX,
        y: fullY,
        "font-size": 5,
        "text-anchor": "middle",
      }),
      line({
        x1: x,
        x2: fullX,
        y1: y,
        y2: fullY,
        stroke: "gray",
        "stroke-width": 0.5,
      }),

      text(amount + "%", {
        class: "value",
        x: 50,
        y: 50,
        "font-size": 5,
        "text-anchor": "middle",
        fill: "none",
      }),
    ])
  );
};
