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
let coordX = 0;
let coordY = 0;

setInterval(() => {
    if(mouseLeft) {
        camX = mouseX + mouseCamOffsetX;
        camY = mouseY + mouseCamOffsetY;
    }

    //region AFFICHAGE
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //region GRILLE
    ctx.fillStyle = "black";
    // vertical
    for (let x = camX % CELLSIZE; x < canvas.width; x += CELLSIZE) {
        //ctx.fillRect(x, 0, 1, canvas.height);
    }
    // horizontal
    for (let y = camY % CELLSIZE; y < camY + PLAYGROUND_HEIGHT * CELLSIZE; y += CELLSIZE) {
        //ctx.fillRect(0, y, canvas.width, 1);
    }
    //endregion

    //region MOUSE
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(coordX * CELLSIZE + camX, coordY * CELLSIZE + camY, CELLSIZE, CELLSIZE);
    //endregion

    //endregion
});

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    coordX = Math.floor((mouseX - camX) / CELLSIZE);
    coordY = Math.floor((mouseY - camY) / CELLSIZE);
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