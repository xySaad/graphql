import { QueryModel } from "./query.js";

const recentProject_query = `query recentActivities($userId: Int!, $campus: String!) {
  workingOn: group(
    where: {members: {userId: {_eq: $userId}}, campus: {_eq: $campus}, status: {_in: [working]}, _not: {pathByPath: {path_archives: {status: {_eq: deleted}}}}}
    order_by: {updatedAt: desc}
    limit: 1
  ) {
    path
    updatedAt
    members {
      userLogin
      accepted
    }
    attempts: auditors(order_by: {createdAt: desc}, distinct_on: createdAt) {
      createdAt
    }
  }
  lastProject: group(
    where: {members: {userId: {_eq: $userId}}, campus: {_eq: $campus}, status: {_in: [setup, finished]}, _not: {pathByPath: {path_archives: {status: {_eq: deleted}}}}}
    order_by: {updatedAt: desc}
    limit: 1
  ) {
    captainLogin
    members {
      userLogin
    }
    path
    updatedAt
    eventId
    status
    attempts: auditors(order_by: {createdAt: desc}, distinct_on: createdAt) {
      createdAt
    }
    audits: auditors(
      where: {closureType: {_neq: unused}}
      order_by: {createdAt: desc}
    ) {
      createdAt
      auditorLogin
      closureType
    }
  }
  audit(
    where: {auditedAt: {_is_null: false}, auditorId: {_eq: $userId}}
    order_by: {auditedAt: desc}
    limit: 4
  ) {
    closureType
    auditedAt
    group {
      path
      captainLogin
    }
  }
}`;

export class recentProject extends QueryModel {
  static query = recentProject_query;

  #workingOn = {
    path: "/oujda/module/x",
    updatedAt: "2025-05-14T14:25:02.87575+00:00",
  };
  lastProject = [
    {
      captainLogin: "srm",
      members: [
        {
          userLogin: "helbadao",
        },
        {
          userLogin: "srm",
        },
      ],
      path: "/oujda/module/typing-in-progress",
      updatedAt: "2025-05-14T13:33:19.671335+00:00",
      eventId: 41,
      status: "finished",
      attempts: [
        {
          createdAt: "2025-05-14T09:07:44.608327+00:00",
        },
      ],
      audits: [
        {
          createdAt: "2025-05-14T09:07:44.608327+00:00",
          auditorLogin: "izahid",
          closureType: "succeeded",
        },
      ],
    },
  ];
  audit = [
    {
      closureType: "succeeded",
      auditedAt: "2025-03-10T13:47:20.225+00:00",
      group: {
        path: "/oujda/module/net-cat",
        captainLogin: "mjait",
      },
    },
  ];
  set workingOn(v) {
    this.#workingOn = v[0];
  }
  get workingOn() {
    return this.#workingOn;
  }
}
