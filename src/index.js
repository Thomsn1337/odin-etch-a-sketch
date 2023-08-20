let gridSize = 50;

const gridContainer = document.querySelector(".grid-container");

function generateGrid() {
  document.documentElement.style.setProperty("--grid-size", gridSize);
  for (let i = 0; i < gridSize ** 2; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid");

    gridContainer.appendChild(gridItem);
  }
}

window.addEventListener("load", generateGrid);
