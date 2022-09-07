import { rangeInputs, handleInputChange } from "./script/_slider.js"; // importing input controls

const undoButton = document.querySelector("#undoButton"); //
const clearButton = document.querySelector("#clearButton"); // selecting buttons to add functionality to undo/clear buttons

undoButton.addEventListener('click', undoCanvas); //
clearButton.addEventListener("click", clearCanvas); // adding event listeners to undo/clear buttons

const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth - 150;
canvas.height = window.innerHeight - 250;

window.pickedColor = pickedColor;
window.inputValue = inputValue;

let context = canvas.getContext("2d");
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

let drawColor = "black";
let drawWidth = "1";
let isDrawing = false;
let historyArray = [];
let index = -1;

canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseout", stop, false);

function start(event) {
  isDrawing = true;
  context.beginPath();
  context.moveTo(
    event.clientX - canvas.offsetLeft,
    event.clientY - canvas.offsetTop
  );
  event.preventDefault();
}

function stop(event) {
  if (isDrawing) {
    context.stroke();
    context.closePath();
    isDrawing = false;
  }
  event.preventDefault();
  if (event.type != "mouseout") {
    historyArray.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
  }
}

function draw(event) {
  if (isDrawing) {
    context.lineTo(
      event.clientX - canvas.offsetLeft,
      event.clientY - canvas.offsetTop
    );
    context.strokeStyle = drawColor;
    context.lineWidth = drawWidth;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  }
  event.preventDefault();
}

rangeInputs.forEach((input) => {
  input.addEventListener("input", handleInputChange);
});

function pickedColor(element) {
  drawColor = element.value;
}

function inputValue(element) {
  drawWidth = element.value;
}


function clearCanvas() {
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);

  historyArray = [];
  index = -1;
}

function undoCanvas() {
  if ( index <= 0) {
    clearCanvas();
  } else {
  index = index - 1;
  historyArray.pop();
  context.putImageData(historyArray[index], 0, 0);
  }
}
