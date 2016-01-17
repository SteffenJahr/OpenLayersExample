!function () {
    "use strict";

    // Creating the OpenLayers map
    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM() // Using OpenStreetMap to show a map
                //source: new ol.source.BingMaps({
                //    key: 'YourApiKeyHere',
                //    imagerySet: 'Road'
                //})
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([0, 0]), // Set the default center of the map view
            zoom: 4 // Set default zoom
        })
    });


    // Using OpenLayers Geolocation to locate the current user position using native HTML5 GeoLocations.
    var geolocation = new ol.Geolocation({
        projection: map.getView().getProjection(), // Get the current map projection
        tracking: true // Track the user position
    });

    goog.events.listen(geolocation, goog.events.EventType.CHANGE, function (event) {
        map.getView().setCenter(geolocation.getPosition());
        map.getView().setZoom(10);
    });
}();
