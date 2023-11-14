let canvas = document.getElementById("renderer");
let ctx = canvas.getContext("2d");

// CONSTANTES
let CellSize = 30;
const ZOOM_SPEED = 1;

// VARIABLES
let camX = 0;
let camY = 0;

let selectedColor = "#000000";
let onPalette = false;

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

let palette = ["#bd0038", "#ff4500", "#ffa800", "#ffd636", "#00a468", "#00cc77", "#7fed56", "#00756f", "#009eaa", "#2e50a3", "#368fe9", "#5139f4", "#4a34c1", "#6b5cff", "#811e9f", "#b34ac0", "#ff3881", "#ff98a9", "#6d482e", "#9c6927", "#000000", "#898d90", "#d3d7da", "#ffffff"];

let HTMLpalette = "";
for (let color of palette) {
    HTMLpalette += `<button onclick="selectedColor = '${color}'" style="background-color: ${color}"></button>`
}
document.querySelector("#palette").innerHTML = HTMLpalette;

setInterval(() => {
    if(mouseLeft && shiftLeft) {
        camX = mouseX + mouseCamOffsetX;
        camY = mouseY + mouseCamOffsetY;
    } else if (mouseLeft && !onPalette) {
        // Draw
        document.dispatchEvent(new CustomEvent("placepixel", {detail: {x: coordX, y: coordY}}));
    }

    //region AFFICHAGE
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //region MAP
    let startX = Math.floor(-camX / CellSize);
    let startY = Math.floor(-camY / CellSize);
    let endX = Math.floor((canvas.width - camX) / CellSize);
    let endY = Math.floor((canvas.width - camY) / CellSize);
    for (let y = startY; y <= endY; y++) {
        for (let x = startX; x <= endX; x++) {
            let color = map[`${x};${y}`];
            if (color !== undefined) {
                ctx.fillStyle = color;
                ctx.fillRect(x * CellSize + camX, y * CellSize + camY, CellSize, CellSize);
            }
        }
    }
    //endregion

    /*region GRILLE
    ctx.fillStyle = "black";
    // vertical
    for (let x = camX % CellSize; x < canvas.width; x += CellSize) {
        ctx.fillRect(x, 0, 1, canvas.height);
    }
    // horizontal
    for (let y = camY % CellSize; y < canvas.height; y += CellSize) {
        ctx.fillRect(0, y, canvas.width, 1);
    }
    //endregion*/

    //region MOUSE
    ctx.strokeStyle = "black";
    ctx.fillStyle = selectedColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(coordX * CellSize + camX, coordY * CellSize + camY, CellSize, CellSize);
    ctx.fillRect(coordX * CellSize + camX + CellSize / 3, coordY * CellSize + camY + CellSize / 3, CellSize / 3, CellSize / 3);
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
document.querySelector("#palette").addEventListener("mouseenter", (e) => {
    onPalette = true;
});
document.querySelector("#palette").addEventListener("mouseleave", (e) => {
    onPalette = false;
});