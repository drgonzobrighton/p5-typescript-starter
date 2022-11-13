var DNA = (function () {
    function DNA(lifespan) {
        this.magnitude = 0.1;
        this.genes = [];
        for (var i = 0; i < lifespan; i++) {
            var gene = p5.Vector.random2D();
            gene.setMag(this.magnitude);
            this.genes.push(gene);
        }
        console.log(this);
    }
    return DNA;
}());
var Population = (function () {
    function Population(lifespan) {
        this.rockets = [];
        this.popsize = 100;
        this.lifespan = lifespan !== null && lifespan !== void 0 ? lifespan : 200;
        for (var i = 0; i < this.popsize; i++) {
            this.rockets.push(new Rocket(this.lifespan));
        }
    }
    Population.prototype.run = function () {
        this.rockets.forEach(function (rocket) {
            rocket.update();
            rocket.show();
        });
    };
    return Population;
}());
var Rocket = (function () {
    function Rocket(lifespan) {
        this.pos = createVector(width / 2, height);
        this.vel = createVector();
        this.acc = createVector();
        this.dna = new DNA(lifespan);
        this.count = 0;
        console.log(this.dna);
    }
    Rocket.prototype.applyForce = function (force) {
        this.acc.add(force);
    };
    Rocket.prototype.update = function () {
        this.applyForce(this.dna.genes[this.count++]);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    };
    Rocket.prototype.show = function () {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        noStroke();
        fill(255, 200);
        rect(0, 0, 50, 10);
        pop();
    };
    return Rocket;
}());
var population;
var lifespan = 200;
var lifeUI;
function setup() {
    createCanvas(windowWidth, windowHeight - 100);
    population = new Population(lifespan);
    lifeUI = createP(lifespan.toString());
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    background(0);
    population.run();
    lifeUI.html(lifespan.toString());
    lifespan++;
}
//# sourceMappingURL=build.js.map