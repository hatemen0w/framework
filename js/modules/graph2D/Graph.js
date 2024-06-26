function Graph(options) {
    const { id, width = 300, height = 300, WIN, callbacks = {} } = options;
    let canvas;
    if (id) {
        canvas = document.getElementById(id);
    } else {
        canvas = document.createElement('canvas');
        document.querySelector('body').appendChild(canvas);
    }

    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');

    canvas.addEventListener('wheel', callbacks.wheel);
    canvas.addEventListener('mousedown', callbacks.mousedown);
    canvas.addEventListener('mousemove', callbacks.mousemove);
    canvas.addEventListener('mouseup', callbacks.mouseup);
    canvas.addEventListener('mouseleave', callbacks.mouseleave);
    canvas.addEventListener('mousemove', callbacks.getX);

    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = canvas.getContext('2d');

    //x
    const xs = (x) => ((x - WIN.LEFT) / WIN.WIDTH) * canvas.width;

    //y
    const ys = (y) => (WIN.HEIGHT - (y - WIN.BOTTOM)) * canvas.width / WIN.HEIGHT;

    //xs
    this.sx = x => x * WIN.WIDTH / canvas.width + WIN.LEFT;

    //ys
    this.sy = y => -y * WIN.HEIGHT / canvas.height - WIN.BOTTOM;

    this.clear = () => {
        context.clearRect(0, 0, canvas.width, canvas.height)
    }

    this.line = (x1, y1, x2, y2, color, width) => {

        context.beginPath();
        context.strokeStyle = color || 'black';
        context.lineWidth = width || 0;
        context.moveTo(xs(x1), ys(y1));
        context.lineTo(xs(x2), ys(y2));
        context.stroke();
        context.closePath();
    }

    this.point = (x, y, color = 'black', size = 2) => {
        context.beginPath();
        context.strokeStyle = color;
        context.fillStyle = color;
        context.arc(xs(x), ys(y), size, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
        context.closePath();
    }

    this.print = (x, y, text, color, size) => {
        context.font = size / WIN.WIDTH + "px Verdana";
        context.fillStyle = color;
        context.fillText(text, xs(x), ys(y));
        context.stroke;
    }

    this.dashedLine = (x1, y1, x2, y2, color, width) => {
        context.beginPath();
        context.setLineDash([20, 5]);
        context.strokeStyle = color || 'black';
        context.lineWidth = width || 0;
        context.moveTo(xs(x1), ys(y1));
        context.lineTo(xs(x2), ys(y2));
        context.stroke();
        context.closePath();
        context.setLineDash([0, 0]);
    }

    this.polygon = function (points, color = '#f805') {
        context.fillStyle = color;
        context.beginPath();
        context.moveTo(xs(points[0].x), ys(points[0].y));
        for (let i = 1; i < points.length; i++) {
            context.lineTo(xs(points[i].x), ys(points[i].y));
        }
        context.lineTo(xs(points[0].x), ys(points[0].y));
        context.closePath();
        context.fill();
    };
}

