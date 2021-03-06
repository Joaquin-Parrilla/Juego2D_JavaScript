
// referencia a nuestro objeto canvas de html:
const canvas = document.getElementById('game');
const ctx = canvas.getContext("2d");       // contexto de graficos 2d

/* dibujar un cuadrado rojo: 
ctx.beginPath();    // inicio declaraciones de objeto
ctx.rect(20, 40, 50, 50);       // defino un rectnagulo ("rect")
ctx.fillStyle = "#0B2870";  // propiedad que guarda color que utilizará fill()
ctx.fill();     // pintar cuadrado
ctx.closePath();    // fin declaraciones de objeto
*/

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let radioCirculo = 10;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth)/2;
let teclaDerechaPulsada = false;
let teclaIzquierdaPulsada = false;

/* escucha de eventos para capturar tecla pulsada */
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) 
        teclaDerechaPulsada = true;
    else if (e.keyCode == 37) 
        teclaIzquierdaPulsada = true;
}

function keyUpHandler(e) {
    if (e.keyCode == 39) 
        teclaDerechaPulsada = false;
    else if (e.keyCode == 37) 
        teclaIzquierdaPulsada = false;
}

function drawBola() {
    ctx.beginPath();
    ctx.arc(x, y, radioCirculo, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    // borro contenido de lienzo antes de dijubar denuevo:
    ctx.clearRect(0, 0, canvas.width, canvas.height);   
    drawBola();
    drawPaddle();

    if (x + dx > (canvas.width - radioCirculo) || x + dx < radioCirculo) 
        dx = -dx;

    if ((y + dy) < radioCirculo) {
        dy = -dy;
    } else if (y + dy > (canvas.height - radioCirculo)) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            alert("¡Fin del Juego!");
            reiniciar();
            document.location.reload();
        }
    }

    if ((teclaDerechaPulsada && paddleX) < (canvas.width - paddleWidth)) 
        paddleX += 7;
    else if ((teclaIzquierdaPulsada && paddleX) > 0) 
        paddleX -= 7;
    
        // invremento posiciones x,y en 2, -2 :
    x += dx;
    y += dy;
}
setInterval(draw, 10);  // cada 10ms

function reiniciar() {
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 2;
    dy = -2;
    radioCirculo = 10;
    paddleHeight = 10;
    paddleWidth = 75;
    paddleX = (canvas.width-paddleWidth)/2;
    teclaDerechaPulsada = false;
    teclaIzquierdaPulsada = false;
    alert("El juego comenzará de nuevo.");
}


