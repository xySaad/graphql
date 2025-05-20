import { div } from "../bindjs/native.js";

export const Overview = (user) => {
  return div("Overview section").add(
    div("title", "Overview"),
    div("cohort", `cohort ${user.cohort.number} -  ${user.cohort.date}`)
  );
};
