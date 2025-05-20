import { div } from "../bindjs/native.js";
import { svg } from "./native/svg.js";

export const getProjectName = (project) => {
  const parts = project.path.split("/");
  return parts[parts.length - 1];
};

export const Project = (project, className, icon) => {
  const attempts = project.attempts?.length;

  return div(className).add(
    icon,
    div("name", getProjectName(project)),
    div("extra").add(
      div("members").add(
        svg("group"),
        project.members.length,
        div("tooltip").add(
          ...project.members.map((m) => {
            return div("member", m.userLogin);
          })
        )
      ),
      attempts
        ? div("attempts").add(
            svg("close"),
            attempts - 1,
            div("tooltip", "past fails")
          )
        : ""
    )
  );
};
