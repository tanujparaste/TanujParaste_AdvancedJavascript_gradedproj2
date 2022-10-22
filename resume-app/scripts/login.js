import { addUsersToLocalStorage } from "./user-service.js";

const formEl = document.querySelector(".login-form");
const invalidLoginEl = document.querySelector(".invalid-login");

const preventBack = () => {
  window.history.forward();
};

const authenticate = (event) => {
  event.preventDefault();
  const formUser = document
    .querySelector(".username")
    .value.trim()
    .toLowerCase();
  const formPass = document
    .querySelector(".password")
    .value.trim()
    .toLowerCase();

  //get user list from local db
  const users = JSON.parse(localStorage.getItem("users"));

  if (isValidUser(users, formUser, formPass)) {
    window.location.replace("resume-app.html");
  } else {
    invalidLoginEl.textContent = "Invalid username/password";
  }
};

const isValidUser = (users, username, password) => {
  for (const user of users) {
    if (user.username === username && user.password === password) return true;
  }
  return false;
};

//add users to localStorage
document.addEventListener("load", addUsersToLocalStorage());

document.addEventListener("load", preventBack());
formEl.addEventListener("submit", authenticate);
