class Graph3D extends Component {
    constructor(options) {
        super(options);
        const WIN = {
            LEFT: -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20,
            CENTER: new Point(0, 0, -30),
            CAMERA: new Point(0, 0, -50)
        }
        this.graph = new Graph({ id: 'canvasGraph3D', width: 600, height: 600, WIN });
        this.math3D = new Math3D({ WIN });
        const surfaces = new Surfaces;
        this.scene = surfaces.ellipse();
        this.renderScene();
    }


    renderScene() {
        this.scene.points.forEach(point => this.graph.point(this.math3D.xs(point), this.math3D.ys(point)));
        this.scene.edges.forEach(edge => {
            const point1 = this.scene.points[edge.p1];
            const point2 = this.scene.points[edge.p2];
            this.graph.line(this.math3D.xs(point1), this.math3D.ys(point1), this.math3D.xs(point2), this.math3D.ys(point2));
        });
    } 

    // callbacks: {
    //     wheel: (event) => this.wheel(event),
    //     mousemove: (event) => this.mousemove(event),
    //     mouseup: (event) => this.mouseup(),
    //     mousedown: (event) => this.mousedown(),
    // }

    // wheel(event) {
    //     event.parentDefault();
    //     const delta = (event.wheelDelta > 0) ? -0.3 : 0.3;
    //     this.scene.points.foeEach(point => this.math3D.zoom(point, delta));
    //     this.renderScene();
    // }

    // mousemove(event) {
    //     if (this.canMove) {
    //         const gradus = Math.PI / 180 / 4;
    
    //         this.renderScene.points.forEach(point => {
    //             this.math3D.rotate0x(point, (this.dy - event.offsetY) * gradus);
    //             this.math3D.rotate0y(point, (this.dx - event.offsetX) * gradus);
    //         });
    //     }
    // }

    // mouseup(){
    //     this.canMove=falese;
    // }

    // mousedown(){
    //     this.canMove=true;
    // }
}