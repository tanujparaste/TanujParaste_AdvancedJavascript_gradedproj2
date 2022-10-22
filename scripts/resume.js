const bodyEl = document.querySelector("body");
const searchEl = document.querySelector(".search");
const headerEl = document.querySelector("header");
const btnsEl = document.querySelector(".buttons");
const btnPrevEl = document.querySelector(".btn-prev");
const btnNextEl = document.querySelector(".btn-next");

const url = "../data/Data.json";
let count = -1;
let resumes = null;
let searchFlag = false;
let filteredResumes = null;

const showNextResume = async () => {
  if (searchFlag) {
    resumes = filteredResumes;
  } else if (resumes === null) {
    resumes = await fetchData(url);
  }

  if (resumes.length === 0) {
    //display no data
    displayNoDataMessage();
  } else {
    displayData();
    if (resumes.length === 1) {
      showSearchBoxOnly();
      disableElement(btnsEl);
    }

    if (++count <= resumes.length - 1) {
      if (count === 0) {
        disableElement(btnPrevEl);
      } else if (count === resumes.length - 1) {
        disableElement(btnNextEl);
      }
      populateResume(resumes[count]);
    }
  }
};

const showPrevResume = async () => {
  populateResume(resumes[--count]);
  if (count === 0) {
    disableElement(btnPrevEl);
  }
  enableElement(btnNextEl);
};

const showFilteredResumes = async () => {
  if (event.key === "Enter") {
    searchFlag = true;
    const searchedVal = searchEl.value.trim();
    const resumes = await fetchData(url);

    // filter by position
    filteredResumes = resumes.filter((item) => {
      if (
        item.basics.AppliedFor.trim().toLowerCase() ===
        searchedVal.toLowerCase()
      )
        return item;
    });

    if (searchedVal === "") {
      filteredResumes = resumes;
    }

    //reset count
    count = -1;
    showNextResume();
  }
};

const fetchData = async (url) => {
  try {
    let response = await fetch(url);
    let data = await response.json();
    return data.resume; // array of resumes
  } catch (error) {
    console.log(error);
  }
};

const applicantInfoEl = document.querySelector(".applicant-info");
const noDataEl = document.querySelector(".no-data-box-wrapper");

const displayNoDataMessage = () => {
  showSearchBoxOnly();
  enableElement(noDataEl);
  disableElement(applicantInfoEl);
  disableElement(btnsEl);
};

const showSearchBoxOnly = () => {
  headerEl.style.gridTemplateColumns = "1fr";
};

const displayData = () => {
  headerEl.style.gridTemplateColumns = "4fr 1fr";
  disableElement(noDataEl);
  enableElement(btnsEl);
  enableElement(btnNextEl);
  enableElement(btnPrevEl);
  enableElement(applicantInfoEl);
};

const enableElement = (el) => {
  el.classList.remove("hidden");
};

const disableElement = (el) => {
  el.classList.add("hidden");
};

const applicantNameEl = document.querySelector(".applicant-name");
const appliedForEl = document.querySelector(".applied-for");

const populateResume = (resumeData) => {
  applicantNameEl.textContent = resumeData.basics.name;
  appliedForEl.textContent = `Applied For: ${resumeData.basics.AppliedFor}`;
  populateTechnicalInfoSection(resumeData);
  populateExperienceInfoSection(resumeData);
};

const phoneEl = document.querySelector(".phone");
const emailEl = document.querySelector(".email");
const profileEl = document.querySelector(".profile");
const technicalListEl = document.querySelector(".technical-info ul");
const hobbyListEl = document.querySelector(".hobbies ul");

const populateTechnicalInfoSection = (resumeData) => {
  //personal info
  phoneEl.textContent = resumeData.basics.phone;
  emailEl.textContent = resumeData.basics.email;
  profileEl.innerHTML = `<a href=${resumeData.basics.profiles.url} target="_blank">${resumeData.basics.profiles.network}</a>`;

  //technical skills
  const skills = resumeData.skills.keywords;
  let skillStr = "";
  for (let skill of skills) {
    skillStr += `<li>${skill}</li>`;
  }
  technicalListEl.innerHTML = skillStr;

  //hobbies
  const hobbies = resumeData.interests.hobbies;
  let hobbiesStr = "";
  for (let hobby of hobbies) {
    hobbiesStr += `<li>${hobby}</li>`;
  }
  hobbyListEl.innerHTML = hobbiesStr;
};

const workEl = document.querySelector(".work ul");
const projectsEl = document.querySelector(".projects ul");
const educationEl = document.querySelector(".education ul");
const internshipEl = document.querySelector(".internship ul");
const achievementsEl = document.querySelector(".achievements ul");

const populateExperienceInfoSection = (resumeData) => {
  //work
  const work = resumeData.work;
  let workStr = "";
  for (const item in work) {
    workStr += `<li><b>${item}</b>: ${resumeData.work[item]}</li>`;
  }
  workEl.innerHTML = workStr;

  //projects
  const projects = resumeData.projects;
  let projectStr = `<li><b>${projects.name}:</b> ${projects.description}</li>`;
  projectsEl.innerHTML = projectStr;

  //education
  const education = resumeData.education;
  let educationStr = "";
  for (const i in education) {
    educationStr += "<li><b>" + i + ": </b>";
    for (const j in education[i]) {
      educationStr += education[i][j] + ", ";
    }
    educationStr = educationStr.substring(0, educationStr.lastIndexOf(","));
    educationStr += "</li>";
  }
  educationEl.innerHTML = educationStr;

  //internship
  const internship = resumeData.Internship;
  let intershipStr = "";
  for (const item in internship) {
    intershipStr += `<li><b>${item}</b>: ${resumeData.Internship[item]}</li>`;
  }
  internshipEl.innerHTML = intershipStr;

  //achievements
  const achievements = resumeData.achievements.Summary;
  let achievementsStr = "";
  for (const item of achievements) {
    achievementsStr += `<li>${item}</li>`;
  }
  achievementsEl.innerHTML = achievementsStr;
};

// event listeners
bodyEl.addEventListener("load", showNextResume());
btnNextEl.addEventListener("click", showNextResume);
btnPrevEl.addEventListener("click", showPrevResume);

searchEl.addEventListener("keypress", showFilteredResumes);
