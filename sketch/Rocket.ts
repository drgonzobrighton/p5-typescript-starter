class Rocket {
    pos: p5.Vector;
    vel: p5.Vector;
    acc: p5.Vector;
    dna: DNA;
    count: number;

    constructor(lifespan : number) {

        this.pos = createVector(width / 2, height);
        this.vel = createVector();
        this.acc = createVector();

        this.dna = new DNA(lifespan);
        this.count = 0;

        console.log(this.dna)
    }

    applyForce(force: p5.Vector) {
        this.acc.add(force);
    }

    update() {
        this.applyForce(this.dna.genes[this.count++]);

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    show() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        noStroke();
        fill(255,200)
        rect(0, 0, 50, 10);
        pop();
    }
}