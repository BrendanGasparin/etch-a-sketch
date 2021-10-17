const size = 50;

function main() {
    createGrid(size, size);
    document.querySelector('button').addEventListener('click', recreateGrid);
}

function createGrid(ySize, xSize) {
    const display = document.querySelector('.display');
    const dHeight = display.clientHeight;
    const dWidth = display.clientWidth;
    const grid = [ySize][xSize];

    for(let r = 0; r < ySize; r++) {
        for(let c = 0; c < xSize; c++) {
            const top = Math.round(r * (dHeight / ySize));
            const height = Math.round((r + 1) * (dHeight / ySize)) - Math.round(r * (dHeight / ySize));
            const left = Math.round(c * (dWidth / xSize));
            const width = Math.round((c + 1) * (dWidth / xSize)) - Math.round(c * (dWidth / xSize));

            const pixel = document.createElement('div');
            pixel.classList.add('grid-pixel');
            pixel.style.height = height + 'px';
            pixel.style.width = width + 'px';
            pixel.style.top = top + 'px';
            pixel.style.left = left + 'px';

            display.appendChild(pixel);
            pixel.addEventListener('mousemove', (e) => {
                e.target.style.backgroundColor = '#111111';
            });
            pixel.addEventListener('touchstart', (e) => {
                e.target.style.backgroundColor = '#111111';
            });
            pixel.addEventListener('touchmove', (e) => {
                e.preventDefault(); // prevent screen from scrolling on touch drag

                // workaround to get current element being touched
                var myLocation = e.changedTouches[0];
                var realTarget = document.elementFromPoint(myLocation.clientX, myLocation.clientY);

                realTarget.style.backgroundColor = '#111111';
            });

            // if the screen tilts then reset the display or it will break
            window.addEventListener('resize', () => {
                location.reload();
            });
        }
    }
}

function destroyGrid() {
    const display = document.querySelector('.display');
    let child = display.lastElementChild;
    while (child) {
        display.removeChild(child);
        child = display.lastElementChild;
    }
}

function recreateGrid() {
    destroyGrid();
    const size = document.querySelector('input').value;
    if (size > 100) size = 100;
    createGrid(size, size);
}

document.addEventListener('DOMContentLoaded', main);