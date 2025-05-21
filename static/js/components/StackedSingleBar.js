import { div } from "../bindjs/native.js";
import { rect, svg } from "./native/svg.js";

export const StackedSingleBar = (totalUp, totalDown, formatFunction) => {
  const max = Math.max(totalUp, totalDown);
  const up = (totalUp * 100) / max;
  const down = (totalDown * 100) / max;

  return div("graph").add(
    div("head").add(
      div("up", formatFunction(totalUp)),
      div("down", formatFunction(totalDown))
    ),
    svg({ viewBox: "0 0 100 5" }).add(
      rect({ x: 0, y: 0, width: up, height: 5, fill: "blue" }),
      rect({
        x: up,
        y: 0,
        width: down - up,
        height: 5,
        fill: down === 100 ? "red" : "blue",
      })
    )
  );
};
