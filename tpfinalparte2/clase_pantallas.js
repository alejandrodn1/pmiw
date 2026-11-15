class Pantallas {

  constructor() {
    this.estado = 0;

    this.inicio = pantallaInicio;
    this.instrucciones = pantallaInstrucciones;
    this.creditos = pantallaCreditos;
    this.derrota = pantallaDerrota;
    this.victoria = pantallaVictoria;
  }
  
  // BOTON
  dibujarBoton(x, y, ancho, alto, textoBoton) {
    rectMode(CENTER);

    fill(45, 65, 45, 230);
    stroke(220, 190, 130);
    strokeWeight(3);
    rect(x, y, ancho, alto, 12);

    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text(textoBoton, x, y);

    rectMode(CORNER);
  }
  // BOTONES EN PANTALLA 
  dibujar() {

    if (this.estado == 0) {
      image(this.inicio, 0, 0, width, height);
      textFont(miTipografia);
      this.dibujarBoton(400, 390, 220, 45, "JUGAR");
      this.dibujarBoton(400, 455, 220, 45, "INSTRUCCIONES");
      this.dibujarBoton(400, 520, 220, 45, "CRÉDITOS");
    }
    if (this.estado == 1) {
      image(this.instrucciones, 0, 0, width, height);
      this.dibujarBoton(400, 540, 220, 45, "VOLVER");
    }
    if (this.estado == 2) {
      image(this.creditos, 0, 0, width, height);
      this.dibujarBoton(400, 540, 220, 45, "VOLVER");
    }
    if (this.estado == 4) {
      image(this.derrota, 0, 0, width, height);
      this.dibujarBoton(400, 490, 240, 45, "VOLVER A JUGAR");
      this.dibujarBoton(400, 550, 220, 45, "INICIO");
    }
    if (this.estado == 5) {
      image(this.victoria, 0, 0, width, height);
      this.dibujarBoton(400, 490, 240, 45, "VOLVER A JUGAR");
      this.dibujarBoton(400, 550, 220, 45, "INICIO");
    }
  }

  click(x, y) {
    
    if (this.estado == 0) {
      if (x > 290 && x < 510 && y > 367 && y < 413) {
        juego = new Juego();
        this.estado = 3;
        sonidoRio.loop();
      }
      if (x > 290 && x < 510 && y > 432 && y < 478) {
        this.estado = 1;
      }
      if (x > 290 && x < 510 && y > 497 && y < 543) {
        this.estado = 2;
      }
    }
    else if (this.estado == 1 || this.estado == 2) {
      if (x > 290 && x < 510 && y > 517 && y < 563) {
        this.estado = 0;
      }
    }
    else if (this.estado == 4 || this.estado == 5) {
      if (x > 280 && x < 520 && y > 467 && y < 513) {
        juego = new Juego();
        this.estado = 3;
      }
      if (x > 290 && x < 510 && y > 527 && y < 573) {
        this.estado = 0;
      }
    }
  }
}
