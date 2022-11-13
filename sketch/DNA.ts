class DNA {
    genes: p5.Vector[];
    magnitude: number = 0.3;

    constructor(lifespan: number, genes?: p5.Vector[]) {
        this.genes = genes ?? [];

        if (!genes) {
            for (let i = 0; i < lifespan; i++) {
                const gene = p5.Vector.random2D();
                gene.setMag(this.magnitude);
                this.genes.push(gene);
            }
        }
    }

    crossover(partner: DNA) {
        const newGenes: p5.Vector[] = [];
        const midPoint = floor(random(this.genes.length));

        for (let i = 0; i < this.genes.length; i++) {
            if (i < midPoint) 
                newGenes.push(this.genes[i]);
            else
                newGenes.push(partner.genes[i]);
        }

        return new DNA(this.genes.length, newGenes);
    }

    mutate() : void {
        for (let i = 0; i < this.genes.length; i++) {
            if (random(1) < 0.01)
                this.genes[i] = (p5.Vector.random2D()).setMag(this.magnitude);

        }
    }
}