//TPFINALPARTE2
// Alejandro del Nogal 125564/4
// Elias Dana 125563/3
// comision 1
// url: https://youtu.be/oajtZ9TFyls

let juego;
let framesPaulino = [];
let imagenesTroncos = [];
let barraEnergia;
let pantallaInicio;
let pantallaInstrucciones;
let pantallaCreditos;
let pantallaDerrota;
let pantallaVictoria;
let pantallas;
let miTipografia;
let sonidoRio;

function preload() {
  fondoRio = loadImage("data/fondoRio.png");
  barraEnergia = loadImage("data/barraEnergia.png");
  pantallaInicio = loadImage("data/inicio.png");
  pantallaInstrucciones = loadImage("data/instrucciones.png");
  pantallaCreditos = loadImage("data/creditos.png");
  pantallaDerrota = loadImage("data/derrota.png");
  pantallaVictoria = loadImage("data/victoria.png");
  miTipografia = loadFont("data/Redaction10-Regular.ttf");
  sonidoRio = loadSound("data/sonidoRio.mp3");
  
  for (let i = 0; i < 8; i++) {
    framesPaulino[i] = loadImage("data/paulino" + (i + 1) + ".png");
  }
  
  for (let i = 0; i < 5; i++) {
    imagenesTroncos[i] = loadImage("data/tronco" + (i + 1) + ".png");
  }
}

function setup() {
  createCanvas(800, 600);
  juego = new Juego();
  pantallas = new Pantallas();
}

function draw() {

  background(40);

  if (pantallas.estado == 3) {

    juego.dibujar();
    juego.mover();

    if (juego.perdio) {
      pantallas.estado = 4;
      sonidoRio.stop();
    }

    if (juego.gano) {
      pantallas.estado = 5;
      sonidoRio.stop();
    }

  } else {

    pantallas.dibujar();

  }
}

function mousePressed() {
  pantallas.click(mouseX, mouseY);
}
