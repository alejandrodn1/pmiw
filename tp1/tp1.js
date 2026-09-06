//tp1 Animacion de sprites
//Alejandro Del Nogal 125564/4 Comision 1


//variables
let pantalla="principal";
let quieto=[];
let caminarDer=[];
let caminarIzq=[];
let correrDer=[];
let correrIzq=[];
let cantQuieto=1;
let cantCaminar=2;
let cantCorrer=3;
let estado="quieto";
let estadoAnterior="quieto";
let direccion="izq";
let posX, posY;
let velCaminar=1.5;
let velCorrer=3;
let frameActual=0;
let contadorTiempo=0;
let tiempoPersonaje=0;
let duracionQuieto=90;
let faseSecuencia="acercando";
let Acercamiento;
let Vuelta;
let secuenciaTerminada=false;
//entrada del botón start y fadeout de pantalla
let alphaBotonStart=0;
let transicionActiva=false;
let alphaFadeOut=0;
//imagenes
let imgFondo;
let imgLatios, imgFlygon, imgLatias;
let posXLatios, posYLatios;
let posXFlygon, posYFlygon;
let posXLatias, posYLatias;
let latiasActivo=false;
let anchoLatios=140, altoLatios=100;
let anchoFlygon=230, altoFlygon=160;
let imgLogo;
let posXLogo;
let posYLogo;
let posYLogoFinal=30;
let anchoLogo=280;
let altoLogo=120;
let posXPokemon=[];
let imgPokemon=[];
let posYBase=[];
let desfaso=[];
let cantPokemon=3;
let framesCaminantes=[]; //array de arrays
let posXCaminantes=[];
let posYCaminantes=[];
let frameActualCaminantes=[];
let contadorCaminantes=[];
let velCaminantes=[];
let framesPikachuDex=[];
let cantFramesPikachuDex =7;
let posXPikaDex=300;
let posYPikaDex=200;
let anchoPikaDex=150;
let altoPikaDex=150;
let imgBotonStart; //boton start de reinicio
let botonReiniciarX;
let botonReiniciarY;
let botonReiniciarAncho=160;
let botonReiniciarAlto=70;

function preload() {
  //pikachu 7frames
    for (let i=1;i<=cantFramesPikachuDex;i++) {
    framesPikachuDex[i-1] =loadImage("data/pika"+i+".png");
  }
  //leon (personaje)
  for (let i=1;i<=cantQuieto;i++) {
    quieto[i-1] =loadImage("data/quieto"+i+".png");
  }
  for (let i=1;i<=cantCaminar;i++){
    caminarDer[i-1]=loadImage("data/walk"+i+"dere.png");
    caminarIzq[i-1] =loadImage("data/walk"+i+"izq.png");
  }
  for (let i=1;i<=cantCorrer;i++) {
    correrDer[i-1] =loadImage("data/run"+i+"dere.png");
    correrIzq[i-1] =loadImage("data/run"+i+"izq.png");
  }
  
  
  imgFondo=loadImage("data/fondo.jpg");
  imgLatios=loadImage("data/latios.png");
  imgFlygon=loadImage("data/flygon.png");
  imgLatias=loadImage("data/latias2.png");
  imgLogo=loadImage("data/logo.png");
  imgBotonStart=loadImage("data/start.png");
  imgPokemon[1]=loadImage("data/mesprit.png");
  imgPokemon[2]=loadImage("data/azelf.png");

  let nombresCaminantes=["mega", "typlo", "fera"];
  for (let i=0;i<nombresCaminantes.length;i++) {
    framesCaminantes[i]=[];
    for (let j=1;j<=2;j++) {
      framesCaminantes[i][j-1] = loadImage("data/"+nombresCaminantes[i]+j+".png");
}
}
}

