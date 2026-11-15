class Juego {
  constructor() {
    this.escenario = new Escenario();
    this.paulino = new Paulino(framesPaulino);

    this.interfaz = new Interfaz();

    this.cantTroncos = 5;
    this.troncos = [];

    this.tiempoChoque = 0;
    this.perdio = false; 
    this.gano = false; 
    
    this.tiempoInicio = millis();
    
    for (let i = 0; i < this.cantTroncos; i++) {
      this.troncos[i] = new Tronco();
    }
  }

  dibujar() {
  this.escenario.dibujar();
  this.paulino.dibujar();

  for (let i = 0; i < this.cantTroncos; i++) {
    this.troncos[i].dibujar();
  }

  this.interfaz.dibujar(this.paulino.energia);

  if (this.perdio) {
  }
  if (this.gano) {
  }
}

  mover() {
  if (!this.perdio && !this.gano) {
    this.escenario.mover();
    this.paulino.mover();
    this.paulino.animar();
    for (let i = 0; i < this.cantTroncos; i++) {
      this.troncos[i].mover();
    }

    this.detectarColisiones();

    if (this.paulino.energia <= 0) {
      this.paulino.energia = 0;
      this.perdio = true;
    }
    if (millis() - this.tiempoInicio >= 60000) {
      this.gano = true;
    }
  }
}

  detectarColisiones() {
    for (let i = 0; i < this.cantTroncos; i++) {
      if (this.troncos[i].colision(this.paulino)) {
      if (this.tiempoChoque <= 0) {
        this.paulino.energia -= 10;
      if (this.paulino.energia < 0) {
        this.paulino.energia = 0;
      }
        this.tiempoChoque = 40;
        this.troncos[i].reiniciar();
        }
      }
    }

      if (this.tiempoChoque > 0) {
        this.tiempoChoque--;
      }
   }
}
