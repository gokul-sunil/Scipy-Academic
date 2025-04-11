document.addEventListener("DOMContentLoaded",()=>{
    const closeBtn =document.querySelector(".slider1CloseDiv");
    const closeContent=document.querySelector(".slider1Container")
    closeBtn.addEventListener("click",()=>{
        closeContent.classList.add("active");
    })
})