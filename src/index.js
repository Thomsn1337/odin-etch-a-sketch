let gridSize = 20;
let mouseState = false;

const gridContainer = document.querySelector(".grid-container");
const gridSizeLabels = document.querySelectorAll(".size");
const gridSizeSlider = document.querySelector("#grid-size");
const regenerateButton = document.querySelector("#regenerate-grid");
const clearButton = document.querySelector("#clear-grid");
const colorPicker = document.querySelector("#drawing-color");
const pencilButton = document.querySelector("#pencil");
const rainbowButton = document.querySelector("#rainbow");
const eraserButton = document.querySelector("#eraser");

let drawingColor = colorPicker.value;
let drawingMode = "default";

function generateGrid() {
  document.documentElement.style.setProperty("--grid-size", gridSize);
  for (let i = 0; i < gridSize ** 2; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid");
    gridItem.addEventListener("mouseover", draw);

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

function draw(e) {
  if (mouseState) {
    chooseColor();
    e.target.style.backgroundColor = drawingColor;
  }
}

function chooseColor() {
  if (drawingMode === "default") drawingColor = colorPicker.value;
  else if (drawingMode === "eraser") drawingColor = "transparent";
  else if (drawingMode === "rainbow") {
    const colorR = Math.floor(Math.random() * 256);
    const colorG = Math.floor(Math.random() * 256);
    const colorB = Math.floor(Math.random() * 256);
    drawingColor = `rgb(${colorR}, ${colorG}, ${colorB})`
  }
}

gridSizeSlider.addEventListener("input", function () {
  gridSizeLabels.forEach(label => label.textContent = this.value);
});

regenerateButton.addEventListener("click", regenerateGrid);
clearButton.addEventListener("click", clearGrid);

pencilButton.addEventListener("click", () => {
  pencilButton.classList.add("active");
  rainbowButton.classList.remove("active");
  eraserButton.classList.remove("active");
  drawingMode = "default";
});
rainbowButton.addEventListener("click", () => {
  pencilButton.classList.remove("active");
  rainbowButton.classList.add("active");
  eraserButton.classList.remove("active");
  drawingMode = "rainbow";
});
eraserButton.addEventListener("click", () => {
  pencilButton.classList.remove("active");
  rainbowButton.classList.remove("active");
  eraserButton.classList.add("active");
  drawingMode = "eraser";
});

window.addEventListener("load", () => {
  generateGrid();
  gridSizeSlider.value = gridSize;
  gridSizeLabels.forEach(label => label.textContent = gridSize);
});
window.addEventListener("mousedown", () => (mouseState = true));
window.addEventListener("mouseup", () => (mouseState = false));
