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
