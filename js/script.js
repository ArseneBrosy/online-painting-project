let canvas = document.getElementById("renderer");
let ctx = canvas.getContext("2d");

//#region CONSTANTES
let CELLSIZE = 30;
const PLAYGROUND_WIDTH = 100;
const PLAYGROUND_HEIGHT = 100;
const GEN_TIME = 50;

// couleurs
const c_cells = ["transparent", "white", "blue"];
//#endregion

//#region VARIABLES
let camX = 0;
let camY = 0;

// souris
let mouseX = 0;
let mouseY = 0;
let mouseLeft = false;
let mouseCamOffsetX = 0;
let mouseCamOffsetY = 0;

// cellules
let cells = [];
let newCells = [];
for (let y = 0; y < PLAYGROUND_HEIGHT; y++) {
    let newRow = [];
    for (let x = 0; x < PLAYGROUND_WIDTH; x++) {
        newRow.push(0);
    }
    cells.push(newRow);
}

/*
//GLIDER
cells[2][0] = 1;
cells[0][1] = 1;
cells[1][2] = 1;
cells[2][1] = 1;
cells[2][2] = 1;
*/

// GLIDER GUN
cells[1][5] = 1;
cells[1][6] = 1;
cells[2][5] = 1;
cells[2][6] = 1;

cells[13][3] = 1;
cells[14][3] = 1;
cells[12][4] = 1;
cells[11][5] = 1;
cells[11][6] = 1;
cells[11][7] = 1;
cells[12][8] = 1;
cells[13][9] = 1;
cells[14][9] = 1;

cells[15][6] = 1;

cells[16][4] = 1;
cells[17][5] = 1;
cells[17][6] = 1;
cells[18][6] = 1;
cells[17][7] = 1;
cells[16][8] = 1;

cells[21][3] = 1;
cells[21][4] = 1;
cells[21][5] = 1;
cells[22][3] = 1;
cells[22][4] = 1;
cells[22][5] = 1;

cells[23][2] = 1;
cells[23][6] = 1;

cells[25][1] = 1;
cells[25][2] = 1;
cells[25][6] = 1;
cells[25][7] = 1;

cells[35][3] = 1;
cells[35][4] = 1;
cells[36][3] = 1;
cells[36][4] = 1;
//#endregion

function neighbours(x, y, cell = 1) {
    let count = 0;
    let xMin = -1;
    let xMax = 1;
    let yMin = -1;
    let yMax = 1;
    if (x <= 0) {
        xMin = 0;
    }
    if (x >= PLAYGROUND_WIDTH -1 ) {
        xMax = 0;
    }
    if (y <= 0) {
        yMin = 0;
    }
    if (y >= PLAYGROUND_HEIGHT -1 ) {
        yMax = 0;
    }
    for (let offY = yMin; offY <= yMax; offY ++) {
        for (let offX = xMin; offX <= xMax; offX ++) {
            if (cells[x + offX][y + offY] === cell && !(offX === 0 && offY === 0)) {
                count ++;
            }
        }
    }
    return count;
}

setInterval(() => {
    if(mouseLeft) {
        camX = mouseX + mouseCamOffsetX;
        camY = mouseY + mouseCamOffsetY;
    }

    //#region AFFICHAGE
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //#region GRILLE
    ctx.fillStyle = "black";
    // vertical
    for (let x = camX % CELLSIZE; x < canvas.width; x += CELLSIZE) {
        ctx.fillRect(x - 1, 0, 2, canvas.height);
    }
    // horizontal
    for (let y = camY % CELLSIZE; y < camY + PLAYGROUND_HEIGHT * CELLSIZE; y += CELLSIZE) {
        ctx.fillRect(0, y - 1, canvas.width, 2);
    }
    //#endregion
    //#endregion
});

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
document.addEventListener("mousedown", (e) => {
    if (e.which === 1) {
        mouseLeft = true;
        mouseCamOffsetX = camX - mouseX;
        mouseCamOffsetY = camY - mouseY;
    }
});
document.addEventListener("mouseup", (e) => {
    if (e.which === 1) {
        mouseLeft = false;
    }
});