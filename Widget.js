///////////////////////////////////////////////////////////////////////////
// Copyright © Esri. All Rights Reserved.
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
////////////////////////////////////////////////////////////////////////////

define(['dojo/_base/declare',
        'jimu/BaseWidget',
        'esri/toolbars/draw',
        'esri/layers/GraphicsLayer',
        './GeometryUtils',
        './DisplayUtils'
],
function(declare, BaseWidget, Draw, GraphicsLayer, GeometryUtils, DisplayUtils) {
        var clazz = declare([BaseWidget], {
                baseClass: "editpoles",

                postCreate: function() {
                        this.inherited(arguments);

                        this.drawToolbar = new Draw(this.map, {
                                toolTipOffset: 20,
                                drawTime: 90
                        });

                        this.drawToolbar.on("draw-end", this.drawEndHandler.bind(this));

                        this.resultsGraphicsLayer = new GraphicsLayer();
                        this.map.addLayer(this.resultsGraphicsLayer);
                        this.featureLayer = this.map.getLayer(this.map.graphicsLayerIds[0]);
                },

                startDrawClickHandler: function() {
                        console.log("Start Draw!");
                        this.drawToolbar.activate(Draw.POLYGON);
                },

                drawEndHandler: function(event) {
                        console.log("drawEnd", event);
                        this.drawToolbar.deactivate();

                        GeometryUtils.queryAndClip(event.geometry, this.featureLayer).then(
                                graphicsArray => {
                                        this.showResults(
                                                event.geometry,
                                                GeometryUtils.dissolve(graphicsArray, "poleid")
                                        );
                                },
                                err => {
                                        console.error(err);
                                }
                        );
                },

                showResults: function(geometry, graphicsArray) {
                        var graphics = DisplayUtils.showResultsMap(
                                graphicsArray,
                                this.resultsGraphicsLayer
                        );
                
                // Getting the HTML to display the table from DisplayUtils and place it into the widget (resultsDiv)
                this.resultsDiv.innerHTML = DisplayUtils.getResultsTable(
                                geometry, graphics
                        );
                }
        });
        return clazz;
});
