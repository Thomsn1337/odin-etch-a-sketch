let gridSize = 20;
let mouseState = false;
const defaultColor = "#e3dde2";

const gridContainer = document.querySelector(".grid-container");

function generateGrid() {
  document.documentElement.style.setProperty("--grid-size", gridSize);
  for (let i = 0; i < gridSize ** 2; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid");
    gridItem.addEventListener("mousemove", function () {
      if (mouseState) this.style.backgroundColor = defaultColor;
    });

    gridContainer.appendChild(gridItem);
  }
}

window.addEventListener("load", generateGrid);
window.addEventListener("mousedown", () => (mouseState = true));
window.addEventListener("mouseup", () => (mouseState = false));
