import { div } from "../bindjs/native.js";
import { User } from "../models/user.js";
import { RadarChart } from "./RadarChart.js";
import { PolarPlot } from "./PolarPlot.js";
import { StackedSingleBar } from "./StackedSingleBar.js";
import { useReference } from "../bindjs/reference.js";
import { When } from "../bindjs/conditional.js";

export const formatBytes = (btyes) => {
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  let result = btyes;
  for (let i = 0; ; i++) {
    result = result / 1024;

    if (result / 1024 < 1) {
      return `${result.toFixed(2)} ${units[i + 1]}`;
    }
  }
};

/**
 * @argument {User} user
 */
export const Overview = (user) => {
  const totalUp = user.totalUp + user.totalUpBonus;
  const ratio = user.auditRatio.toFixed(1);
  const view = useReference("radar");

  return div("Overview section").add(
    div("head").add(
      div("title", "Overview"),
      div("cohort", `cohort ${user.cohort.number} -  ${user.cohort.date}`)
    ),
    div("ratio", "Audit Ratio").add(
      StackedSingleBar(totalUp, user.totalDown, formatBytes),
      div("balance", "balance:").add(div(ratio < 1 ? "low" : "", ratio))
    ),
    div("skills").add(
      div("head", "Skills").add(
        div("view-switch").add(
          div("btn", "Radar", { onclick: () => view("radar") }),
          div("btn", "Polar", { onclick: () => view("polar") })
        )
      ),
      When(view, (view) =>
        view === "radar" ? RadarChart(user.skills) : PolarPlot(user.skills)
      )
    )
  );
};
