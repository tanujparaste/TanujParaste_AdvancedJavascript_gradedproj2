import { users } from "./user-db.js";

export function addUsersToLocalStorage() {
  localStorage.setItem("users", JSON.stringify(users));
}
