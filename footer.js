document.addEventListener("DOMContentLoaded", function () {
  const heading = document.querySelector(".carousel-item");
  const mainContainer = document.querySelector(".cscontainer");
  const carouselWrapper = document.querySelector(".cswrapper");


  setTimeout(() => {
    heading.style.opacity = 1;
  }, 100);

 
  setTimeout(() => {
    heading.style.opacity = 0;
  }, 3000);


  heading.addEventListener("transitionend", () => {
    carouselWrapper.style.display = "none";
    mainContainer.style.display = "block";
  });
})
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
        return window.innerWidth <= 886;
    }

    function resetPushDivs() {
        pushDiv1.classList.remove("active");
        pushDiv2.classList.remove("active");
        pushDiv3.classList.remove("active");
    }

    function handleTabClick(tab) {
        // Remove all active states
        tabs.forEach((t) => t.classList.remove("active"));
        contents.forEach((content) => content.classList.remove("active"));
        resetPushDivs();
    
        // Set clicked tab as active
        tab.classList.add("active");
    
        const contentId = tabContentMap[tab.id];
        const contentElement = document.getElementById(contentId);
    
        if (!contentElement) return;
    
        if (isSmallScreen()) {
            // On small screens, move content to appropriate push div
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
            contentElement.classList.add("active"); // 👈✅ show it!
        } else {
            // On large screens, move content back to the main section container
            const mainSection = document.querySelector(".sectionContent-5-second");
            mainSection.appendChild(contentElement); // Move it back
            contentElement.classList.add("active");  // 👈✅ show it!
        }
    }
    
    

    function handleScreenResize() {
        if (isSmallScreen()) {
            mainContent.style.flexDirection = "column";
        } else {
            mainContent.style.flexDirection = "row";
        }
    
        // Re-run the logic to re-display current tab correctly
        const activeTab = document.querySelector(".sectionContent-5-singleDiv.active");
        if (activeTab) handleTabClick(activeTab);
    }
    
    

    // Make sure it's active
    window.addEventListener("resize", handleScreenResize);
    handleScreenResize(); // initial call on load

    // Init tabs
    tabs.forEach((tab) => {
        tab.addEventListener("click", () => handleTabClick(tab));
    });

  // Set the first tab as active by default
  tabs[0].classList.add("active");
  handleTabClick(tabs[0]);
});

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

//cont4
const imageSlides = document.getElementById("slides");
const textSlides = document.getElementById("textSlides");

const barFill = document.getElementById('bar-fill');
const currentSlideText = document.getElementById('current-slide');
const totalSlidesText = document.getElementById('total-slides');

const originalSlideCount = imageSlides.children.length - 1; // excluding clone
let currentIndex = 0;
let slideInterval;

// Set total slide count (excluding clone)
totalSlidesText.textContent = originalSlideCount;

// Go to a specific slide
function goToSlide(index) {
  currentIndex = index;
  slideTo(index);
}

// Animate transition to a slide
function slideTo(index) {
  imageSlides.style.transition = 'transform 0.5s ease-in-out';
  textSlides.style.transition = 'transform 0.5s ease-in-out';

  imageSlides.style.transform = `translateX(-${index * 100}%)`;
  textSlides.style.transform = `translateX(-${index * 100}%)`;

  updateProgressBar();
}

// Auto slide every 3 seconds
function autoSlide() {
  currentIndex++;

  if (currentIndex === originalSlideCount) {
    slideTo(currentIndex); // Animate to cloned last slide

    setTimeout(() => {
      // Instantly reset to real first slide (index 0)
      imageSlides.style.transition = 'none';
      textSlides.style.transition = 'none';

      imageSlides.style.transform = `translateX(0%)`;
      textSlides.style.transform = `translateX(0%)`;

      currentIndex = 0;
      updateProgressBar();

      // Restore transition for the next loop
      setTimeout(() => {
        imageSlides.style.transition = 'transform 0.5s ease-in-out';
        textSlides.style.transition = 'transform 0.5s ease-in-out';
      }, 50);
    }, 500); // Wait for transition to cloned slide
  } else {
    slideTo(currentIndex);
  }
}

// Update the progress bar and counter
function updateProgressBar() {
  const total = originalSlideCount;
  const current = currentIndex + 1 > total ? 1 : currentIndex + 1;

  // Update slide counter
  currentSlideText.textContent = current;

  // Reset bar instantly
  barFill.style.transition = 'none';
  barFill.style.width = '0%';

  // Then animate the fill over 3s
  setTimeout(() => {
    barFill.style.transition = 'width 3s linear';
    barFill.style.width = '100%';
  }, 50);
}

// Start the slider
function startSlider() {
  goToSlide(0);
  slideInterval = setInterval(autoSlide, 3000);
}

startSlider();