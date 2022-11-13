// GLOBAL VARS & TYPES
let population: Population;
let lifespan = 200;

let lifeUI : p5.Element;

// P5 WILL AUTOMATICALLY USE GLOBAL MODE IF A DRAW() FUNCTION IS DEFINED
function setup() {
  createCanvas(windowWidth, windowHeight - 100);

  population = new Population(lifespan);

  lifeUI = createP(lifespan.toString());
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FROME
function draw() {
  background(0);
  population.run();

  lifeUI.html(lifespan.toString());
  lifespan++;
}