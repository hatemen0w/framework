class Math3D {
    constructor({ WIN }) {
        this.WIN = WIN;
    }

    xs(point) {
        const zs = this.WIN.CENTER.z;
        const z0 = this.WIN.CAMERA.z;
        const x0 = this.WIN.CAMERA.x;

        return (point.x - x0) / (point.z - z0) * (zs - z0) + x0;
    }

    ys(point) {
        const zs = this.WIN.CENTER.z;
        const z0 = this.WIN.CAMERA.z;
        const y0 = this.WIN.CAMERA.y;
        return -(point.y - y0) / (point.z - z0) * (zs - z0) + y0;
    }

    multMatrix(T, m) {
        const a = [0, 0, 0, 0]
        for (let i = 0; i < T.length; i++) {
            let b = 0;
            for (let j = 0; j < m.length; j++) {
                b += T[j][i] * m[j];
            }
            a[i] = b;
        }
        return a;
    }

    zoom(point,delta){
        const T = [
            [delta,0,0,0]
            [0,delta,0,0]
            [0,0,delta,0]
            [0,0,0,1]
        ];
        const array = this.multMatrix(T,[point.x,point.y,point.z,1])

        point.x=array[0]
        point.y=array[1]
        point.z=array[2]

    }

    move(point, dx=0,dy=0,dz=0){

    }
}