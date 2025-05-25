import { and } from "../bindjs/conditional.js";
import { div } from "../bindjs/native.js";
import { svg } from "./native/svg.js";
import { Tooltip } from "./Tooltip.js";

export const getProjectName = (project) => {
  const parts = project.path.split("/");
  return parts[parts.length - 1];
};

/**
 * @param {import('../models/recentActivity.js').recentProject['lastProjects'][number]} project
 */
export const Project = (project) => {
  const attempts = project.attempts?.length;

  return div("project").add(
    div("name").add(
      Tooltip(svg(project.status), project.status),
      getProjectName(project)
    ),
    div("extra").add(
      Tooltip(
        div("group").add(
          svg("group"),
          `${project.members.length}/${project.groupMax || "?"}`
        ),
        div("size", and(project.groupMin, `required: ${project.groupMin}`)),
        div("members").add(
          ...project.members.map((m) => {
            return div("member", m.userLogin);
          })
        )
      ),
      and(
        attempts,
        Tooltip(div("attempts").add(svg("close"), attempts - 1), "past fails")
      )
    )
  );
};
