class Graph3D extends Component {
    constructor(options) {
        super(options);
        this.WIN = {
            LEFT: -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20,
            CENTER: new Point(0, 0, -30),
            CAMERA: new Point(0, 0, -50)
        };

        this.controls = {
            showPoints: true,
            showEdges: true,
            showPolygons: true,
        };

        this.graph = new Graph({
            id: 'canvasGraph3D', width: 600, height: 600, WIN: this.WIN,
            callbacks: {
                wheel: (event) => this.wheel(event),
                mousemove: (event) => this.mousemove(event),
                mouseup: () => this.mouseup(),
                mousedown: () => this.mousedown(),
            }
        });

        this.math3D = new Math3D({ WIN: this.WIN });
        const surfaces = new Surfaces;
        this.scene = surfaces.ellipse();
        this.initUI();
        this.renderScene();
    }

    initUI() {
        const controlsDiv = document.createElement('div');
        controlsDiv.innerHTML = `
            <label><input type="checkbox" id="showPoints" checked> Показывать точки</label>
            <label><input type="checkbox" id="showEdges" checked> Показывать рёбра</label>
            <label><input type="checkbox" id="showPolygons" checked> Показывать полигоны</label>
        `;
    
        if (this.graph.container) {
            this.graph.container.appendChild(controlsDiv);
        } else {
            document.body.appendChild(controlsDiv);
        }
    
        controlsDiv.addEventListener('change', (event) => {
            const checkbox = event.target;
            const controlId = checkbox.id;
    
            if (controlId in this.controls) {
                this.controls[controlId] = checkbox.checked;
                this.graph.clear();
                this.renderScene();
            }
        });
    }

    renderScene() {
        if (this.controls.showPoints) {
            this.scene.points.forEach(point => this.graph.point(this.math3D.xs(point), this.math3D.ys(point)));
        }

        if (this.controls.showEdges) {
            this.scene.edges.forEach(edge => {
                const point1 = this.scene.points[edge.p1];
                const point2 = this.scene.points[edge.p2];
                this.graph.line(this.math3D.xs(point1), this.math3D.ys(point1), this.math3D.xs(point2), this.math3D.ys(point2));
            });
        }

        if (this.controls.showPolygons) {
            this.math3D.calcDistance(this.scene, this.WIN.CAMERA, 'distance');
            this.math3D.sortByArtistAlgorithm(this.scene);
            this.drawPolygons();
        }
    }

    addPolygons(polygons) {
        polygons.forEach(polygon => this.scene.polygons.push(polygon));
        this.graph.clear();
        this.renderScene();
    }

    drawPolygons() {
        this.scene.polygons.forEach(polygon => {
            const points = polygon.points.map(index => new Point(this.scene.points[index]));
            this.graph.polygon(points, polygon.color);
        });
    }

    mouseup() {
        this.canMove = false;
    }

    mousedown() {
        this.canMove = true;
    }

    wheel(event) {
        event.preventDefault();
        const delta = (event.wheelDelta > 0) ? 1.1 : 0.9;
        this.scene.points.forEach(point => this.math3D.zoom(delta, point));
        this.graph.clear();
        this.renderScene();
    }

    mousemove(event) {
        if (this.canMove) {
            const gradus = Math.PI / 180 / 4;
            this.scene.points.forEach(point => {
                this.math3D.rotateOx(point, (this.dy - event.offsetY) * gradus);
                this.math3D.rotateOy(point, (this.dx - event.offsetX) * gradus);
            });
            this.graph.clear();
            this.renderScene();
        }
        this.dx = event.offsetX;
        this.dy = event.offsetY;
    }
}