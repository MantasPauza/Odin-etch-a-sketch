import { rangeInputs, handleInputChange } from "./script/_slider.js"; // importing input controls

window.pickedColor = pickedColor;
window.inputValue = inputValue;

const undoButton = document.querySelector("#undoButton");
const clearButton = document.querySelector("#clearButton"); // selecting buttons to add functionality to undo/clear buttons

undoButton.addEventListener("click", undoCanvas);
clearButton.addEventListener("click", clearCanvas); // adding event listeners to undo/clear buttons

const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth - 400;
canvas.height = window.innerHeight - 250; // setting canvas height and width

let context = canvas.getContext("2d");
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height); // setting canvas to white

let drawColor = "black"; //
let drawWidth = "1"; //
let isDrawing = false; //  setting variables to use in functions
let historyArray = []; //
let index = -1; //

canvas.addEventListener("mousedown", start, false); //
canvas.addEventListener("mouseup", stop, false); //
canvas.addEventListener("mousemove", draw, false); //  adding event listeners to see when you are pressing to draw and then you are releasing to stop drawing
canvas.addEventListener("mouseout", stop, false); //

function start(event) {
  // start function prepares the canvas to be drawn on
  isDrawing = true;
  context.beginPath();
  context.moveTo(
    event.clientX - canvas.offsetLeft,
    event.clientY - canvas.offsetTop
  );
  event.preventDefault();
}

function stop(event) {
  // stop function stops the drawing
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
  // draw function actually draws on the canvas
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
  // listening for range inputs in the width selection input
  input.addEventListener("input", handleInputChange);
});

function pickedColor(element) {
  // sets drawing color to selected option from the color picker
  drawColor = element.value;
}

function inputValue(element) {
  // sets drawing width to selected option from the width selection input
  drawWidth = element.value;
}

function clearCanvas() {
  // clear the canvas
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);

  historyArray = [];
  index = -1;
}

function undoCanvas() {
  // undo the last input on canvas
  if (index <= 0) {
    clearCanvas();
  } else {
    index = index - 1;
    historyArray.pop();
    context.putImageData(historyArray[index], 0, 0);
  }
}

const colorPicker = document.querySelector(".color_picker");
colorPicker.addEventListener("change", (event) => {
  canvas.style.boxShadow = `12px 0px 60px 3px ${colorPicker.value}`; // sets canvas boxShadow to selected color
});
