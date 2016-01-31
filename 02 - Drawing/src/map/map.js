!function () {
    window.example = window.example || {};

    /**
     * @constructor
     * @extends {ol.Map}
     *
     * @param {string} elementTarget
     */
    example.Map = function Map(elementTarget) {
        this.drawingLayer_ = undefined;
        this.drawingEnabled_ = false;
        this.drawingInteraction_ = undefined;

        goog.base(this, {
            target: elementTarget,
            layers: [
                new ol.layer.Tile({
                    // Using OpenStreetMap to show a map
                    source: new ol.source.OSM()
                })
            ],
            view: new ol.View({
                // Set the default center of the map view
                center: ol.proj.fromLonLat([0, 0]),
                // Set default zoom
                zoom: 4
            })
        });

        var that = this;

        // Using OpenLayers Geolocation to locate the current user position using native HTML5 GeoLocations.
        var geolocation = new ol.Geolocation({
            // Get the current map projection
            projection: that.getView().getProjection(),
            // Track the user position
            tracking: true,
            // Tracking options. Timeout = maximum time to locate the user, maxAge = caching time
            trackingOptions: {
                timeout: 5000,
                maxAge: 300000
            }
        });

        goog.events.listen(geolocation, goog.events.EventType.CHANGE, function (event) {
            that.getView().setCenter(geolocation.getPosition());
            that.getView().setZoom(10);
        });
    };
    // Inherit from the OpenLayers 3 map
    ol.inherits(example.Map, ol.Map);

    /**
     * Gets the enable state of the draw functionality
     * @return {boolean}
     */
    example.Map.prototype.getDrawingEnabled = function () {
        return !!this.drawingEnabled_;
    };

    /**
     * Enables or disables the draw interaction
     * @param {boolean} enabled
     * @return {boolean} enabled
     */
    example.Map.prototype.setDrawingEnabled = function (enabled) {
        goog.asserts.assertBoolean(enabled, 'enabled should be a boolean');

        this.drawingEnabled_ = enabled;
        if (this.drawingEnabled_ && !this.drawingLayer_) {
            // Create a new layer for drawing
            this.drawingLayer_ = new ol.layer.Vector({
                // Geometries will be stored as vectors
                source: new ol.source.Vector()
            });

            // Add the new layer for drawing
            this.addLayer(this.drawingLayer_);
        }
        else {
            this.removeInteraction(this.drawingInteraction_);
        }
        return this.drawingEnabled_;
    };

    /**
     * Set the type of the geometry that has to be drawn.
     * If param is null the draw interaction will be reseted.
     * @param {string|null} type
     */
    example.Map.prototype.setDrawingType = function (type) {
        // Remove the old drawing layer if no drawing type is given
        if (type === null) {
            this.setDrawingEnabled(false);
            this.removeLayer(this.drawingLayer_);
            this.drawingLayer_ = undefined;
            this.removeInteraction(this.drawingInteraction_);
            return;
        }


        var drawingType;
        // Choose the geometry type you will use for drawing
        switch (type) {
            case example.Map.DrawingType.POINT:
                drawingType = ol.geom.GeometryType.POINT;
                break;
            case example.Map.DrawingType.LINE:
                drawingType = ol.geom.GeometryType.LINE_STRING;
                break;
            case example.Map.DrawingType.CIRCLE:
                drawingType = ol.geom.GeometryType.CIRCLE;
                break;
            default:
                // Fail if no drawing type matches
                goog.asserts.fail('Unknown drawing type: %s', type);
        }

        // Remove previous interaction
        this.removeInteraction(this.drawingInteraction_);

        // Create the new draw interaction
        this.drawingInteraction_ = new ol.interaction.Draw({
            source: this.drawingLayer_.getSource(),
            type: drawingType
        });

        // Add the interaction to the map
        this.addInteraction(this.drawingInteraction_);
    };

    // Available drawing types
    example.Map.DrawingType = {
        POINT: 'point',
        LINE: 'line',
        CIRCLE: 'circle'
    };
}();


