//----FIGURAS -----
let x = -10; //posx de las figuras
let xvel = -10;


let A = 0; //valor inicial del array
var peq = [];
var med = [];

class Figuras {

  constructor() {
    let voz = 100; //valor inicial
    capa1 = createGraphics(windowWidth - 290, windowHeight - 150);

    //cargar imagenes (estan en el preload y el constructor pra q carguen en la capa)
    for (var i = 1; i < 17; i++) {
      var imagen = loadImage("assets/figu/fig" + i + ".png");
      peq.push(imagen);
    }
    for (var i = 1; i < 19; i++) {
      var imagen = loadImage("assets/figu/figura" + i + ".png");
      med.push(imagen);
    }
    A = (A + 1) % 17; //para el estado de las imagenes Incrementar A en 1 y asegurarse de que esté en el rango de 0 a 16

  }


  dibujarcapa1() {
    push();
    imageMode(CENTER);
    image(capa1, windowWidth / 2, windowHeight / 2);
    capa1.background(papel);
    pop();
  }

  moverx() {
    if (x <= 1500) {
      x += 3;
    } else if (x >= windowWidth - 290) {
      x = -10;
    }
    if (xvel <= 1500) {
      xvel += 5;
    } else if (x >= 1500) {
      xvel = -10;
    }
  }

  dibfig() {
    // angleMode(DEGREES); //cambia a angulo
    let mivoz = map(amp, nohaySonido, AMP_MIN, haySonido, AMP_MAX);
    let mifrec = map(frecuencia, FREC_MIN, FREC_MAX, 0, 255, true);
    // let a =( 20/-mouseY );
    //let mivoz =mic;
    let tam = 50;
    let a = mivoz / 20;
    let b = mivoz;
    let c = mivoz; // paa el otro grupo de fig
    //let a=mifrec/6;
    //let b=mifrec;

    capa1.push();
    capa1.translate(0, height);
    capa1.rotate(100 + a);

    capa1.image(peq[A], width/2, 200);
    capa1.image(peq[A], xvel, 200);
  
    capa1.image(med[A], x, 0);
    capa1.pop();

    capa1.push();
    capa1.translate(0, height);
    capa1.rotate(50 + c);

    capa1.image(peq[A], xvel, 200);
    capa1.image(peq[A + 1], width / 2 - 100, -100);
    capa1.image(peq[A + 2], xvel - 100, 200);
    capa1.image(peq[A + 3], xvel - 300, -100);

    capa1.image(med[A], x, 0);


    capa1.pop();

    capa1.push();
    capa1.translate(windowWidth, windowHeight - 10);
    capa1.rotate(b);

    capa1.image(peq[A], xvel, 0, tam, tam);
    capa1.image(peq[A + 1], xvel, 0, tam, tam);
    capa1.image(peq[A + 2], xvel, 0, tam, tam);
    capa1.image(peq[A + 3], xvel, 0, tam, tam);

    capa1.image(med[A], x, 200);
    capa1.pop();
  }



}