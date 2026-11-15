class Escenario {
  constructor() {
    this.fondo = fondoRio;
    this.posY = 0;
    this.velocidad = 2;
  }

 dibujar() {
  image(this.fondo, 0, this.posY, width, height + height/2);
  image(this.fondo, 0, this.posY - (height + height/2), width, height + height/2);
}

 mover() {
  this.posY += this.velocidad;

  if (this.posY >= height + height/2) {
    this.posY = 0;
  }
 }
}
