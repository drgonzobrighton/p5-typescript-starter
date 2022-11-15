// GLOBAL VARS & TYPES
let population: Population;
let lifespan = 300;
let count = 0;
let target: ITarget;
let obstacle: ITarget;
let generationCount = 1;

let lifeUI: p5.Element;
let completedRocketCountUI: p5.Element;
let crashedRocketsCountUI: p5.Element;
let generationCountUI: p5.Element;

// P5 WILL AUTOMATICALLY USE GLOBAL MODE IF A DRAW() FUNCTION IS DEFINED
function setup() {
  createCanvas(1000, 800);
  target = new Rectangle(width / 2, 50, 20, 20);
  obstacle = new Rectangle(width / 2 - 200, height - 400, 600, 20, color(0, 255, 0));
  population = new Population(target, obstacle, lifespan);

  lifeUI = createP("life span: " + count.toString());
  completedRocketCountUI = createP("rockets that reached target: " + population.getCompletedRocketCount());
  crashedRocketsCountUI = createP("rockets that crashed: " + population.getCrashedRocketCount());
  generationCountUI = createP("generation: " + generationCount);
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
  //resizeCanvas(windowWidth, windowHeight);
}

// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FROME
function draw() {
  background(0);
  target.draw();
  obstacle.draw();
  population.run();

  lifeUI.html("life span: " + count.toString());
  completedRocketCountUI.html("rockets that reached target: " + population.getCompletedRocketCount().toString());
  crashedRocketsCountUI.html("rockets that crashed: " + population.getCrashedRocketCount().toString());
  count++;

 // ellipse(obstacle.centerX, obstacle.centerY, 20, 20)


  if (count === lifespan) {
    count = 0;
    population.evaluate();
    population.selection();

    generationCount++;

    generationCountUI.html("generation: " + generationCount);
  }
}

