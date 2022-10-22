import "./user-db.js";

const formEl = document.querySelector(".login-form");
const invalidLoginEl = document.querySelector(".invalid-login");

document.addEventListener("load", preventBack());
formEl.addEventListener("submit", authenticate);

function preventBack() {
  window.history.forward();
}

function authenticate(event) {
  event.preventDefault();
  let formUser = document.querySelector(".username").value.trim().toLowerCase();
  let formPass = document.querySelector(".password").value.trim().toLowerCase();
  let lsUser = localStorage.getItem("username");
  let lsPass = localStorage.getItem("password");

  if (formUser === lsUser && formPass === lsPass) {
    window.location.replace("resume-app.html");
  } else {
    invalidLoginEl.textContent = "Invalid username/password";
  }
}
