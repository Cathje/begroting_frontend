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
    var SunburstCompare;
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
                function SunburstCompare(renderer, el, ref) {
                    this.renderer = renderer;
                    this.el = el;
                    this.ref = ref;
                    this.counter = 0;
                }
                SunburstCompare.prototype.ngOnInit = function () {
                    /*this.data.subscribe(() => {
                        this.counter++; // application state changed
                        console.log("counter: " + this.counter);
            
                    })*/
                    var radius = Math.min(this.width, this.height) / 2, totalSize = 0; // total size of all segments
                    // TODO: map the right categories to the right color (from dark to light in same branch)
                    var colors = {
                        "Cultuur en vrije tijd ": "#5687d1",
                        "Sport ": "#5687f1",
                        "Leren en onderwijs ": "#7b615c",
                        "Basisonderwijs ": "#7b61fc",
                        "Gewoon basisonderwijs ": "#7b61ac",
                        "Veiligheidszorg ": "#de783b",
                        "Politiediensten ": "#de789f",
                        "Wonen en ruimtelijke ordening ": "#6ab975",
                        "Woonbeleid ": "#6ab975",
                        "Bestrijding van krotwoningen ": "#6ab975",
                        "Zorg en opvang ": "#a173d1",
                        "Kinderopvang ": "#a173d1",
                        "Gezin en kinderen ": "#a173d1",
                        "Algemene financiering ": "#bbbbbb",
                        "Patrimonium zonder maatschappelijk doel ": "#ddd",
                        "Financiële aangelegenheden ": "#cccccc"
                    };
                    //TODO: refactor as much code as possible from javascript to html components
                    var container = d3.select("#container2")
                        .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");
                    var partition = d3.layout.partition()
                        .size([2 * Math.PI, radius * radius])
                        .value(function (d) { return d.size; });
                    var arc = d3.svg.arc()
                        .startAngle(function (d) { return d.x; })
                        .endAngle(function (d) { return d.x + d.dx; })
                        .innerRadius(function (d) { return Math.sqrt(d.y); })
                        .outerRadius(function (d) { return Math.sqrt(d.y + d.dy); });
                    var json = buildHierarchy(this.data);
                    createVisualization(json);
                    // Main function to draw and set up the visualization, once we have the data.
                    function createVisualization(json) {
                        // Bounding circle underneath the sunburst, to make it easier to detect
                        // when the mouse leaves the parent g.
                        container.append("svg:circle")
                            .attr("r", radius)
                            .style("opacity", 0);
                        // For efficiency, filter nodes to keep only those large enough to see.
                        var nodes = partition.nodes(json)
                            .filter(function (d) {
                            return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
                        });
                        var path = container.data([json]).selectAll("path")
                            .data(nodes)
                            .enter().append("svg:path")
                            .attr("display", function (d) { return d.depth ? null : "none"; })
                            .attr("d", arc)
                            .attr("fill-rule", "evenodd")
                            .style("fill", function (d) { return colors[d.name]; })
                            .style("opacity", 1)
                            .on("mouseover", mouseover);
                        // Add the mouseleave handler to the bounding circle.
                        d3.select("#container2").on("mouseleave", mouseleave);
                        // Get total size of the tree = value of root node from partition.
                        totalSize = path.node().__data__.value;
                    }
                    ;
                    // Fade all but the current sequence
                    function mouseover(d) {
                        var percentage = (100 * d.value / totalSize).toPrecision(3);
                        var percentageString = percentage + "%";
                        if (percentage < 0.1) {
                            percentageString = "< 0.1%";
                        }
                        d3.select("#percentage2")
                            .text(percentageString);
                        d3.select("#explanation2")
                            .style("visibility", "");
                        d3.select("#category2").text(d.name);
                        var sequenceArray = getAncestors(d);
                        // Fade all the segments.
                        d3.selectAll("path")
                            .style("opacity", 0.3);
                        // Then highlight only those that are an ancestor of the current segment.
                        container.selectAll("path")
                            .filter(function (node) {
                            return (sequenceArray.indexOf(node) >= 0);
                        })
                            .style("opacity", 1);
                    }
                    // Restore everything to full opacity when moving off the visualization.
                    function mouseleave(d) {
                        // Deactivate all segments during transition.
                        d3.selectAll("path").on("mouseover", null);
                        // Transition each segment to full opacity and then reactivate it.
                        d3.selectAll("path")
                            .transition()
                            .duration(1000)
                            .style("opacity", 1)
                            .each("end", function () {
                            d3.select(this).on("mouseover", mouseover);
                        });
                        d3.select("#explanation2")
                            .style("visibility", "hidden");
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
                    function buildHierarchy(csv) {
                        var root = { "name": "root", "children": [] };
                        for (var i = 0; i < csv.length; i++) {
                            var sequence = csv[i][0];
                            var size = +csv[i][1];
                            if (isNaN(size)) {
                                continue;
                            }
                            var parts = sequence.split("-");
                            var currentNode = root;
                            for (var j = 0; j < parts.length; j++) {
                                var children = currentNode["children"];
                                var nodeName = parts[j];
                                var childNode;
                                if (j + 1 < parts.length) {
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
                                    }
                                    currentNode = childNode;
                                }
                                else {
                                    // Reached the end of the sequence; create a leaf node.
                                    childNode = { "name": nodeName, "size": size };
                                    children.push(childNode);
                                }
                            }
                        }
                        return root;
                    }
                    ;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], SunburstCompare.prototype, "data");
                __decorate([
                    //:Observable<any>;
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], SunburstCompare.prototype, "width");
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], SunburstCompare.prototype, "height");
                SunburstCompare = __decorate([
                    core_1.Component({
                        selector: 'sunburstCompare',
                        template: "\n      <div id=\"chart2\">\n        <svg id=\"chartsvg2\" [attr.width]=\"width\" [attr.height]=\"height\">\n        <g id=\"container2\">\n        <circle [attr.r]=\"radius\"></circle>\n        </g>\n        </svg>\n        <div id=\"explanation2\" style=\"visibility: hidden;\">\n          <span id=\"percentage2\"></span><br/>\n          van het totaal budget gaat naar <span id=\"category2\"></span>\n        </div>\n      </div>\n\n    ",
                        providers: [],
                        styles: ["\n    #sequence {\n  width: 600px;\n  height: 70px;\n}\n\n#sequence text, #legend text {\n  font-weight: 600;\n  fill: #fff;\n}\n\n#chart2 {\n  position: relative;\n  text-align: center;\n}\n\n#chart2 path {\n  stroke: #fff;\n}\n\n#explanation2 {\n  position: absolute;\n  top: 240px;\n  left: calc(50% - 70px);\n  width: 140px;\n  text-align: center;\n  color: #666;\n  z-index: -1;\n}\n\n#percentage2 {\n  font-size: 2.5em;\n}\n ",]
                    }), 
                    __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef, core_1.ChangeDetectorRef])
                ], SunburstCompare);
                return SunburstCompare;
            })();
            exports_1("SunburstCompare", SunburstCompare);
        }
    }
});
//# sourceMappingURL=sunburstCompare.component.js.map