class Population {
    rockets: Rocket[];
    popsize: number;
    lifespan: number;

    constructor(lifespan? : number) {
        this.rockets = [];
        this.popsize = 100;
        this.lifespan = lifespan ?? 200;

        for (let i = 0; i < this.popsize; i++) {
            this.rockets.push(new Rocket(this.lifespan));
        }
    }

    run() {
        this.rockets.forEach(rocket => {
            rocket.update();
            rocket.show();
        });
    }
}