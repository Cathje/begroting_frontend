System.register(['angular2/core', 'd3'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, d3;
    var SunburstCompare;
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
        var totalString = "€" + Math.floor(d.value);
        var totalTax = "€" + Math.floor(totalSize); //totTax
        if (parseFloat(percentage) < 0.1) {
            percentageString = "< 0.1%";
        }
        chart.select("#percentage")
            .text(percentageString);
        chart.select("#taxPart")
            .text(totalString);
        chart.select("#totTax")
            .text(totalTax);
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
        // Transition each segment to full opacity and then reactivate it.
        chart.selectAll("path")
            .transition()
            .duration(500)
            .style("opacity", 1);
        chart.select("#explanation")
            .style("visibility", "hidden");
        chart.select("#explanation2")
            .style("visibility", "");
    }
    function mouseclick(clickedObject, callbackFunction) {
        callbackFunction(clickedObject.id);
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
            var size = +data[i]['totaal'];
            if (isNaN(size)) {
                continue;
            }
            var currentNode = root;
            Object.keys(data[i]).map(function (value) {
                var children = currentNode["children"];
                var nodeName;
                var id;
                var childNode;
                if (value === 'catA' || value === 'naamCaty') {
                    nodeName = data[i][value];
                    id = data[i]['ID'];
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
                        childNode = { "name": nodeName, "id": id, "children": [] };
                        children.push(childNode);
                        colors[nodeName] = get_random_color();
                    }
                    currentNode = childNode;
                }
                else if (value === 'naamCatz') {
                    nodeName = data[i][value];
                    id = data[i]['ID'];
                    // Reached the end of the sequence; create a leaf node.
                    childNode = { "name": nodeName, "id": id, "size": size };
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
            SunburstCompare = (function () {
                function SunburstCompare(renderer, el) {
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
                SunburstCompare.prototype.ngOnInit = function () {
                };
                ;
                SunburstCompare.prototype.ngOnChanges = function (changes) {
                    var chart = d3.select(this.el.nativeElement).select("#chart");
                    chart.select('#chartsvg').remove();
                    this.createChart(chart);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], SunburstCompare.prototype, "data", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], SunburstCompare.prototype, "width", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], SunburstCompare.prototype, "height", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], SunburstCompare.prototype, "onClick", void 0);
                SunburstCompare = __decorate([
                    core_1.Component({
                        selector: 'sunburstCompare',
                        template: "\n      <div id=\"chart\">\n        <h5 id=\"explanation\" style=\"visibility: hidden;\">\n          <span id=\"percentage\"></span><br/>of <br><br><span id=\"taxPart\"></span>\n          <br> gaat naar <span id=\"category\"></span>\n        </h5>\n        <h5 id=\"explanation2\">\n          <img  src=\"/app/images/icons/clickPointer.png\">\n           <p > Richt je muis op de grafiek om je belastingaandeel te zien.</p>\n        </h5>\n      </div>\n\n    ",
                        providers: [],
                        styles: ["\n#chart {\n  position: relative;\n  text-align: center;\n}\n\n#chart path {\n  stroke: #fff;\n}\n\n    img{\n     width: 50px;\n     margin: 0 auto;\n     display: inline-block;\n    }\n\n#explanation {\n  position: absolute;\n  margin: auto;\n  position: absolute;\n  top: 0; left: 0; bottom: 0; right: 0;\n  width: 35%;\n  height: 180px;\n  color: #666;\n      display: flex;\n    justify-content:center;\n    align-content:center;\n    flex-direction:column; /* column | row */\n\n}\n\n#explanation2 {\n  position: absolute;\n  margin: auto;\n  position: absolute;\n  top: 0; left: 0; bottom: 0; right: 0;\n  width: 35%;\n  height: 180px;\n  color: #666;\n      display: flex;\n    justify-content:center;\n    align-content:center;\n    flex-direction:column; /* column | row */\n}\n\n#percentage{\n  font-size: 2.5em;\n}\n#taxPart{\n  font-size: 2.5em;\n}\n#totTax{\n  font-size: 2.5em;\n}\n ",]
                    }), 
                    __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
                ], SunburstCompare);
                return SunburstCompare;
            }());
            exports_1("SunburstCompare", SunburstCompare);
            ;
            ;
        }
    }
});
//# sourceMappingURL=sunburstCompare.component.js.map