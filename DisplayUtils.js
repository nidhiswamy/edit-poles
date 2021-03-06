define([
    "esri/geometry/geometryEngine",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/Color"
], function(geometryEngine, SimpleFillSymbol, SimpleLineSymbol, Color) {
    return {
        /**
         * Loop through the graphicsArray, creating a unique color for each. Adds each Graphic to the map and also returns the added Graphics.
         * @param {array} graphicsArray
         * @param {GraphicsLayer} graphicsLayer
         */
        showResultsMap: function(graphicsArray, graphicsLayer) {
            var COLOR_OPTIONS = [
                "#a6cee3",
                "#1f78b4",
                "#b2df8a",
                "#33a02c",
                "#fb9a99",
                "#e31a1c",
                "#fdbf6f",
                "#ff7f00",
                "#cab2d6",
                "#6a3d9a",
                "#ffff99",
                "#b15928"
            ];

            var graphics = graphicsArray.map((graphic, i) => {
                var color = i > COLOR_OPTIONS.length - 1 ? "#D3D3D3" : COLOR_OPTIONS[i];
                var polygonSymbol = new SimpleFillSymbol(
                    SimpleFillSymbol.STYLE_SOLID,
                    new SimpleLineSymbol(
                        SimpleLineSymbol.STYLE_DASHDOT,
                        new Color([255, 0, 0]),
                        2
                    ),
                    new Color(color)
                );

                graphic.setSymbol(polygonSymbol);

                graphicsLayer.add(graphic);

                return graphic;
            });

            return graphics;
        },

        /**
         * Given the inputs, prepare the HTML for a summary table.
         * @param {geometry} geometry
         * @param {array} graphics
         */
        getResultsTable: function(geometry, graphics) {
            // The table displaying the selected features data
            var poles = graphics.map(feature => {
                return `<tr>
                <td class="poleInfo">${feature.attributes.poleid}</td>
                <td>${feature.attributes.streetname}</td>
                <td>${feature.attributes.company}</td>
                </tr>`;
            });
            
            return `<h3>Selected Poles Data</h3>
            <table>
            <tr class="totalRow">
            <thead>
                <tr>
                    <th>Pole ID</th>
                    <th>Street Name</th>
                    <th>Company</th>
                </tr>
            </thead>
            </tr>
            ${poles.join("")}
            </table>`;
        }
    };
});
