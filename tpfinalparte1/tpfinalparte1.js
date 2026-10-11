//tpfinal1 alejandro del nogal elias dana
//url del video:

//variables/textos
let pantalla=0;
let nombres=["inicio", "p1", "p2", "d1", "p3", "p4", "p5", "p6", "d2", "p7", "p8", "d3", "p9", "d4", "f1", "f2", "f3"];
let imagenes=[];
let textos; 
let audioFondo;
let titulos; 
let opciones; 
let consecuencias; 
let elecciones=["", "", "", ""]; //a o b para el final
let opacidad=0; 
let pantallaAnterior=-1; //reinicio animacion cuando cambia la pantalla

function preload() {
  textos=loadStrings("data/textos.txt");
  titulos=loadStrings("data/titulos.txt");
  opciones=loadStrings("data/opciones.txt");
  consecuencias=loadStrings("data/consecuencias.txt");
  audioFondo=loadSound("data/audiofondo.mp3"); 

  for (let i=0; i<nombres.length; i++) {
    imagenes[i]=loadImage("data/"+nombres[i]+".jpg");
  }
}

function setup() {
  createCanvas(800, 450);
  textFont("Georgia");
}

function draw() {
  background(0);

  if (pantalla!=pantallaAnterior) { 
    opacidad=0;
    pantallaAnterior=pantalla;
  }
  if (opacidad<255) {
    opacidad=opacidad+8;
  }

  if (pantalla===0) {
    dibujarInicio();
  } else if (pantalla===3) {
    dibujarDecision(0); //d1
  } else if (pantalla===8) {
    dibujarDecision(1); //d2
  } else if (pantalla===11) {
    dibujarDecision(2); //d3
  } else if (pantalla===13) {
    dibujarDecision(3); //d4
  } else if (pantalla>=14) {
    dibujarNarrativa(290); //finales
  } else {
    dibujarNarrativa(320);
  }
}
function dibujarInicio() {
  image(imagenes[0], 0, 0, width, height);

  noStroke();
  fill(0, 120);
  rect(0, 0, width, height);

  textoCentrado(titulos[0], width/2, 140, 56, 255, 255);
  textoCentrado(textos[0], width/2, 210, 18, 255, 255);
  dibujarBoton(290, 320, 220, 50, "Presioná para comenzar", 255);
}

function dibujarNarrativa(y) { //y: comienza la franja y el textto
  image(imagenes[pantalla], 0, 0, width, height);

  dibujarFranja(0, y, width, height-y);
  fill(255);
  textAlign(LEFT, TOP);
  textSize(24);
  text(titulos[pantalla], 30, y+15);
  textSize(16);
  text(textos[pantalla], 30, y+52, 580, height-y-57);

  if (pantalla>=14) { //pantalla final 
    dibujarBoton(620, 385, 150, 40, "volver al inicio", 255);
  } else {
    dibujarBoton(650, 385, 120, 40, "siguiente", 255);
  }
}

function dibujarDecision(k) {
  image(imagenes[pantalla], 0, 0, width, height);

  dibujarFranja(0, 0, width, 55);
  textoCentrado(titulos[pantalla], width/2, 28, 28, 255, 255);
  dibujarFranja(0, 270, width, 180);

  dibujarBoton(40, 290, 340, 50, opciones[k*2], opacidad); //boton a
  dibujarBoton(420, 290, 340, 50, opciones[k*2+1], opacidad); //boton b
  fill(255, opacidad);
  textAlign(CENTER, TOP);
  textSize(15);
  text(consecuencias[k*2], 40, 355, 340, 60);
  text(consecuencias[k*2+1], 420, 355, 340, 60);
}

function dibujarBoton(x, y, w, h, etiqueta, alfa) { //dejo la transparencia como alfa
  if (detectar(x, y, w, h)) {
    fill(230, 190, 70, alfa); 
  } else {
    fill(255, alfa);
  }
  stroke(0, alfa);
  strokeWeight(2);
  rect(x, y, w, h);
  noStroke();
  textoCentrado(etiqueta, x+w/2, y+h/2, 16, 0, alfa);
}

//correcion del profe funcion para no repetir fill y textAlign y textSize
function textoCentrado(texto, x, y, tamanio, gris, alfa) {
  fill(gris, alfa);
  textAlign(CENTER, CENTER);
  textSize(tamanio);
  text(texto, x, y);
}

//franjita oscura detras de los textos
function dibujarFranja(x, y, w, h) {
  noStroke();
  fill(0, 180);
  rect(x, y, w, h);
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
function elegirFinal() { //pantalla que nos dirijimos segun las elecciones en las decisiones
  if (elecciones[3]=="A") {
    return 14; //final 1: seguir hacia tacuru-pucu
  } else if (elecciones[2]=="A") {
    return 16; //final 3
  } else {
    return 15; //final 2
  }
}

function mousePressed() { //interacciones 
  if (pantalla==0) {
    if (detectar(290, 320, 220, 50)) {
      pantalla=1;
      if (audioFondo.isPlaying()==false) { //audio
        audioFondo.loop();
      }
    }
  } else if (pantalla===3) {
    elegirOpcion(0);
  } else if (pantalla===8) {
    elegirOpcion(1);
  } else if (pantalla==11) {
    elegirOpcion(2);
  } else if (pantalla===13) { //ultima decision que te lleva a un final
    elegirOpcion(3);
    if (elecciones[3]!="") {
      pantalla=elegirFinal();
    }
  } else if (pantalla>=14) { //volver al inicio
    if (detectar(620, 385, 150, 40)) {
      pantalla=0;
      for (let i=0; i<elecciones.length; i++) {
        elecciones[i]="";
      }
    }
  } else {
    if (detectar(650, 385, 120, 40)) {
      pantalla++;
    }
  }
}
