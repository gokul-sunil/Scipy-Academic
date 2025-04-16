document.addEventListener("DOMContentLoaded", () => {
  // Carousel functionality
  const imageSlides = document.getElementById("slides");
  const textSlides = document.getElementById("textSlides");
  const barFill = document.getElementById("bar-fill");
  const currentSlideText = document.getElementById("current-slide");
  const totalSlidesText = document.getElementById("total-slides");

  const originalSlideCount = imageSlides.children.length - 1; // excluding clone
  let currentIndex = 0;
  let slideInterval;

  totalSlidesText.textContent = originalSlideCount;

  // Animate transition to a slide
  function slideTo(index) {
    imageSlides.style.transition = "transform 0.5s ease-in-out";
    textSlides.style.transition = "transform 0.5s ease-in-out";
    imageSlides.style.transform = `translateX(-${index * 100}%)`;
    textSlides.style.transform = `translateX(-${index * 100}%)`;
    updateProgressBar();
  }

  // Auto slide every 3 seconds
  function autoSlide() {
    currentIndex++;
    if (currentIndex === originalSlideCount) {
      slideTo(currentIndex);
      setTimeout(() => {
        imageSlides.style.transition = "none";
        textSlides.style.transition = "none";
        imageSlides.style.transform = `translateX(0%)`;
        textSlides.style.transform = `translateX(0%)`;
        currentIndex = 0;
        updateProgressBar();
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            imageSlides.style.transition = "transform 0.5s ease-in-out";
            textSlides.style.transition = "transform 0.5s ease-in-out";
          });
        });
      }, 500);
    } else {
      slideTo(currentIndex);
    }
  }

  // Update the progress bar and counter
  function updateProgressBar() {
    const total = originalSlideCount;
    const current = currentIndex + 1 > total ? 1 : currentIndex + 1;
    currentSlideText.textContent = current;
    barFill.style.transition = "none";
    barFill.style.width = "0%";
    setTimeout(() => {
      barFill.style.transition = "width 3s linear";
      barFill.style.width = "100%";
    }, 50);
  }

  // Start the slider
  function startSlider() {
    goToSlide(0);
    slideInterval = setInterval(autoSlide, 3000);
  }

  startSlider();

  // Go to a specific slide
  function goToSlide(index) {
    currentIndex = index;
    slideTo(index);
  }
  const nextBtn = document.getElementById("nextBtn2");
  nextBtn.addEventListener("click", () => {
    clearInterval(slideInterval);
    autoSlide();
    slideInterval = setInterval(autoSlide, 3000);
  });

  // Custom cursor
  const carouselDiv = document.querySelector(".right-main-4-upper");
  const customCursor = document.querySelector(".custom-cursor");
  const buttonDivArrow = document.querySelector(".button-slider-2");
  buttonDivArrow.addEventListener("mouseenter", () => {
    customCursor.style.display = "none";
  });
  buttonDivArrow.addEventListener("mouseleave", () => {
    customCursor.style.display = "flex";
  });
  carouselDiv.addEventListener("mouseenter", () => {
    customCursor.style.display = "flex";
    customCursor.classList.add("beat-once");
  });

  carouselDiv.addEventListener("mouseleave", () => {
    customCursor.style.display = "none";
    document.body.style.cursor = "default";
  });

  carouselDiv.addEventListener("mousemove", (e) => {
    const rect = carouselDiv.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    customCursor.style.left = `${x}px`;
    customCursor.style.top = `${y}px`;
  });

  // Slide click event for the side page
  const slides = document.querySelectorAll(".slide");
  const sidePage = document.querySelector(".side-page");
  const closeBtn = document.querySelector(".close-btn");

  slides.forEach((slide) => {
    slide.addEventListener("click", (e) => {
      const slideId = e.currentTarget.getAttribute("data-id");
      showSlideDetails(slideId);
      document.body.classList.add("no-scroll");
    });
  });

  closeBtn.addEventListener("click", () => {
    sidePage.classList.remove("open");
    document.body.classList.remove("no-scroll");
  });

  function showSlideDetails(slideId) {
    const sidePage = document.getElementById("sidePage");
    const detailTitle = document.getElementById("detail-title");
    const detailDescription = document.getElementById("detail-description");

    // Open the modal
    sidePage.classList.add("open");
    // Build file path dynamically
    const filePath = `./Sliders/slider${slideId}.html`;

    // Fetch and load the content
    fetch(filePath)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load file");
        return response.text();
      })
      .then((content) => {
        detailDescription.innerHTML = content;
      })
      .catch((error) => {
        detailDescription.innerHTML = `<p style="color:red;">Failed to load content for Slide ${slideId}.</p>`;
        console.error("Error loading slide content:", error);
      });
  }

  function closeSidePage() {
    const sidePage = document.getElementById("sidePage");
    sidePage.classList.remove("open");
  }
});
