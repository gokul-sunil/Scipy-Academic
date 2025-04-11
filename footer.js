document.addEventListener("DOMContentLoaded", () => {
  const tabContentMap = {
    "web-development": "content-web-development",
    "mobile-development": "content-mobile-development",
    "ui-ux-design": "content-ui-ux-design",
  };

  const tabs = document.querySelectorAll(".sectionContent-5-singleDiv");
  const contents = document.querySelectorAll(".secondContent-5");
  const pushDiv1 = document.getElementById("push1");
  const pushDiv2 = document.getElementById("push2");
  const pushDiv3 = document.getElementById("push3");
  const mainContent = document.querySelector(".sectionContent-5-main");

  function isSmallScreen() {
    return window.innerWidth <= 1021;
  }

  function resetPushDivs() {
    pushDiv1.classList.remove("active");
    pushDiv2.classList.remove("active");
    pushDiv3.classList.remove("active");
    // pushDiv1.innerHTML = ''; // Clear previous content
    // pushDiv2.innerHTML = '';
    // pushDiv3.innerHTML = '';
  }

  function handleTabClick(tab) {
    tabs.forEach((t) => t.classList.remove("active"));
    contents.forEach((content) => content.classList.remove("active"));

    resetPushDivs();

    tab.classList.add("active");
    const contentId = tabContentMap[tab.id];
    const contentElement = document.getElementById(contentId);

    if (contentElement) {
      if (isSmallScreen()) {
        // For small screens, push content to respective pushDiv based on tab
        if (tab.id === "web-development") {
          pushDiv1.appendChild(contentElement);
          pushDiv1.classList.add("active");
        } else if (tab.id === "mobile-development") {
          pushDiv2.appendChild(contentElement);
          pushDiv2.classList.add("active");
        } else if (tab.id === "ui-ux-design") {
          pushDiv3.appendChild(contentElement);
          pushDiv3.classList.add("active");
        }
      } else {
        // For larger screens, display content directly
        contentElement.classList.add("active");
      }
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => handleTabClick(tab));
  });

  function handleScreenResize() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 1021) {
      mainContent.style.flexDirection = "column";
      // Reset and reapply active content to pushDivs for small screens
      const activeTab = document.querySelector(
        ".sectionContent-5-singleDiv.active"
      );
      if (activeTab) handleTabClick(activeTab);
    } else {
      mainContent.style.flexDirection = "row";
      // Reset pushDivs and directly show active content
      resetPushDivs();
      const activeContent = document.querySelector(".secondContent-5.active");
      if (activeContent) activeContent.classList.add("active");
    }
  }

  window.addEventListener("resize", handleScreenResize);
  handleScreenResize();

  // Set the first tab as active by default
  tabs[0].classList.add("active");
  handleTabClick(tabs[0]);
});
// section3

const headingWrappers = document.querySelectorAll(".heading-wrapper");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  },
  {
    threshold: 0.9, // Only when most of the heading is in view
  }
);
const tabData = [
  {
    year: "2009 - 2010",
    role: "Student Researcher",
    badge: "Academic Position",
    university: "University of California",
    content:
      "In web development, my skills shine through with proficiency in front-end technologies like HTML, CSS, and JavaScript. I also excel in back-end frameworks such as Node.js and databases.",
  },
  {
    year: "2009 - 2010",
    role: "Lab Assistant",
    badge: "Academic Position",
    university: "University of California",
    content:
      "In web development, my skills shine through with proficiency in front-end technologies like HTML, CSS, and JavaScript. I also excel in back-end frameworks such as Node.js and databases.",
  },
  {
    year: "2010 - 2012",
    role: "Software Intern",
    badge: "Internship",
    university: "TechNova Inc.",
    content: "In web development, my skills shine through with proficiency in front-end technologies like HTML, CSS, and JavaScript. I also excel in back-end frameworks such as Node.js and databases.",
  },
  {
    year: "2012 - 2013",
    role: "Graduate Assistant",
    badge: "Academic Position",
    university: "Stanford University",
    content: "In web development, my skills shine through with proficiency in front-end technologies like HTML, CSS, and JavaScript. I also excel in back-end frameworks such as Node.js and databases.",
  },
  {
    year: "2013 - 2015",
    role: "Research Fellow",
    badge: "Research",
    university: "Harvard University",
    content: "In web development, my skills shine through with proficiency in front-end technologies like HTML, CSS, and JavaScript. I also excel in back-end frameworks such as Node.js and databases.",
  },
  {
    year: "2016 - 2018",
    role: "Data Scientist",
    badge: "Professional Role",
    university: "DataCorp",
    content: "In web development, my skills shine through with proficiency in front-end technologies like HTML, CSS, and JavaScript. I also excel in back-end frameworks such as Node.js and databases.",
  },
];

let currentPage = 0;
const itemsPerPage = 2;

function renderTabs() {
  const wrapper = document.getElementById("tabWrapper");
  wrapper.innerHTML = "";

  const start = currentPage * itemsPerPage;
  const end = Math.min(start + itemsPerPage, tabData.length);

  for (let i = start; i < end; i++) {
    const item = tabData[i];
    const tab = document.createElement("div");
    tab.className = "tab";
    tab.onclick = () => renderContent(i);
    tab.innerHTML = `
        <h3>${item.year}</h3>
        <div class="role">${item.role}<span class="badge">${item.badge}</span></div>
        <div style="margin-top: 10px;">${item.university}</div>
      `;
    wrapper.appendChild(tab);
  }

  renderContent(start); // Show content of the first item on the page
}

function renderContent(index) {
  const item = tabData[index];
  const display = document.getElementById("contentDisplay");
  display.innerHTML = `
      <h3>${item.role.toUpperCase()}</h3>
      <p>${item.content}</p>
    `;

  // Highlight active tab
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab, i) => {
    tab.classList.toggle("active", index === currentPage * itemsPerPage + i);
  });
}

function changePage(dir) {
  const maxPage = Math.ceil(tabData.length / itemsPerPage) - 1;
  currentPage += dir;
  if (currentPage < 0) currentPage = 0;
  if (currentPage > maxPage) currentPage = maxPage;
  renderTabs();
}

document.addEventListener("DOMContentLoaded", () => {
  renderTabs();
});
