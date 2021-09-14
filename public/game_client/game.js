const container = document.querySelector(".container");

container.addEventListener("click", (event) => {
  if (event.target.classList.contains("gameBox")) {
    console.log("you clicked on the field");
  }
});
