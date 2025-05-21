import { div } from "../bindjs/native.js";
import { svg } from "./native/svg.js";
import { getProjectName } from "./Project.js";

export const Audit = (audit) => {
  return div("audit").add(
    div().add(svg(audit.closureType), div("tooltip", audit.closureType)),
    div("name", getProjectName(audit.group)),
    div("-", "-"),
    div("captain", audit.group.captainLogin)
  );
};
