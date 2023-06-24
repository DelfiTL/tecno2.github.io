//-------CONFIGURACION----
let AMP_MIN = 0.003; // umbral mínimo de amplitud. Señal que supera al ruido de fondo
let AMP_MAX = 0.1; // umbral máximo de amplitud. 
let FREC_MIN = 180;
let FREC_MAX = 800;
//-----ENTRADA DE AUDIO----
let mic;
//-----AMPLITUD----
let amp; //variable donde cargo los valores de amplitud del sonido de entrada
let haySonido = false; // vaiable buleana que de define el ESTADO
let nohaySonido = false;
let antesHabiaSonido = false; //memoria de la variable "haySonido". Guarda el valor de la variable en fotograma anterior
//----FRECUENCIA -----
let audioContext; //motor de audio del navegador
let frecuencia; //variable donde cargo los valores de frecuencia del sonido de entrada
let frecuenciaAnterior; //memoria de la variable "frecuencia". Guarda el valor de la variable en fotograma anterior
const pichModel = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
let muchafrec = false;

//------CLASIFICADOR-----
// Global variable to store the classifier
let classifier;
// Label
let label = 'listening...';
// Teachable Machine model URL:
let soundModel = 'https://teachablemachine.withgoogle.com/models/CrltcAgn4/';
//let soundModel = './assets/my-audio-model'
//----IMAGENES -----
let fondo, papel; //los background
let imagen;
let cantimg = 17;

//----PGRAPHICS---
let capa1;
let capa2;
//---CLASES
let fig;
let capt;

var estado = [];

let t = 300; //tranasparencua de la foto final

function preload() {
 // classifier = ml5.soundClassifier(classModel + 'model.json', options); //clsificador
  classifier = ml5.soundClassifier(soundModel + 'model.json');

  fondo = loadImage('/assets/fondo.jpg');
  papel = loadImage('/assets/papel.jpg');

  for (var i = 1; i < 17; i++) {
    var imagen = loadImage("assets/figu/fig" + i + ".png");
    peq.push(imagen);
  }
  for (var i = 1; i < 19; i++) {
    var imagen = loadImage("assets/figu/figura" + i + ".png");
    med.push(imagen);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  fig = new Figuras();
  capt = new Capturas();
  //FUNCIONES DE AUDIO
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);

  classifier.classify(gotResult);

  userStartAudio(); // esto lo utilizo porque en algunos navigadores se cuelga el audio. Esto hace un reset del motor de audio (audio context)

}

function draw() {
  windowResized();
  background(fondo);

  amp = mic.getLevel();

  haySonido = amp > AMP_MIN;
  nohaySonido = amp < AMP_MIN;

  let empezoElSonido = haySonido && !antesHabiaSonido; // EVENTO
  antesHabiaSonido = haySonido; //guardo el estado anterior
  //frecuencias
  let difDeFrecuencia = frecuencia - frecuenciaAnterior;
  frecuenciaAnterior = frecuencia;

  /*if(empezoElSonido){ //cambian el estado de las figuras 
    //let e= random(0, 17);
    A=A+1;
  }*/

  //--------CLASIFICADOR------
  if(label == 'aplauso'){
   // background(255);
  // figura.clear();
  A=A+1;
   label = '';
 //  console.log('resetea figura x shhhhhh');
 }//else if(label == 'chasquido'){
  // cambiarColorDeFondo();
  //label = '';
  //}

  if (haySonido) {
    //    fig.actualizar(amp, frecuencia, difDeFrecuencia);
    fig.moverx();
  }

  fig.dibujarcapa1();
  fig.dibfig();
  capt.dibujarcapa2();
  capt.capturar();




  // let mifrec = map(frecuencia, FREC_MIN, FREC_MAX, 0, 255, true);
  muchafrec = frecuencia > FREC_MAX;
  if (muchafrec) {

    t = t - 45;

    fill(255, 255, 255, t);
    rect(0, 0, windowWidth, windowHeight);
    if (captura) {
      capa2.image(captura, 0, 0, windowWidth, windowHeight); // Mostrar la captura en (0, 0)
    }
  }

}


function windowResized() { //funcion para actualizar el tam de la pantalla
  resizeCanvas(windowWidth, windowHeight);
}


//-------FRECUENCIA-----
function startPitch() {
  pitch = ml5.pitchDetection(pichModel, audioContext, mic.stream, modelLoaded);
}
function modelLoaded() {
  getPitch();
}

function getPitch() {
  pitch.getPitch(function (err, frequency) {
    if (frequency) {
      frecuencia = frequency;
    } else {
    }
    getPitch();
  })
}


  //-------Clasificador-----
  function gotResult(error, results) {
    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
  }
