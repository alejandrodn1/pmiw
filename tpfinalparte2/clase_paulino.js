class Paulino {
  constructor(frames) {
    this.frames = frames;

    this.posX = width / 2;
    this.posY = height - 150;
    this.velocidad = 4;
    this.energia = 100;

    this.frameActual = 0;
    this.contador = 0;
    }

    dibujar() {
     imageMode(CENTER);

     image(this.frames[this.frameActual], this.posX, this.posY, 90, 210);

     imageMode(CORNER);
    }
    
    animar() {
      this.contador++;

       if (this.contador > 8) {
         this.frameActual++;

       if (this.frameActual >= this.frames.length) {
         this.frameActual = 0;
      }
      this.contador = 0;
    }
  }
  
    // MOVIMIENTO DE PERSONAJE
    mover() {
      if (keyIsDown(LEFT_ARROW)) {
        this.posX -= this.velocidad;
      }
      if (keyIsDown(RIGHT_ARROW)) {
        this.posX += this.velocidad;
      }
      if (keyIsDown(UP_ARROW)) {
        this.posY -= this.velocidad;
      }
      if (keyIsDown(DOWN_ARROW)) {
        this.posY += this.velocidad;
      }
      
    // LIMITES RIO
      if (this.posX < 150) {
        this.posX = 150;
      }
      if (this.posX > width - 150) {
        this.posX = width - 150;
      }
      if (this.posY < 80) {
        this.posY = 80;
      }
      if (this.posY > height - 80) {
        this.posY = height - 80;
      }
   }
}
