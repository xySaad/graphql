import { eq, When } from "../bindjs/conditional.js";
import { div } from "../bindjs/native.js";
import { useReference } from "../bindjs/reference.js";
import { svg, text } from "./native/svg.js";
import { getProjectName } from "./Project.js";
import { Tooltip } from "./Tooltip.js";

export const RootEvents = async (user) => {  return div("RootEvents section").add(
    div("events").add(
      ...user.levels.map(({ event, amount }) => {
        const name = getProjectName(event);
        return div("event").add(
          div("name", name),
          Tooltip(
            div("level").add(svg("stat_2"), div("amount", amount)),
            "level"
          )
        );
      })
    )
  );
};
