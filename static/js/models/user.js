import { QueryModel } from "./query.js";

const User_Query = `query getUserAndEvents($userId: Int!) {
  user {
    id
    login
    email
    firstName
    lastName
    campus
    auditRatio
    totalUp
    totalUpBonus
    totalDown
    phone: attrs(path: "tel")
    cohort: events(where: {event: {cohorts: {id: {_is_null: false}}}}) {
      event {
        allCohorts: cohorts(order_by: {createdAt: asc}) {
          id
        }
        joined: cohorts(where: {users: {user: {id: {_eq: $userId}}}}) {
          id
          name
        }
      }
    }
  }
}`;

export class User extends QueryModel {
  static query = User_Query;
  static init(data) {
    return data.user[0];
  }

  id = 0;
  login = "";
  email = "";
  firstName = "";
  campus = "";
  #lastName = "";
  auditRatio = 0;
  totalUp = 0;
  totalUpBonus = 0;
  totalDown = 0;
  phone = "";
  #cohort = {
    date: "",
    number: 0,
  };
  set cohort(data) {
    const v = data[0].event;
    const joined = v.joined[0];
    const [label, day, month, year] = joined.name.split("_");
    const date = new Date(`${month}, ${day}, ${year}`);

    this.#cohort.date = date.toDateString();
    this.#cohort.number = v.allCohorts.findIndex((c) => c.id === joined.id) + 1;
  }
  get cohort() {
    return this.#cohort;
  }
  get lastName() {
    return this.#lastName;
  }
  set lastName(value) {
    this.#lastName = value.toUpperCase();
  }
}
