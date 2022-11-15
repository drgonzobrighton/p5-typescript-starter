class Population {
    rockets: Rocket[];
    popsize: number;
    lifespan: number;
    target: ITarget;
    matingPool: Rocket[];
    obstacle: ITarget;

    constructor(target: ITarget, obstacle: ITarget, lifespan: number) {
        this.rockets = [];
        this.matingPool = [];
        this.popsize = 100;
        this.lifespan = lifespan;
        this.target = target;
        this.obstacle = obstacle;

        for (let i = 0; i < this.popsize; i++) {
            this.rockets.push(new Rocket(this.lifespan, this.target, this.obstacle));
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

            newRockets.push(new Rocket(this.lifespan, this.target, this.obstacle, childDNA));
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

    getCompletedRocketCount(){
        return this.rockets.filter(r => r.completed === true).length;
    }
    getCrashedRocketCount(){
        return this.rockets.filter(r => r.crashed === true).length;
    }
}