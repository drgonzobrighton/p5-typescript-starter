var Rocket = (function () {
    function Rocket() {
        this.pos = createVector(width / 2, height);
        this.vel = createVector();
        this.acc = createVector();
    }
    Rocket.prototype.applyForce = function (force) {
        this.acc.add(force);
    };
    Rocket.prototype.update = function () {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    };
    Rocket.prototype.show = function () {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0, 0, 10, 50);
        pop();
    };
    return Rocket;
}());
var rocket;
function setup() {
    createCanvas(800, 600);
    rocket = new Rocket();
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    background(0);
    rocket.update();
    rocket.show();
}
//# sourceMappingURL=build.js.map