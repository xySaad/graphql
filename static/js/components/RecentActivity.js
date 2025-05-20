import { div } from "../bindjs/native.js";
import { graphQuery } from "../models/query.js";
import { recentProject } from "../models/recentActivity.js";
import { Audit } from "./Audit.js";
import { svg } from "./native/svg.js";
import { Project } from "./Project.js";

export const RecentActivity = async (user) => {
  const variables = { userId: user.id, campus: user.campus };
  const [projects, error] = await graphQuery(recentProject, variables);
  if (error) return div("RecentActivity section", error);
  const { workingOn, lastProject, audit } = projects;

  return div("RecentActivity section").add(
    div("title", "Recent Activities"),
    div("projects", "projects:").add(
      Project(workingOn, "workingOn", svg("badging")),
      ...lastProject.map((project) =>
        Project(project, "last", svg("check_circle"))
      )
    ),
    div("audits", "audits:").add(...audit.map((a) => Audit(a)))
  );
};
