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
            const activeTab = document.querySelector(".sectionContent-5-singleDiv.active");
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
