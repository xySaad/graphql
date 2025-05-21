import { and } from "../bindjs/conditional.js";
import { div } from "../bindjs/native.js";
import { svg } from "./native/svg.js";

export const getProjectName = (project) => {
  const parts = project.path.split("/");
  return parts[parts.length - 1];
};

/**
 * @param {import('../models/recentActivity.js').recentProject['lastProjects'][number]} project
 */
export const Project = (project) => {
  const attempts = project.attempts?.length;
  console.log(
    attempts &&
      div("attempts").add(
        svg("close"),
        attempts - 1,
        div("tooltip", "past fails")
      )
  );

  return div("project").add(
    div("name").add(
      div().add(div("tooltip", project.status), svg(project.status)),
      getProjectName(project)
    ),
    div("extra").add(
      div("group").add(
        svg("group"),
        `${project.members.length}/${project.groupMax}`,
        div("tooltip").add(
          div("size", `required: ${project.groupMin}`),
          div("members").add(
            ...project.members.map((m) => {
              return div("member", m.userLogin);
            })
          )
        )
      ),
      and(
        attempts,
        div("attempts").add(
          svg("close"),
          attempts - 1,
          div("tooltip", "past fails")
        )
      )
    )
  );
};
