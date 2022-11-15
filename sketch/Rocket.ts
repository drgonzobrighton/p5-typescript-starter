class Rocket {

    pos: p5.Vector;
    vel: p5.Vector;
    acc: p5.Vector;
    dna: DNA;
    count: number;
    fitness: number;
    lifespan: number;
    target: ITarget;
    obstacle: ITarget;
    completed: boolean;
    crashed: boolean;
    r: number;
    colour: p5.Color;

    constructor(lifespan: number, target: ITarget, obstacle: ITarget, dna?: DNA) {

        this.pos = createVector(width / 2, height);
        this.vel = createVector();
        this.acc = createVector();

        this.lifespan = lifespan;
        this.dna = dna ?? new DNA(lifespan);
        this.count = 0;
        this.fitness = 0;

        this.target = target;
        this.obstacle = obstacle;
        this.completed = false;
        this.crashed = false;
        this.r = 3.0
        this.colour = color(127);
    }

    applyForce(force: p5.Vector) {
        this.acc.add(force);
    }

    update() {
        if (this.obstacle.intersectsWith(this.pos)) {
            this.crashed = true;
            this.colour = color(255,0,0);
            return;
        }

        const distance = dist(this.pos.x, this.pos.y, this.target.center.x, this.target.center.y);

        if (distance < 10) {
            this.completed = true;
            this.pos = createVector(this.target.center.x, this.target.center.y);
            this.colour = color(0,255,0);
        }

        this.applyForce(this.dna.genes[this.count++]);

        if (!this.completed) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
        }
    }

    show() {
        
        let theta = this.vel.heading() + radians(90);
        fill(this.colour);
        stroke(200);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(theta);

       // ellipse(0, -this.r * 2, 5, 5)

        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);
        pop();

    }

    calculateFitness() {
        const distance = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);
        //this.fitness = map(distance, 0, width, width, 0);
        this.fitness = (1 / distance);


        if (this.completed)
            this.fitness *= 20;

        if (this.crashed)
            this.fitness /= 10;

            console.log(this.fitness)

    }
}