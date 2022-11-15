interface ITarget {
    x: number;
    y: number;
    center : p5.Vector;

    draw(): void
    intersectsWith(point: p5.Vector): boolean;
}

class Rectangle implements ITarget {
    x: number;
    y: number;
    w: number;
    h: number;
    colour: p5.Color;
    center: p5.Vector;

    constructor(x: number, y: number, w: number, h: number, colour?: p5.Color) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.colour = colour ?? color(255, 200);
        this.center = createVector(this.x + (this.w / 2), this.y + (this.h / 2));
    }
    

    draw(): void {

        push();
        translate(this.x, this.y);
        //rectMode(CENTER);
        noStroke();
        fill(this.colour)
        rect(0, 0, this.w , this.h );
        pop();

        //ellipse(this.center.x, this.center.y, 10,10)
    }

    intersectsWith(point: p5.Vector): boolean {
        return (point.x > this.x && point.x < this.x + this.w && point.y > this.y && point.y < this.y + this.h);
    }
}