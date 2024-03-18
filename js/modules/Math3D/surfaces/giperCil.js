Surfaces.prototype.hyperbolicCylinder = (countU = 20, countV = 20, a = 1, b = 1) => {
    const points = [];
    const edges = [];
    const polygons = [];

    for (let i = 0; i < countU; i++) {
        const u = (i / (countU - 1) - 0.5) * Math.PI; 

        for (let j = 0; j < countV; j++) {
            const v = (j / (countV - 1)) * Math.PI * 2; 

            const x = a * Math.cosh(u) * Math.cos(v);
            const y = a * Math.cosh(u) * Math.sin(v);
            const z = b * u;

            points.push(new Point(x, y, z));

            if (i > 0) {
                edges.push(new Edge((i - 1) * countV + j, i * countV + j));
            }
            if (j > 0) {
                edges.push(new Edge(i * countV + j - 1, i * countV + j));
            }
        }
    }

    for (let i = 0; i < countU - 1; i++) {
        for (let j = 0; j < countV - 1; j++) {
            const index1 = i * countV + j;
            const index2 = i * countV + j + 1;
            const index3 = (i + 1) * countV + j + 1;
            const index4 = (i + 1) * countV + j;

            polygons.push(new Polygon([index1, index2, index3, index4], '#993333'));
        }
    }

    return new Surface(points, edges, polygons);
};
