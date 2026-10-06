//tpfinal1 alejandro del nogal elias dana

//variables / textos

let pantalla=0;

let nombres=["inicio", "p1", "p2", "d1", "p3", "p4", "d2", "p5", "d3", "p6", "p7", "d4", "p8", "f1", "f2"];
let imagenes=[];


let titulos=[ //textos de cada pantalla por orden 
  "A LA DERIVA",
  "La mordedura",
  "La casa",
  "¿Qué hacer?",
  "El río",
  "El viaje",
  "¿Cómo continuar?",
  "El veneno",
  "¿Detenerse o continuar?",
  "La noche",
  "Tacurú-Pucú",
  "La última decisión",
  "Consecuencia final",
  "Final 1: Llega la ayuda",
  "Final 2: A la deriva"
  //FINAL 3 NO ESTA AUN
];

let textos=[
  "Una aventura interactiva basada en el cuento de Horacio Quiroga",
  "Paulino es mordido por una yarará en la selva. Mata a la serpiente con su machete y observa la herida.",
  "Llega a su vivienda. La pierna comienza a hincharse. Sabe que necesita ayuda, pero Tacurú-Pucú está lejos.",
  "",
  "Se dirige al río y encuentra su canoa. El paisaje es enorme y silencioso.",
  "El dolor aumenta. El paisaje cambia, la luz de la tarde empieza a desaparecer.",
  "",
  "El cuerpo de Paulino responde cada vez menos. La hinchazón avanza y le cuesta concentrarse.",
  "",
  "La luz prácticamente desapareció. El río está oscuro. Paulino continúa avanzando, pero cada vez tiene menos control sobre su cuerpo.",
  "Finalmente, Paulino comienza a distinguir señales de que se acerca a su destino. Tacurú-Pucú está cerca. Pero también está en su peor estado.",
  "",
  " AAAA //Dependiendo de las decisiones anteriores, la situación puede ser diferente. Paulino está al límite. El destino está cerca, pero su cuerpo casi no responde.",
  "Paulino finalmente consigue recibir asistencia. El veneno había avanzado demasiado, pero la ayuda llegó a tiempo. Paulino sobrevivió, pero la experiencia dejó una marca. La selva seguía allí, indiferente, como si nada hubiera ocurrido.",
  "El dolor parecía disminuir. Por un momento, Paulino creyó que estaba mejor. Pero esa sensación no significaba que se hubiera recuperado. La canoa continúa avanzando por el río mientras Paulino pierde el conocimiento. Queda a la deriva."
];

let opciones=[
  "Tratar la herida antes de partir",
  "Partir inmediatamente",
  "Continuar remando",
  "Buscar ayuda",
  "Descansar",
  "Seguir remando",
  "Pedir ayuda",
  "Continuar por sus propios medios"
];

let consecuencias=[
  "Pierde tiempo, pero intenta controlar el veneno.",
  "Gana tiempo, pero el veneno sigue avanzando.",
  "Avanza más rápido, pero se agota más.",
  "Puede encontrar ayuda, pero pierde tiempo.",
  "Recupera algo de fuerza, pero pierde tiempo.",
  "Mantiene el avance, pero su cuerpo se deteriora más rápidamente.",
  "Intenta llamar a alguien y hacer que lo encuentren.",
  "Decide que detenerse es demasiado peligroso y continúa intentando llegar por sí mismo."
];


let elecciones=["", "", "", ""]; //a o b para el final

function preload() {

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

  if (pantalla==0) {
    dibujarInicio();
  } else if (pantalla==3) {
    dibujarDecision(0); //d1
  } else if (pantalla==6) {
    dibujarDecision(1); //d2
  } else if (pantalla==8) {
    dibujarDecision(2); //d3
  } else if (pantalla==11) {
    dibujarDecision(3); //d4
  } else if (pantalla>=13) {
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

  textoCentrado(titulos[0], width/2, 140, 56, 255);
  textoCentrado(textos[0], width/2, 210, 18, 255);

  dibujarBoton(290, 320, 220, 50, "Presioná para comenzar");
}

function dibujarNarrativa(y) { //y: donde empieza la franja con el texto
  image(imagenes[pantalla], 0, 0, width, height);

  dibujarFranja(0, y, width, height-y);

  fill(255);
  textAlign(LEFT, TOP);
  textSize(24);
  text(titulos[pantalla], 30, y+15);
  textSize(16);
  text(textos[pantalla], 30, y+52, 580, height-y-57);

  if (pantalla>=13) { //en los finales el boton vuelve al inicio
    dibujarBoton(620, 385, 150, 40, "volver al inicio");
  } else {
    dibujarBoton(650, 385, 120, 40, "siguiente");
  }
}

function dibujarDecision(k) { //k:numero de decision
  image(imagenes[pantalla], 0, 0, width, height);

  dibujarFranja(0, 0, width, 55);
  textoCentrado(titulos[pantalla], width/2, 28, 28, 255);

  dibujarFranja(0, 270, width, 180);

  dibujarBoton(40, 290, 340, 50, opciones[k*2]); //boton a
  dibujarBoton(420, 290, 340, 50, opciones[k*2+1]); //boton b

  fill(255);
  textAlign(CENTER, TOP);
  textSize(15);
  text(consecuencias[k*2], 40, 355, 340, 60);
  text(consecuencias[k*2+1], 420, 355, 340, 60);
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
  textoCentrado(etiqueta, x+w/2, y+h/2, 16, 0);
}

//correcion del profe funcion para no repetir fill y textAlign y textSize
function textoCentrado(texto, x, y, tamanio, gris) {
  fill(gris);
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

function mousePressed() { //interacciones 
  if (pantalla==0) {
    if (detectar(290, 320, 220, 50)) {
      pantalla=1;
    }
  } else if (pantalla==3) {
    elegirOpcion(0);
  } else if (pantalla==6) {
    elegirOpcion(1);
  } else if (pantalla==8) {
    elegirOpcion(2);
  } else if (pantalla==11) {
    elegirOpcion(3);
  } else if (pantalla==12) { //
    if (detectar(650, 385, 120, 40)) {
      if (elecciones[3]=="A") {
        pantalla=13; //final 1
      } else {
        pantalla=14; //final 2
      }
    }
  } else if (pantalla>=13) { //volver al inicio
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
