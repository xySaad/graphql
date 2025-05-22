import { times } from "../utils/index.js";
import { degreeToXY } from "../utils/math.js";
import { circle, line, svg, title } from "./native/svg.js";

export const PolarPlot = (values) => {
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
    ...values.flatMap((v, i) => {
      const degree = (i + 1) * (360 / values.length);
      const radius = (v.amount * 40) / 100;
      const { x, y } = degreeToXY(degree, radius);
      return [
        line({
          "data-type": v.type,
          transform: `rotate(${degree} 50 50)`,
          x1: 50,
          x2: 50 + radius,
          y1: 50,
          y2: 50,
          stroke: "blue",
          "stroke-width": 0.4,
        }),
        circle({
          cx: x,
          cy: y,
          r: 1.5,
          fill: "black",
        }).add(title(v.label)),
      ];
    })
  );
};
