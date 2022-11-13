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
    function Population(target, lifespan) {
        this.rockets = [];
        this.matingPool = [];
        this.popsize = 100;
        this.lifespan = lifespan;
        this.target = target;
        for (var i = 0; i < this.popsize; i++) {
            this.rockets.push(new Rocket(this.lifespan, this.target));
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
            newRockets.push(new Rocket(this.lifespan, this.target, childDNA));
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
    return Population;
}());
var Rocket = (function () {
    function Rocket(lifespan, target, dna) {
        this.pos = createVector(width / 2, height);
        this.vel = createVector();
        this.acc = createVector();
        this.lifespan = lifespan;
        this.dna = dna !== null && dna !== void 0 ? dna : new DNA(lifespan);
        this.count = 0;
        this.fitness = 0;
        this.target = target;
        this.completed = false;
    }
    Rocket.prototype.applyForce = function (force) {
        this.acc.add(force);
    };
    Rocket.prototype.update = function () {
        var distance = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);
        if (distance < 10) {
            this.completed = true;
            this.pos = this.target.copy();
        }
        this.applyForce(this.dna.genes[this.count++]);
        if (!this.completed) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
        }
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
    Rocket.prototype.calculateFitness = function () {
        var distance = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);
        this.fitness = map(distance, 0, width, width, 0);
        if (this.completed)
            this.fitness *= 10;
    };
    return Rocket;
}());
var population;
var lifespan = 200;
var count = 0;
var target;
var lifeUI;
function setup() {
    createCanvas(1000, 800);
    target = createVector(width / 2, 50);
    population = new Population(target, lifespan);
    lifeUI = createP(count.toString());
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
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
//# sourceMappingURL=build.js.map