import { div } from "../bindjs/native.js";
import { svg } from "./native/svg.js";
import { getProjectName } from "./Project.js";

export const Audit = (audit) => {
  return div("audit").add(
    audit.closureType === "failed" ? svg("task_undone") : svg("task_done"),
    div("name", getProjectName(audit.group)),
    div("-", "-"),
    div("captain", audit.group.captainLogin)
  );
};