function setup() {
  createCanvas(800, 600);
//leon
posX=width/2;
posY=height-100;
//latios y flygon desde los lados
posXLatios=-100;
posYLatios=80;
posXFlygon=width + 100;
posYFlygon=150;
//latias: un poco por debajo de flygon, arranca fuera de pantalla
posXLatias=width + 100;
posYLatias=posYFlygon + 40;
//logo
posXLogo=width/2-anchoLogo/2;
posYLogo=-150;
//pokemon del pasto
posXPokemon[0]=width-60;
posYBase[0]=height-80;
desfaso[0]=0;
posXPokemon[1]=60;
posYBase[1]=height -80;
desfaso[1]=100;

Acercamiento=posXPokemon[1]+80;
Vuelta=Acercamiento+60;
posXCaminantes=[157, 712, 607];
posYCaminantes=[458, 458, 530];
frameActualCaminantes=[0, 0, 0];
contadorCaminantes=[0, 0, 0];
velCaminantes=[15, 15, 15];


posXPokemon[2]=posXCaminantes[0]-70;
posYBase[2]=posYCaminantes[0]-26;
desfaso[2]=60;
//boton de start y reinicio
botonReiniciarX=width/2-botonReiniciarAncho/2;
botonReiniciarY=height/2-botonReiniciarAlto/2;
}

function draw() {
  if (pantalla==="principal"){
    dibujarEscenaPrincipal();
  } 
}
function dibujarEscenaPrincipal() {
  image(imgFondo, 0, 0,width,height);

  moverLatiosFlygon();
  moverLogo();
  image(imgLatios, posXLatios, posYLatios, anchoLatios, altoLatios);
  image(imgLogo, posXLogo, posYLogo, anchoLogo, altoLogo);
  image(imgFlygon, posXFlygon, posYFlygon, anchoFlygon, altoFlygon);
  if (latiasActivo) {
    image(imgLatias, posXLatias, posYLatias, anchoFlygon, altoFlygon);
  }

  dibujarPokemones();
  dibujarCaminantes();
  actualizarEstado();
  moverPersonaje();
  dibujarPersonaje();
  dibujarPikachuAnimado();

  if (secuenciaTerminada) {
    dibujarBotonReiniciar();
  }
  if (transicionActiva) {
    dibujarFadeOut();
  }
}

function dibujarBotonReiniciar() {
  if (alphaBotonStart<255) {
    alphaBotonStart+=5;
    if (alphaBotonStart>255) alphaBotonStart=255;
  }
  tint(255, alphaBotonStart);
  image(imgBotonStart, botonReiniciarX, botonReiniciarY, botonReiniciarAncho, botonReiniciarAlto);
  noTint();
}

function dibujarFadeOut() {
  fill(0, alphaFadeOut);
  noStroke();
  rect(0, 0, width, height);
  alphaFadeOut+=8; 

  if (alphaFadeOut>=255) {
    reiniciarTodo();
    transicionActiva=false;
    alphaFadeOut=0;
  }
}

function reiniciarTodo() {
//leon 
posX=width/2;
estado="quieto";
estadoAnterior="quieto";
direccion="izq";
faseSecuencia="acercando";
tiempoPersonaje=0;
frameActual=0;
contadorTiempo=0;
secuenciaTerminada=false;
alphaBotonStart= 0;
posXLatios=-100;
posXFlygon=width+100;
posXLatias=width+100;
latiasActivo=false;
posYLogo=-150;
}

function moverLatiosFlygon() {
  posXLatios+=2;
  if (posXLatios>width+100) posXLatios=-100;
  posXFlygon-=1.5;
  if (posXFlygon<-100) posXFlygon=width+100;
  
  if (!latiasActivo && posXFlygon<=width/2) {
    latiasActivo=true;
  }
  if (latiasActivo) {
    posXLatias-=1.5;
    if (posXLatias<-100) posXLatias=width+100;
  }
}

function moverLogo() {
  if (posYLogo<posYLogoFinal) {
    posYLogo+=1;
  }
}

let frameActualPikachu = 0;
let contadorPikachu = 0;
function dibujarPokemones() {
  for (let i=1;i<cantPokemon;i++) {
    let salto=abs(sin((frameCount+desfaso[i])*0.05))*20;
    image(imgPokemon[i], posXPokemon[i], posYBase[i]-salto, imgPokemon[i].width*2, imgPokemon[i].height*2);
  }
}

function dibujarPikachuAnimado() {
  let indice=actualizarFramePikachu();
  image(framesPikachuDex[indice], posXPokemon[0], posYBase[0], framesPikachuDex[indice].width*2, framesPikachuDex[indice].height*2);
}

