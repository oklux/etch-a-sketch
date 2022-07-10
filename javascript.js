const grid = document.querySelector('.grid');

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


function createGrid(size) {
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

let currentMode = "color";
let currentColor = "black";

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    e.preventDefault();
    if (currentMode === 'color') {
      e.target.style.backgroundColor = currentColor;
    }
}

createGrid(16);

