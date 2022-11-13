class Rocket {

    pos: p5.Vector;
    vel: p5.Vector;
    acc: p5.Vector;
    dna: DNA;
    count: number;
    fitness: number;
    lifespan: number;
    target: p5.Vector;
    completed: boolean;

    constructor(lifespan: number, target: p5.Vector, dna?: DNA) {

        this.pos = createVector(width / 2, height);
        this.vel = createVector();
        this.acc = createVector();

        this.lifespan = lifespan;
        this.dna = dna ?? new DNA(lifespan);
        this.count = 0;
        this.fitness = 0;

        this.target = target;
        this.completed = false;
    }

    applyForce(force: p5.Vector) {
        this.acc.add(force);
    }

    update() {
        const distance = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);

        if (distance < 10) {
            this.completed = true;
            this.pos = this.target.copy()
        }

        this.applyForce(this.dna.genes[this.count++]);

        if (!this.completed) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
        }
    }

    show() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        noStroke();
        fill(255, 200)
        rect(0, 0, 50, 10);
        pop();
    }

    calculateFitness() {
        const distance = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);
        this.fitness = map(distance, 0, width, width, 0);

        if (this.completed)
            this.fitness *= 10;
    }
}