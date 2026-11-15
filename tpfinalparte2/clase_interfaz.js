class Interfaz {
  constructor() {
    this.posX = 10;
    this.posY = 10;
    this.ancho = 25;
    this.largo = 200;
    this.anchoBarra = 290;
    this.altoBarra = 80;
  }

  dibujar(energia) {

    //COLOR ENERGIA
    if (energia > 60) {
      fill(60, 160, 70);
    } else if (energia > 30) {
      fill(220, 170, 40);
    } else {
      fill(190, 45, 35);
    }

    // RELLENO QUE VA DISMINUYENDO
    noStroke();
    rect(this.posX + 65, this.posY + 25, this.largo * energia / 100, this.ancho );

    // MARCO DE MADERA
    image(barraEnergia, this.posX, this.posY, this.anchoBarra, this.altoBarra);

    // TEXTO ENERGIA
    fill(255);
    textSize(16);
    text("ENERGIA: " + energia + "%", this.posX + 95, this.posY + 95);
  }
}
