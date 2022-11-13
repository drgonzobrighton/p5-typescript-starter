class Rocket {
    pos: p5.Vector;
    vel: p5.Vector;
    acc: p5.Vector;

    constructor() {

        this.pos = createVector(width / 2, height);
        this.vel = createVector();
        this.acc = createVector();
    }

    applyForce(force: p5.Vector) {
        this.acc.add(force);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    show() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0, 0, 10, 50);
        pop();
    }
}