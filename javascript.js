const grid = document.querySelector('.grid');
const boxes = document.querySelectorAll('.box');

function addColor(box) {
    box.classList.add('customBg');
}

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
                row.appendChild(ele);
                ele.addEventListener('dragenter', (e) => {
                    ele.style.backgroundColor = "blue"
                })
            }
        grid.appendChild(row);
    }
}

createGrid(16);

