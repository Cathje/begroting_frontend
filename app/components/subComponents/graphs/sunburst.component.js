System.register(['angular2/core', 'd3'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, d3;
    var SunburstComponent;
    // Main function to draw and set up the visualization, once we have the data.
    function createVisualization(json, callbackFunction, partition, arc, colors, totalSize, chart) {
        // For efficiency, filter nodes to keep only those large enough to see.
        var nodes = partition.nodes(json)
            .filter(function (d) {
            return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
        });
        var path = chart.select("#container").data([json]).selectAll("path")
            .data(nodes)
            .enter().append("svg:path")
            .attr("display", function (d) { return d.depth ? null : "none"; })
            .attr("d", arc)
            .attr("fill-rule", "evenodd")
            .style("fill", function (d) { return colors[d.name]; })
            .style("opacity", 1)
            .on("mouseover", function (d) { return mouseover(d, totalSize, chart); })
            .on("mousedown", function (d) { return mouseclick(d, callbackFunction); });
        // Add the mouseleave handler to the bounding circle.
        chart.select("#container").on("mouseleave", function (d) { return mouseleave(d, chart); });
        // Get total size of the tree = value of root node from partition.
        totalSize = path.node().__data__.value;
    }
    // Fade all but the current sequence
    function mouseover(d, totalSize, chart) {
        var percentage = (100 * d.value / totalSize).toPrecision(3);
        var percentageString = percentage + "%";
        if (parseFloat(percentage) < 0.1) {
            percentageString = "< 0.1%";
        }
        chart.select("#percentage")
            .text(percentageString);
        chart.select("#explanation")
            .style("visibility", "");
        chart.select("#explanation2")
            .style("visibility", "hidden");
        chart.select("#category").text(d.name);
        var sequenceArray = getAncestors(d);
        // Fade all the segments.
        chart.selectAll("path")
            .style("opacity", 0.3);
        // Then highlight only those that are an ancestor of the current segment.
        chart.select("#container").selectAll("path")
            .filter(function (node) {
            return (sequenceArray.indexOf(node) >= 0);
        })
            .style("opacity", 1);
    }
    // Restore everything to full opacity when moving off the visualization.
    function mouseleave(d, chart) {
        // Deactivate all segments during transition.
        chart.selectAll("path").on("mouseover", null);
        // Transition each segment to full opacity and then reactivate it.
        chart.selectAll("path")
            .transition()
            .duration(1000)
            .style("opacity", 1)
            .each("end", function () {
            d3.select(this).on("mouseover", mouseover);
        });
        chart.select("#explanation")
            .style("visibility", "hidden");
        chart.select("#explanation2")
            .style("visibility", "");
    }
    function mouseclick(clickedObject, callbackFunction) {
        callbackFunction(clickedObject.name);
    }
    // Given a node in a partition layout, return an array of all of its ancestor
    // nodes, highest first, but excluding the root.
    function getAncestors(node) {
        var path = [];
        var current = node;
        while (current.parent) {
            path.unshift(current);
            current = current.parent;
        }
        return path;
    }
    // Take a 2-column CSV and transform it into a hierarchical structure suitable
    // for a partition layout. The first column is a sequence of step names, from
    // root to leaf, separated by hyphens. The second column is a count of how
    // often that sequence occurred.
    function buildHierarchy(data, colors) {
        var root = { "name": "root", "children": [Object] };
        for (var i = 0; i < data.length; i++) {
            var size = +data[i]['uitgave'];
            if (isNaN(size)) {
                continue;
            }
            var currentNode = root;
            Object.keys(data[i]).map(function (value) {
                var children = currentNode["children"];
                var nodeName;
                var childNode;
                if (value === 'naamCatx' || value === 'naamCaty') {
                    nodeName = data[i][value];
                    // Not yet at the end of the sequence; move down the tree.
                    var foundChild = false;
                    for (var k = 0; k < children.length; k++) {
                        if (children[k]["name"] == nodeName) {
                            childNode = children[k];
                            foundChild = true;
                            break;
                        }
                    }
                    // If we don't already have a child node for this branch, create it.
                    if (!foundChild) {
                        childNode = { "name": nodeName, "children": [] };
                        children.push(childNode);
                        colors[nodeName] = get_random_color();
                    }
                    currentNode = childNode;
                }
                else if (value === 'naamCatz') {
                    nodeName = data[i][value];
                    // Reached the end of the sequence; create a leaf node.
                    childNode = { "name": nodeName, "size": size };
                    colors[nodeName] = get_random_color();
                    children.push(childNode);
                }
            });
        }
        return root;
    }
    function rand(min, max) {
        return Math.random() * (max - min + 1) + min;
    }
    function get_random_color() {
        var h = rand(180, 190);
        var s = rand(60, 65);
        var l = rand(20, 70);
        return 'hsl(' + h + ',' + s + '%,' + l + '%)';
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (d3_1) {
                d3 = d3_1;
            }],
        execute: function() {
            SunburstComponent = (function () {
                function SunburstComponent(renderer, el) {
                    var _this = this;
                    this.renderer = renderer;
                    this.el = el;
                    this.createChart = function (chart) {
                        _this.radius = Math.min(_this.width, _this.height) / 2;
                        _this.translation = "translate(" + _this.width / 2 + "," + _this.height / 2 + ")";
                        var totalSize = 0; // total size of all segments
                        var colors = {};
                        //TODO: refactor as much code as possible from javascript to html components
                        var partition = d3.layout.partition()
                            .size([2 * Math.PI, _this.radius * _this.radius])
                            .value(function (d) { return d.size; });
                        var svg = chart.append("svg:svg")
                            .attr("id", 'chartsvg')
                            .attr("width", _this.width)
                            .attr("height", _this.height)
                            .append("svg:g")
                            .attr("id", "container")
                            .attr("transform", "translate(" + _this.width / 2 + "," + _this.height / 2 + ")");
                        svg.append("svg:circle")
                            .attr("r", _this.radius)
                            .style("opacity", 0);
                        var arc = d3.svg.arc()
                            .startAngle(function (d) { return d.x; })
                            .endAngle(function (d) { return d.x + d.dx; })
                            .innerRadius(function (d) { return Math.sqrt(d.y); })
                            .outerRadius(function (d) { return Math.sqrt(d.y + d.dy); });
                        var json = buildHierarchy(_this.data, colors);
                        createVisualization(json, _this.onClick, partition, arc, colors, totalSize, chart);
                    };
                }
                SunburstComponent.prototype.ngOnInit = function () {
                };
                ;
                SunburstComponent.prototype.ngOnChanges = function (changes) {
                    var chart = d3.select(this.el.nativeElement).select("#chart");
                    chart.select('#chartsvg').remove();
                    this.createChart(chart);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], SunburstComponent.prototype, "data");
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], SunburstComponent.prototype, "width");
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], SunburstComponent.prototype, "height");
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], SunburstComponent.prototype, "onClick");
                SunburstComponent = __decorate([
                    core_1.Component({
                        selector: 'sunburst',
                        template: "\n      <div id=\"chart\">\n        <h4 id=\"explanation\" style=\"visibility: hidden;\">\n          <span id=\"percentage\"></span><br/>\n          van het totaal budget gaat naar <span id=\"category\"></span>\n        </h4>\n        <h4 id=\"explanation2\">\n          <span>Welke proportie van de begroting gaat naar welke categorie?</span>\n        </h4>\n      </div>\n\n    ",
                        providers: [],
                        styles: ["\n    #sequence {\n  width: 600px;\n  height: 70px;\n}\n\n#sequence text, #legend text {\n  font-weight: 600;\n  fill: #fff;\n}\n\n#chart {\n  position: relative;\n  text-align: center;\n}\n\n#chart path {\n  stroke: #fff;\n}\n\n#explanation {\n  position: absolute;\n  margin: auto;\n  position: absolute;\n  top: 0; left: 0; bottom: 0; right: 0;\n  width: 37%;\n  height: 140px;\n  color: #666;\n      display: flex;\n    justify-content:center;\n    align-content:center;\n    flex-direction:column; /* column | row */\n\n}\n\n#explanation2 {\n  position: absolute;\n  margin: auto;\n  position: absolute;\n  top: 0; left: 0; bottom: 0; right: 0;\n  width: 37%;\n  height: 140px;\n  color: #666;\n      display: flex;\n    justify-content:center;\n    align-content:center;\n    flex-direction:column; /* column | row */\n}\n\n#percentage{\n  font-size: 2.5em;\n}\n ",]
                    }), 
                    __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
                ], SunburstComponent);
                return SunburstComponent;
            })();
            exports_1("SunburstComponent", SunburstComponent);
            ;
            ;
        }
    }
});
//# sourceMappingURL=sunburst.component.js.map