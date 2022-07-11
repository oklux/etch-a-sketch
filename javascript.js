const grid = document.querySelector('.grid');
const slider = document.getElementById("slider");
const gridLabel = document.getElementById('grid-label');
const rainbow = document.getElementById('rainbow');
const reset = document.getElementById('reset');
const eraser = document.getElementById('eraser')
const colorpicker = document.getElementById('colorpicker');
const colorBtn = document.getElementById('colorbtn');

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


function createGrid(size) {
    removeCells();
    for (let i = 0; i < size;i++) {
            const row = document.createElement('div');
            row.classList.add('row')
            for (let e = 0; e < size;e++) {
                const ele = document.createElement('div');
                ele.classList.add('box');
                ele.style.width = (600 / size ) + "px";
                ele.style.height = (600 / size ) + "px";
                ele.addEventListener('mouseover', changeColor);
                ele.addEventListener('mousedown', changeColor);
                row.appendChild(ele);
                } grid.appendChild(row);
            } 
        
}

function removeCells() {
    while(grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }
  }

let currentMode = "color";
let currentColor = "black";
let eraserMode = false;

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    e.preventDefault();
    if (currentMode === 'rainbow') {
        e.target.style.backgroundColor = getRandomRgb();
    } else if (currentMode === 'color') {
      e.target.style.backgroundColor = currentColor;
    }
}
function getRandomRgb() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
rainbow.addEventListener('click', function() {
    if (currentMode === 'rainbow') {
        rainbow.classList.remove('clickbutton');
        currentMode = 'color';
        return;
    }
    eraser.classList.remove('clickbutton');
    colorBtn.classList.remove('clickbutton');
    rainbow.classList.add('clickbutton');
    currentMode = 'rainbow';
});

eraser.addEventListener('click', function() {
  if (currentMode === 'rainbow') {
      rainbow.classList.remove('clickbutton');
      colorBtn.classList.remove('clickbutton');
      eraser.classList.add('clickbutton');
      eraserMode = true;
      currentMode = 'color';
      currentColor = 'white';
      return;
  } if (eraserMode === true) {
    colorBtn.classList.remove('clickbutton');
    eraser.classList.remove('clickbutton');
    currentColor = colorpicker.value;
    eraserMode = false;
    return;
  }
  eraser.classList.add('clickbutton');
  colorBtn.classList.remove('clickbutton');
  eraserMode = true;
  currentMode = 'color';
  currentColor = 'white';
  return;
});

colorpicker.addEventListener('change', (e) => {
  if (currentMode === 'rainbow') {
    rainbow.classList.remove('clickbutton');
    colorBtn.classList.add('clickbutton');
    currentMode = 'color';
    currentColor = e.target.value;
    colorBtn.style.backgroundColor = e.target.value;
    return;
} if (eraserMode === true) {
  colorBtn.classList.add('clickbutton');
    eraser.classList.remove('clickbutton');
    currentColor = e.target.value;
    colorBtn.style.backgroundColor = e.target.value;
    currentMode = 'color';
    eraserMode = false;
    return;
  } else {
    colorBtn.classList.add('clickbutton');
    colorBtn.style.backgroundColor = e.target.value;
    currentColor = e.target.value;
    currentMode = 'color';
  }
})


let currentSize = 16;

reset.addEventListener('mousedown', () => {
  reset.classList.add('clickbutton');
});

reset.addEventListener('mouseup', () => {
  reset.classList.remove('clickbutton');
  createGrid(currentSize);
})


slider.addEventListener("change", function() { 
    createGrid(slider.value);
    gridLabel.textContent = slider.value + " x " + slider.value;
    currentSize = slider.value;
});

createGrid(slider.value);
