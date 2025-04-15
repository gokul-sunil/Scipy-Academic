
document.addEventListener("DOMContentLoaded", () => {
    const closeBtn = document.querySelector(".slider1CloseDiv");
    const closeContent = document.querySelector(".slider1Container");
    const form = document.getElementById("myForm");
    const modal = document.getElementById("modal");
  
    closeBtn.addEventListener("click", () => {
      closeContent.classList.add("active");
    });
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const submitButton = document.getElementById("submitButton");
      submitButton.disabled = true;
      submitButton.innerText = "Sending...";
      const data = {
        Name: form.name.value,
        Email: form.email.value,
        Subject: form.subject.value,
        Message: form.message.value,
      };
  
      fetch("https://script.google.com/macros/s/AKfycbzGTQPB18wULC2jvqmQcHu4fAeyzeR51aD1tEm_DdSq-xJwyT2kccjbFBMRJFTeUzGp/exec", {
        method: "POST",
        mode: "no-cors", // Use `cors` if you enable CORS on the Apps Script side
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(() => {
          modal.style.display = "flex";
          form.reset();
        })
        .catch((error) => {
          console.error("Error!", error.message);
        });
    });
  });
  
  function closeModal() {
    document.getElementById("modal").style.display = "none";
  }
  