let canvas = document.getElementById("renderer");
let ctx = canvas.getContext("2d");

// CONSTANTES
let CellSize = 30;
const ZOOM_SPEED = 1;

// VARIABLES
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
let shiftLeft = false;

let map = {};

setInterval(() => {
    if(mouseLeft && shiftLeft) {
        camX = mouseX + mouseCamOffsetX;
        camY = mouseY + mouseCamOffsetY;
    }

    //region AFFICHAGE
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //region MAP
    let startX = 0;
    //endregion

    //region GRILLE
    ctx.fillStyle = "black";
    // vertical
    for (let x = camX % CellSize; x < canvas.width; x += CellSize) {
        //ctx.fillRect(x, 0, 1, canvas.height);
    }
    // horizontal
    for (let y = camY % CellSize; y < canvas.height; y += CellSize) {
        //ctx.fillRect(0, y, canvas.width, 1);
    }
    //endregion

    //region MOUSE
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(coordX * CellSize + camX, coordY * CellSize + camY, CellSize, CellSize);
    //endregion

    //endregion
});

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    coordX = Math.floor((mouseX - camX) / CellSize);
    coordY = Math.floor((mouseY - camY) / CellSize);
    document.querySelector("#coordinates").innerHTML = `${coordX} : ${coordY}`;
});
document.addEventListener("mousedown", (e) => {
    if (e.which === 1) {
        mouseLeft = true;
        mouseCamOffsetX = camX - mouseX;
        mouseCamOffsetY = camY - mouseY;
    }
});
document.addEventListener("keydown", (e) => {
    if (e.code === "ShiftLeft") {
        shiftLeft = true;
    }
});document.addEventListener("keyup", (e) => {
    if (e.code === "ShiftLeft") {
        shiftLeft = false;
    }
});
document.addEventListener("mouseup", (e) => {
    if (e.which === 1) {
        mouseLeft = false;
    }
});
document.addEventListener("wheel", (e) => {
    let previousMouseX =  (mouseX - camX) / CellSize;
    let previousMouseY =  (mouseY - camY) / CellSize;
    CellSize -= e.deltaY / 100 * ZOOM_SPEED;
    if (CellSize < 3) {
        CellSize = 3;
    }
    let nowMouseX = (mouseX - camX) / CellSize;
    let nowMouseY = (mouseY - camY) / CellSize;
    camX += (nowMouseX - previousMouseX) * CellSize;
    camY += (nowMouseY - previousMouseY) * CellSize;
    coordX = Math.floor((mouseX - camX) / CellSize);
    coordY = Math.floor((mouseY - camY) / CellSize);
    document.querySelector("#coordinates").innerHTML = `${coordX} : ${coordY}`;
});