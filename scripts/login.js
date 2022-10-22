import { addUsersToLocalStorage } from "./user-service.js";

const formEl = document.querySelector(".login-form");
const invalidLoginEl = document.querySelector(".invalid-login");

//add users to localStorage
document.addEventListener("load", addUsersToLocalStorage());

document.addEventListener("load", preventBack());
formEl.addEventListener("submit", authenticate);

function preventBack() {
  window.history.forward();
}

function authenticate(event) {
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
}

function isValidUser(users, username, password) {
  for (const user of users) {
    console.log(user.username, user.password);
    if (user.username === username && user.password === password) return true;
  }
  return false;
}