function actualizarFramePikachu() {
  contadorPikachu++;
  if (contadorPikachu>=8) {
    contadorPikachu=0;
    frameActualPikachu++;
    if (frameActualPikachu>=cantFramesPikachuDex) {
      frameActualPikachu=0;
    }
  }
  
  
  return frameActualPikachu; ////////
}

function dibujarCaminantes() {
  for (let i=0;i<framesCaminantes.length; i++) {
    contadorCaminantes[i]++;
    if (contadorCaminantes[i]>=velCaminantes[i]) {
      contadorCaminantes[i]=0;
      frameActualCaminantes[i]++;
      if (frameActualCaminantes[i]>=framesCaminantes[i].length) {
        frameActualCaminantes[i]=0;
      }
    }
    let img=framesCaminantes[i][frameActualCaminantes[i]];
    image(img, posXCaminantes[i], posYCaminantes[i], img.width*2, img.height*2);
  }
}


function actualizarEstado(){
  estadoAnterior=estado;
  tiempoPersonaje++;
  if (tiempoPersonaje<duracionQuieto){
    estado="quieto";
  } else if (faseSecuencia==="acercando"){
    estado="caminar";
    direccion="izq";
    if (posX<=Acercamiento) {
      faseSecuencia="volviendo";
    }
    0
  } else if (faseSecuencia==="volviendo") {
    estado="caminar";
    direccion="der";
    if (posX>=Vuelta) {
      faseSecuencia="corriendo";
    }
  } 
  else {
    estado="correr";
    direccion="der";
  }
  if (estado!==estadoAnterior) {
    reiniciarAnimacion();
  }
  if (faseSecuencia==="corriendo" && posX > width && !secuenciaTerminada) { //terminar al salir
    secuenciaTerminada = true;
  }
}

function reiniciarAnimacion() {
  frameActual=0;
  contadorTiempo=0;
}

function moverPersonaje() {
  if (secuenciaTerminada) return;

  if (estado==="caminar") {
    posX+=(direccion==="der")?velCaminar:-velCaminar;
  } else if (estado==="correr") {
    posX+=velCorrer;
  }
}

function actualizarFrame(cantFrames, velocidadFrame) { 
  contadorTiempo++;
  if (contadorTiempo>=velocidadFrame) {
    contadorTiempo=0;
    frameActual++;
    
    if (frameActual>=cantFrames) {
      frameActual=0;
    }
  }
  return frameActual;
}

function dibujarPersonaje() {
  let frames, cant, indice;

  if (estado==="quieto") {
    frames=quieto;
    cant=cantQuieto;
    indice=0;
  } else if(estado==="caminar") {
    frames=(direccion==="der")?caminarDer:caminarIzq;
    cant=cantCaminar;
    indice=actualizarFrame(cant,12);
  } else {
    frames=(direccion==="der")? correrDer:correrIzq;
    cant=cantCorrer;
    indice=actualizarFrame (cant, 6);
  }

  image(frames[indice], posX, posY, frames[indice].width*2, frames[indice].height*2);
}

function dibujarBotonVolver() {
  fill(255,0,0, 180);
  noStroke();
  rect(botonVolverX, botonVolverY, botonVolverAncho, botonVolverAlto, 8);
  fill(255);
  textAlign(CENTER,CENTER);
  textSize(14);
  text("Volver", botonVolverX+botonVolverAncho/2, botonVolverY+botonVolverAlto/2);
}

function mousePressed() {
  if (pantalla==="principal") {
 
    
if (secuenciaTerminada && !transicionActiva && detectar(botonReiniciarX, botonReiniciarY, botonReiniciarAncho, botonReiniciarAlto)) {
 transicionActiva=true;
}
  } else {
    if (detectar(botonVolverX, botonVolverY, botonVolverAncho, botonVolverAlto)) {
      pantalla="principal";
    }
  }
}





function detectar(x, y, tamX, tamY) {
  if (mouseX> x&& mouseX< x+tamX&&mouseY> y&& mouseY< y+tamY) {
    return true;
  } else {
    return false;
  }
}
