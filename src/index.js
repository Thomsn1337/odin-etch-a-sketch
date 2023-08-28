let gridSize = 20;
let mouseState = false;
const defaultColor = "#cad3f5";

const gridContainer = document.querySelector(".grid-container");
const gridSizeLabels = document.querySelectorAll(".size");
const gridSizeSlider = document.querySelector("#grid-size");
const regenerateButton = document.querySelector("#regenerate-grid");

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

function deleteGrid() {
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.lastChild);
  }
}

function regenerateGrid() {
  deleteGrid();
  gridSize = gridSizeSlider.value;
  generateGrid();
}

gridSizeSlider.addEventListener("input", function () {
  gridSizeLabels.forEach(label => label.textContent = this.value);
});

regenerateButton.addEventListener("click", regenerateGrid);

window.addEventListener("load", () => {
  generateGrid();
  gridSizeSlider.value = gridSize;
  gridSizeLabels.forEach(label => label.textContent = gridSize);
});
window.addEventListener("mousedown", () => (mouseState = true));
window.addEventListener("mouseup", () => (mouseState = false));
