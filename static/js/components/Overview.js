import { div } from "../bindjs/native.js";
import { User } from "../models/user.js";
import { rect, svg } from "./native/svg.js";
/**
 * @argument {User} user
 */
export const Overview = (user) => {
  const totalUp = user.totalUp + user.totalUpBonus;
  const max = Math.max(totalUp, user.totalDown);
  const up = (totalUp * 100) / max;
  const down = (user.totalDown * 100) / max;
  const ratio = user.auditRatio.toFixed(1);

  return div("Overview section").add(
    div("title", "Overview"),
    div("cohort", `cohort ${user.cohort.number} -  ${user.cohort.date}`),
    div("ratio", "audit ratio:").add(div(ratio < 1 ? "low" : "", ratio)),
    div("ratioGraph").add(
      svg({ viewBox: "0 0 100 13" }).add(
        rect({ x: 0, y: 0, width: up, height: 5, fill: "blue" }),
        rect({
          x: 0,
          y: 8,
          width: down,
          height: 5,
          fill: down === 100 ? "red" : "blue",
        })
      )
    )
  );
};
