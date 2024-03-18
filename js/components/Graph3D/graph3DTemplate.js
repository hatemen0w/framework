Template.prototype.graph3DTemplate = () => `<canvas id='canvasGraph3D' class='asg'></canvas>
<div>
    <select id = 'selectFigure'>    
        <option value = 'sphere'>Сфера</option>    
        <option value = 'ellipse'>Эллипс</option>    
        <option value = 'thor'>Тор</option>    
        <option value = 'cube'>Куб</option>
        <option value = 'giperCil'>Гиперболический цилиндр</option>
    <select>
</div>
<div>
    <input type = 'checkbox' id = 'edges' checked>Рисовать рёбра</input>
    <input type = 'checkbox' id = 'points' checked>Рисовать точки</input>    
    <input type = 'checkbox' id = 'polygons' checked>Рисовать полигоны</input>  
</div>
    `    