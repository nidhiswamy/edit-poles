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
                // var color = i > COLOR_OPTIONS.length - 1 ? "#D3D3D3" : COLOR_OPTIONS[i];
                var color = "#A0E7E5";
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
            // var area = geometryEngine.geodesicArea(geometry, "acres").toFixed(2);

            // sort from highest acres to lowest
            graphics.sort(function(a, b) {
               return 0; 
            });
            //     var aSize = geometryEngine.geodesicArea(a.geometry, "acres");
            //     var bSize = geometryEngine.geodesicArea(b.geometry, "acres");
            //     if (aSize > bSize) {
            //         return -1;
            //     }
            //     if (aSize < bSize) {
            //         return 1;
            //     }
            //     return 0;
            // });

            // Table column setup

            

            // Editing the table to display sample pole data
            var poles = graphics.map(feature => {
                return `<tr>
                <td class="poleid">${feature.attributes.poleid}</td>
                <td>${feature.attributes.streetname}</td>
                <td>${feature.attributes.company}</td>
                </tr>`;
            });
            
            return `
            <h3>Selected Poles Data</h3>
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
