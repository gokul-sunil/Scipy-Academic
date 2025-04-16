function sendWhatsAppMessage(button) {
    
    const card = button.closest(".course-single-inner");
    
    
    const title = card.querySelector(".course-Heading")?.innerText.trim();
    // const details = card.querySelector(".course-details")?.innerText.trim();
  
    
    const message = `Hi Scipy Technologies! I'm interested in your "${title}" course. \n\nCan you please provide more information?`;
  
    
    const encodedMessage = encodeURIComponent(message);
  
    
    const phoneNumber = "919567951490"; 
  
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  }
  document.addEventListener("DOMContentLoaded", () => {
    const loadMoreBtn = document.querySelector(".loadMore");
    const hiddenCourses = document.querySelectorAll(".hidden-course");
  
    loadMoreBtn.addEventListener("click", () => {
      hiddenCourses.forEach(card => {
        card.classList.remove("hidden-course");
      });

      loadMoreBtn.style.display = "none";
    });
  });