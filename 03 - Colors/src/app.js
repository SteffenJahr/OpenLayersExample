'use strict';

var map = new example.Map('map');

function toggleDrawing(element) {
    var enabled = map.setDrawingEnabled(!map.getDrawingEnabled());
    if (!enabled) {
        resetDrawingTypeListElements();
    }
    element.innerHTML = enabled ? 'Disable drawing' : 'Enable Drawing';
}

function resetDrawingTypeListElements() {
    var listElement = document.getElementById('drawing_types');
    for (var i = 0; i < listElement.children.length; i++) {
        listElement.children[i].classList.remove('active');
    }
}

function setDrawingType(type, element) {
    resetDrawingTypeListElements();
    if (map.getDrawingEnabled()) {
        map.setDrawingType(type);
        element.classList.add('active');
    }
}

function resetDrawing() {
    resetDrawingTypeListElements();
    toggleDrawing(document.getElementById('drawing'));
    map.setDrawingType(null);
}

var colors = {
    'default stroke color': [0, 153, 255, 1],
    'default fill color': [255, 255, 255, 1],
    red: [255, 0, 0, 1],
    blue: [0, 0, 255, 1],
    white: [255, 255, 255, 1],
    yellow: [255, 255, 0, 1],
    green: [0, 255, 0, 1]
};

function changeFillColor() {
    var fillColorInput = document.getElementById('fill_color');
    var fillColorOptionValue = fillColorInput.options[fillColorInput.selectedIndex].value;
    var opacity = document.getElementById('fill_opacity').value;
    var color = colors[fillColorOptionValue];
    if (color) {
        color = color.slice(0); // Clone array before manipulating
        color[3] = parseFloat(opacity);
        window.example.styles.fillColor = color;
        document.getElementById('fill_color_label').textContent = fillColorOptionValue + ' (opacity ' + opacity + ')';
    }
}

function changeStrokeColor() {
    var strokeColorInput = document.getElementById('stroke_color');
    var strokeColorOptionValue = strokeColorInput.options[strokeColorInput.selectedIndex].value;
    var opacity = document.getElementById('stroke_opacity').value;
    var color = colors[strokeColorOptionValue];
    if (color) {
        color = color.slice(0); // Clone array before manipulating
        color[3] = parseFloat(opacity);
        window.example.styles.strokeColor = color;
        document.getElementById('stroke_color_label').textContent = strokeColorOptionValue + ' (opacity ' + opacity + ')';
    }
}
