let gridSize = 20;
let mouseState = false;
const defaultColor = "#cad3f5";
let drawingColor = defaultColor;

const gridContainer = document.querySelector(".grid-container");
const gridSizeLabels = document.querySelectorAll(".size");
const gridSizeSlider = document.querySelector("#grid-size");
const regenerateButton = document.querySelector("#regenerate-grid");
const clearButton = document.querySelector("#clear-grid");
const pencilButton = document.querySelector("#pencil");
const eraserButton = document.querySelector("#eraser");

function generateGrid() {
  document.documentElement.style.setProperty("--grid-size", gridSize);
  for (let i = 0; i < gridSize ** 2; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid");
    gridItem.addEventListener("mousemove", function () {
      if (mouseState) this.style.backgroundColor = drawingColor;
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

function clearGrid() {
  const grid = document.querySelectorAll(".grid");
  grid.forEach(gridItem => gridItem.style.backgroundColor = "transparent");
}

gridSizeSlider.addEventListener("input", function () {
  gridSizeLabels.forEach(label => label.textContent = this.value);
});

regenerateButton.addEventListener("click", regenerateGrid);
clearButton.addEventListener("click", clearGrid);

pencilButton.addEventListener("click", () => {
  pencilButton.classList.add("active");
  eraserButton.classList.remove("active");
  drawingColor = defaultColor;
});
eraserButton.addEventListener("click", () => {
  eraserButton.classList.add("active");
  pencilButton.classList.remove("active");
  drawingColor = "transparent";
});

window.addEventListener("load", () => {
  generateGrid();
  gridSizeSlider.value = gridSize;
  gridSizeLabels.forEach(label => label.textContent = gridSize);
});
window.addEventListener("mousedown", () => (mouseState = true));
window.addEventListener("mouseup", () => (mouseState = false));
