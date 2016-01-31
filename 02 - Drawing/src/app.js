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
