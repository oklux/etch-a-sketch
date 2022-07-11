const grid = document.querySelector('.grid');
const slider = document.getElementById("slider");
const gridLabel = document.getElementById('grid-label');
const rainbow = document.querySelector('#rainbow');

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
                ele.style.width = (540 / size) + "px";
                ele.style.height = (540 / size) + "px";
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
    rainbow.classList.add('clickbutton');
    currentMode = 'rainbow';
});

slider.addEventListener("change", function() { 
    createGrid(slider.value);
    gridLabel.textContent = slider.value + " x " + slider.value;
});

createGrid(slider.value);
