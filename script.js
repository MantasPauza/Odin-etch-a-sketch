const createButton = document.querySelector('#create_grid');
const gridContainer = document.querySelector('#grid_container');


createButton.addEventListener('click', createGrid);


function createGrid() {
    const size = parseInt(prompt('Size of grid'));
  gridContainer.style.setProperty('--grid-rows', 4);
  gridContainer.style.setProperty('--grid-cols', 4);
  gridContainer.style.border = '1px solid black'
  for (let i = 0; i < (size * size); i++) {
    let cell = document.createElement("div");
    gridContainer.appendChild(cell).className = "grid-item";
  };



};