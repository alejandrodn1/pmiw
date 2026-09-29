//tpfinal1 alejandro del nogal elias dana

//variables / textos

let pantalla=0;

let nombres=["inicio", "p1", "p2", "d1", "p3", "p4", "d2", "p5"];
let imagenes=[];


let titulos=[ //textos de cada pantalla por orden 
  "A LA DERIVA",
  "La mordedura",
  "La casa",
  "¿Qué hacer?",
  "El río",
  "El viaje",
  "¿Cómo continuar?",
  "El veneno"
];

let textos=[
  "Una aventura interactiva basada en el cuento de Horacio Quiroga",
  "Paulino es mordido por una yarará en la selva. Mata a la serpiente con su machete y observa la herida.",
  "Llega a su vivienda. La pierna comienza a hincharse. Sabe que necesita ayuda, pero Tacurú-Pucú está lejos.",
  "",
  "Se dirige al río y encuentra su canoa. El paisaje es enorme y silencioso.",
  "El dolor aumenta. El paisaje cambia, la luz de la tarde empieza a desaparecer.",
  "",
  "El cuerpo de Paulino responde cada vez menos. La hinchazón avanza y le cuesta concentrarse."
];

let opciones=[
  "Tratar la herida antes de partir",
  "Partir inmediatamente",
  "Continuar remando",
  "Buscar ayuda"
];

let consecuencias=[
  "Pierde tiempo, pero intenta controlar el veneno.",
  "Gana tiempo, pero el veneno sigue avanzando.",
  "Avanza más rápido, pero se agota más.",
  "Puede encontrar ayuda, pero pierde tiempo."
];


let elecciones=["", ""]; //guardado de eleccion a o b para el final

function preload() {

  for (let i=0; i<nombres.length; i++) {
    imagenes[i]=loadImage(nombres[i]+".jpg");
  }
}

function setup() {
  createCanvas(800, 450);
  textFont("Georgia");
}

function draw() {
  background(0);

  if (pantalla==0) {
    dibujarInicio();
  } else if (pantalla==3) {
    dibujarDecision(0);
  } else if (pantalla==6) {
    dibujarDecision(1);
  } else if (pantalla<=7) {
    dibujarNarrativa();
  } else {
    dibujarProvisoria();
  }
}
function dibujarInicio() {
  image(imagenes[0], 0, 0, width, height);

  noStroke();
  fill(0, 120);
  rect(0, 0, width, height);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(56);
  text(titulos[0], width/2, 140);
  textSize(18);
  text(textos[0], width/2, 210);

  dibujarBoton(290, 320, 220, 50, "Presioná para comenzar");
}

function dibujarNarrativa() {
  image(imagenes[pantalla], 0, 0, width, height);

  noStroke();
  fill(0, 180);
  rect(0, 320, width, 130);

  fill(255);
  textAlign(LEFT, TOP);
  textSize(24);
  text(titulos[pantalla], 30, 335);
  textSize(16);
  text(textos[pantalla], 30, 372, 580, 70);

  dibujarBoton(650, 385, 120, 40, "siguiente");
}

function dibujarDecision(k) { //k:numero de decision
  image(imagenes[pantalla], 0, 0, width, height);

  noStroke();
  fill(0, 180);
  rect(0, 0, width, 55);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(28);
  text(titulos[pantalla], width/2, 28);

  noStroke();
  fill(0, 180);
  rect(0, 270, width, 180);

  dibujarBoton(40, 290, 340, 50, opciones[k*2]); //boton a
  dibujarBoton(420, 290, 340, 50, opciones[k*2+1]); //boton b

  fill(255);
  textAlign(CENTER, TOP);
  textSize(15);
  text(consecuencias[k*2], 40, 355, 340, 60);
  text(consecuencias[k*2+1], 420, 355, 340, 60);
}

function dibujarProvisoria() {
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(28);
  text("aaaaaaaaaaaaaaaaa", width/2, 160);
  textSize(16);
  text("(aaaaaaaaa)", width / 2, 210);

  dibujarBoton(300, 280, 200, 50, "volver al inicio");
}

function dibujarBoton(x, y, w, h, etiqueta) {
  if (detectar(x, y, w, h)) {
    fill(230, 190, 70);
  } else {
    fill(255);
  }
  stroke(0);
  strokeWeight(2);
  rect(x, y, w, h);

  noStroke();
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(16);
  text(etiqueta, x+w/2, y+h/2);
}

function detectar(x, y, w, h) {
  if (mouseX>x&&mouseX<x+w&&mouseY>y&&mouseY<y+h) {
    return true;
  } else {
    return false;
  }
}

function elegirOpcion(k) {
  if (detectar(40, 290, 340, 50)) {
    elecciones[k]="A";
    pantalla++;
  } else if (detectar(420, 290, 340, 50)) {
    elecciones[k]="B";
    pantalla++;
  }
}

function mousePressed() { //interacciones 
  if (pantalla==0) {
    if (detectar(290, 320, 220, 50)) {
      pantalla=1;
    }
  } else if (pantalla==3) {
    elegirOpcion(0);
  } else if (pantalla==6) {
    elegirOpcion(1);
  } else if (pantalla<=7) {
    if (detectar(650, 385, 120, 40)) {
      pantalla++;
    }
  } else {
    if (detectar(300, 280, 200, 50)) {
      pantalla=0;
      elecciones[0]="";
      elecciones[1]="";
    }
  }
}
