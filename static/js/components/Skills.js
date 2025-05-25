import { div } from "../bindjs/native.js";
import { toggle } from "../bindjs/reference.js";
import { RadarChart } from "./RadarChart.js";

export const Skills = (user) => {
  const [view, switchView, viewList] = toggle("radar", "pie");

  return div("skills section").add(
    div("title", "Skills"),
    div("toggle", null, { onclick: view }).add(
      ...viewList.map((v) => div(v, v))
    ),
    switchView(RadarChart(user.skills), "alo")
  );
};
