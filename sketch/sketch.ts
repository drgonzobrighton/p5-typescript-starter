// GLOBAL VARS & TYPES
let population: Population;
let lifespan = 200;
let count = 0;
let target: p5.Vector;

let lifeUI: p5.Element;

// P5 WILL AUTOMATICALLY USE GLOBAL MODE IF A DRAW() FUNCTION IS DEFINED
function setup() {
  createCanvas(1000, 800);
  target = createVector(width / 2, 50);
  population = new Population(target, lifespan);

  lifeUI = createP(count.toString());
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FROME
function draw() {
  background(0);
  drawTarget();
  population.run();

  lifeUI.html(count.toString());
  count++;

  if (count === lifespan) {
    count = 0;
    population.evaluate();
    population.selection();
  }
}

function drawTarget() {
  ellipse(target.x, target.y, 16, 16);
}