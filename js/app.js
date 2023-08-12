
const openButtonElement = document.querySelector(".button--menu");
const openNavElement = document.querySelector(".nav");
const buttonClickHandler = function() {
    openNavElement.classList.toggle("nav--open"); 
    openButtonElement.classList.toggle("button--open");     
}

openButtonElement.addEventListener("click", buttonClickHandler);
