Template.prototype.graph3DTemplate = () => `<canvas id='canvasGraph3D' class='asg'></canvas>
<select id = 'selectFigure'>
    <option value = 'sphere'>Сфера</option>    
    <option value = 'thor'>Тор (бублик)</option>    
    <option value = 'cube'>Куб</option>
    <option value = 'ellipse'>Эллипсоид</option>
    <select>
    <input type = 'checkbox' id = 'edges' checked>Рисовать ребра</input>
    <input type = 'checkbox' id = 'points' checked>Рисовать точки</input>
    <input type = 'checkbox' id = 'polygons' checked>Рисовать полигоны</input>    
    `    