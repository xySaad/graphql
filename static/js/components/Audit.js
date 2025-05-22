import { div } from "../bindjs/native.js";
import { svg } from "./native/svg.js";
import { getProjectName } from "./Project.js";
import { Tooltip } from "./Tooltip.js";

export const Audit = (audit) => {
  return div("audit").add(
    Tooltip(svg(audit.closureType), audit.closureType),
    div("name", getProjectName(audit.group)),
    div("-", "-"),
    div("captain", audit.group.captainLogin)
  );
};
