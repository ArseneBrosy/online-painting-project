let canvas = document.getElementById("renderer");
let ctx = canvas.getContext("2d");

//#region CONSTANTES
let CELLSIZE = 30;

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
let shiftLeft = false;

setInterval(() => {
    if(mouseLeft && shiftLeft) {
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
        ctx.fillRect(x, 0, 1, canvas.height);
    }
    // horizontal
    for (let y = camY % CELLSIZE; y < canvas.height; y += CELLSIZE) {
        ctx.fillRect(0, y, canvas.width, 1);
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