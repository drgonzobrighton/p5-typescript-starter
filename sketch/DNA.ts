class DNA {
    genes: p5.Vector[];
    magnitude:number = 0.1;
  
    constructor(lifespan : number) {
        this.genes = [];

        for (let i = 0; i < lifespan; i++) {
            const gene = p5.Vector.random2D();
            gene.setMag(this.magnitude);
            this.genes.push(gene);         
        }

        console.log(this)
    }
}