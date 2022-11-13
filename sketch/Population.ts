class Population {
    rockets: Rocket[];
    popsize: number;
    lifespan: number;
    target: p5.Vector;
    matingPool: Rocket[];

    constructor(target: p5.Vector, lifespan: number) {
        this.rockets = [];
        this.matingPool = [];
        this.popsize = 100;
        this.lifespan = lifespan;
        this.target = target;

        for (let i = 0; i < this.popsize; i++) {
            this.rockets.push(new Rocket(this.lifespan, this.target));
        }
    }

    run() {
        this.rockets.forEach(rocket => {
            rocket.update();
            rocket.show();
        });
    }

    evaluate() {
        let maxFitness = this.getMaxFitness();
        this.rockets.forEach(rocket => rocket.fitness /= maxFitness);
        this.setMatingPool();
    }

    selection() {
        const newRockets: Rocket[] = [];

        for (let i = 0; i < this.rockets.length; i++) {
            const parentA = (<Rocket>random(this.matingPool)).dna;
            const parentB = (<Rocket>random(this.matingPool)).dna;
            const childDNA = parentA.crossover(parentB);
            childDNA.mutate();

            newRockets.push(new Rocket(this.lifespan, this.target, childDNA));
        }

        this.rockets = newRockets;
    }

    private setMatingPool() {
        this.matingPool = [];

        this.rockets.forEach(rocket => {
            const n = rocket.fitness * 100;
            for (let j = 0; j < n; j++) {
                this.matingPool.push(rocket);
            }
        });
    }

    private getMaxFitness() {
        let maxFitness = 0;
        this.rockets.forEach(rocket => {
            rocket.calculateFitness();
            if (rocket.fitness > maxFitness)
                maxFitness = rocket.fitness;
        });
        return maxFitness;
    }
}