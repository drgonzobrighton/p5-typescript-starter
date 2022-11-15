var DNA = (function () {
    function DNA(lifespan, genes) {
        this.magnitude = 0.3;
        this.genes = genes !== null && genes !== void 0 ? genes : [];
        if (!genes) {
            for (var i = 0; i < lifespan; i++) {
                var gene = p5.Vector.random2D();
                gene.setMag(this.magnitude);
                this.genes.push(gene);
            }
        }
    }
    DNA.prototype.crossover = function (partner) {
        var newGenes = [];
        var midPoint = floor(random(this.genes.length));
        for (var i = 0; i < this.genes.length; i++) {
            if (i < midPoint)
                newGenes.push(this.genes[i]);
            else
                newGenes.push(partner.genes[i]);
        }
        return new DNA(this.genes.length, newGenes);
    };
    DNA.prototype.mutate = function () {
        for (var i = 0; i < this.genes.length; i++) {
            if (random(1) < 0.01)
                this.genes[i] = (p5.Vector.random2D()).setMag(this.magnitude);
        }
    };
    return DNA;
}());
var Population = (function () {
    function Population(target, obstacle, lifespan) {
        this.rockets = [];
        this.matingPool = [];
        this.popsize = 100;
        this.lifespan = lifespan;
        this.target = target;
        this.obstacle = obstacle;
        for (var i = 0; i < this.popsize; i++) {
            this.rockets.push(new Rocket(this.lifespan, this.target, this.obstacle));
        }
    }
    Population.prototype.run = function () {
        this.rockets.forEach(function (rocket) {
            rocket.update();
            rocket.show();
        });
    };
    Population.prototype.evaluate = function () {
        var maxFitness = this.getMaxFitness();
        this.rockets.forEach(function (rocket) { return rocket.fitness /= maxFitness; });
        this.setMatingPool();
    };
    Population.prototype.selection = function () {
        var newRockets = [];
        for (var i = 0; i < this.rockets.length; i++) {
            var parentA = random(this.matingPool).dna;
            var parentB = random(this.matingPool).dna;
            var childDNA = parentA.crossover(parentB);
            childDNA.mutate();
            newRockets.push(new Rocket(this.lifespan, this.target, this.obstacle, childDNA));
        }
        this.rockets = newRockets;
    };
    Population.prototype.setMatingPool = function () {
        var _this = this;
        this.matingPool = [];
        this.rockets.forEach(function (rocket) {
            var n = rocket.fitness * 100;
            for (var j = 0; j < n; j++) {
                _this.matingPool.push(rocket);
            }
        });
    };
    Population.prototype.getMaxFitness = function () {
        var maxFitness = 0;
        this.rockets.forEach(function (rocket) {
            rocket.calculateFitness();
            if (rocket.fitness > maxFitness)
                maxFitness = rocket.fitness;
        });
        return maxFitness;
    };
    Population.prototype.getCompletedRocketCount = function () {
        return this.rockets.filter(function (r) { return r.completed === true; }).length;
    };
    Population.prototype.getCrashedRocketCount = function () {
        return this.rockets.filter(function (r) { return r.crashed === true; }).length;
    };
    return Population;
}());
var Rocket = (function () {
    function Rocket(lifespan, target, obstacle, dna) {
        this.pos = createVector(width / 2, height);
        this.vel = createVector();
        this.acc = createVector();
        this.lifespan = lifespan;
        this.dna = dna !== null && dna !== void 0 ? dna : new DNA(lifespan);
        this.count = 0;
        this.fitness = 0;
        this.target = target;
        this.obstacle = obstacle;
        this.completed = false;
        this.crashed = false;
        this.r = 3.0;
        this.colour = color(127);
    }
    Rocket.prototype.applyForce = function (force) {
        this.acc.add(force);
    };
    Rocket.prototype.update = function () {
        if (this.obstacle.intersectsWith(this.pos)) {
            this.crashed = true;
            this.colour = color(255, 0, 0);
            return;
        }
        var distance = dist(this.pos.x, this.pos.y, this.target.center.x, this.target.center.y);
        if (distance < 10) {
            this.completed = true;
            this.pos = createVector(this.target.center.x, this.target.center.y);
            this.colour = color(0, 255, 0);
        }
        this.applyForce(this.dna.genes[this.count++]);
        if (!this.completed) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
        }
    };
    Rocket.prototype.show = function () {
        var theta = this.vel.heading() + radians(90);
        fill(this.colour);
        stroke(200);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(theta);
        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);
        pop();
    };
    Rocket.prototype.calculateFitness = function () {
        var distance = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);
        this.fitness = (1 / distance);
        if (this.completed)
            this.fitness *= 20;
        if (this.crashed)
            this.fitness /= 10;
        console.log(this.fitness);
    };
    return Rocket;
}());
var Rectangle = (function () {
    function Rectangle(x, y, w, h, colour) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.colour = colour !== null && colour !== void 0 ? colour : color(255, 200);
        this.center = createVector(this.x + (this.w / 2), this.y + (this.h / 2));
    }
    Rectangle.prototype.draw = function () {
        push();
        translate(this.x, this.y);
        noStroke();
        fill(this.colour);
        rect(0, 0, this.w, this.h);
        pop();
    };
    Rectangle.prototype.intersectsWith = function (point) {
        return (point.x > this.x && point.x < this.x + this.w && point.y > this.y && point.y < this.y + this.h);
    };
    return Rectangle;
}());
var population;
var lifespan = 300;
var count = 0;
var target;
var obstacle;
var generationCount = 1;
var lifeUI;
var completedRocketCountUI;
var crashedRocketsCountUI;
var generationCountUI;
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
function windowResized() {
}
function draw() {
    background(0);
    target.draw();
    obstacle.draw();
    population.run();
    lifeUI.html("life span: " + count.toString());
    completedRocketCountUI.html("rockets that reached target: " + population.getCompletedRocketCount().toString());
    crashedRocketsCountUI.html("rockets that crashed: " + population.getCrashedRocketCount().toString());
    count++;
    if (count === lifespan) {
        count = 0;
        population.evaluate();
        population.selection();
        generationCount++;
        generationCountUI.html("generation: " + generationCount);
    }
}
//# sourceMappingURL=build.js.map