class Tronco {
  constructor() {
    this.imagen = random(imagenesTroncos);

    this.posX = random(160, width - 160);
    this.posY = random(-600, -50);

    this.ancho = random(90, 140);
    this.alto = random(35, 60);

    this.velocidad = random(3, 7);
  }

  dibujar() {
    imageMode(CENTER);
    image(this.imagen, this.posX, this.posY, this.ancho, this.alto);
    imageMode(CORNER);
  }

  mover() {
    this.posY += this.velocidad;

    if (this.posY > height + this.alto) {
      this.reiniciar();
    }
  }

  reiniciar() {
    this.posX = random(160, width - 160);
    this.posY = random(-300, -50);
    this.imagen = random(imagenesTroncos);
  }

  colision(paulino) {
    let distancia = dist(this.posX, this.posY, paulino.posX, paulino.posY);

    return distancia < 85;
  }
}
