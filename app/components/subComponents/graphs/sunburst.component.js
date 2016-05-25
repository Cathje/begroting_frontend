System.register(['angular2/core', 'd3', "../../../defaults/categories"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, d3, categories_1;
    var SunburstComponent;
    // Main function to draw and set up the visualization, once we have the data.
    function createVisualization(json, callbackFunction, hoverCallbackFunction, partition, arc, colors, totalSize, chart) {
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
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .attr("data-toggle", "modal")
            .attr("data-target", "#actions")
            .style("opacity", 1)
            .on("mouseover", function (d) { return mouseover(d, totalSize, chart, hoverCallbackFunction); })
            .on("mousedown", function (d) { return mouseclick(d, callbackFunction); });
        // Add the mouseleave handler to the bounding circle.
        chart.select("#container").on("mouseleave", function (d) { return mouseleave(d, chart, hoverCallbackFunction); });
        // Get total size of the tree = value of root node from partition.
        totalSize = path.node().__data__.value;
    }
    // Fade all but the current sequence
    function mouseover(d, totalSize, chart, hoverCallbackFunction) {
        hoverCallbackFunction(d);
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
        chart.select("#centerimg")
            .attr("src", "/app/images/categories/" + d.code.replace(new RegExp(' ', 'g'), '').toLowerCase() + ".jpg");
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
    function mouseleave(d, chart, hoverCallbackFunction) {
        hoverCallbackFunction();
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
    function buildHierarchy(data, colors, categories) {
        var root = { "name": "root", "children": [Object] };
        for (var i = 0; i < data.length; i++) {
            var currentNode = root;
            //TOP LEVEL CAT A
            if (!data[i].hasOwnProperty('catB') && !data[i].hasOwnProperty('catC')) {
                var size = +Math.abs(data[i]['totaal']);
                var nodeName = data[i]['catA'];
                var catA = { "name": nodeName, "id": data[i]['ID'], "code": data[i]['catA'], "size": size, "film": data[i]['film'], "foto": data[i]['foto'], "input": data[i]['input'], "children": [] };
                var categoryItem = categories.filter(function (categorie) { return categorie.naam === data[i]['catA']; });
                colors[data[i]['catA']] = data[i]['kleur'] ? data[i]['kleur'] : categoryItem[0]['kleur'] || 'lightgray';
                root["children"].push(catA);
            }
            else if (!data[i].hasOwnProperty('catC')) {
                var children = root["children"];
                var id = data[i]['ID'];
                // check if Cat A already exists
                var catA = children.filter(function (obj) { return obj["name"] == data[i]['catA']; });
                // If we don't already have a Cat A for this branch, create it.
                if (Object.keys(catA).length === 0) {
                    var catANode = { "name": data[i]['catA'], "id": id, "code": data[i]['catA'], "film": data[i]['film'], "foto": data[i]['foto'], "input": data[i]['input'], "size": size, "children": [] };
                    children.push(catANode);
                    var categoryItem_1 = categories.filter(function (categorie) { return categorie.naam === data[i]['catA']; });
                    colors[data[i]['catA']] = data[i]['kleur'] ? data[i]['kleur'] : categoryItem_1[0]['kleur'] || 'lightgray';
                }
                // move node down in hierarchy > to level A children
                children = _moveNodeDown(children, data[i]['catA']);
                // add catB to the catA children array
                var catBNode = { "name": data[i]['catB'], "id": id, "code": data[i]['catA'], "film": data[i]['film'], "foto": data[i]['foto'], "input": data[i]['input'], "size": size, "children": [] };
                var categoryItem = categories.filter(function (categorie) { return categorie.naam === data[i]['catA']; });
                colors[data[i]['catB']] = data[i]['kleur'] ? data[i]['kleur'] : categoryItem[0]['kleur'] || 'lightgray';
                children.push(catBNode);
            }
            else {
                var children = root["children"]; // root level children
                var id = data[i]['ID'];
                // check if Cat A already exists
                var catA = children.filter(function (obj) { return obj["name"] == data[i]['catA']; });
                // If we don't already have a Cat A for this branch, create it.
                if (Object.keys(catA).length === 0) {
                    var catANode = { "name": data[i]['catA'], "id": id, "code": data[i]['catA'], "film": data[i]['film'], "foto": data[i]['foto'], "input": data[i]['input'], "size": size, "children": [] };
                    children.push(catANode);
                    var categoryItem_2 = categories.filter(function (categorie) { return categorie.naam === data[i]['catA']; });
                    colors[data[i]['catA']] = data[i]['kleur'] ? data[i]['kleur'] : categoryItem_2[0]['kleur'] || 'lightgray';
                }
                // move node down in hierarchy > to level A children
                children = _moveNodeDown(children, data[i]['catA']);
                // check if Cat B already exists
                var catB = children.filter(function (obj) { return obj["name"] == data[i]['catA']; });
                // If we don't already have a Cat B for this branch, create it.
                if (Object.keys(catB).length === 0) {
                    var catBNode = { "name": data[i]['catB'], "id": id, "code": data[i]['catA'], "size": size, "film": data[i]['film'], "foto": data[i]['foto'], "input": data[i]['input'], "children": [] };
                    children.push(catBNode);
                    var categoryItem_3 = categories.filter(function (categorie) { return categorie.naam === data[i]['catA']; });
                    colors[data[i]['catB']] = data[i]['kleur'] ? data[i]['kleur'] : categoryItem_3[0]['kleur'] || 'lightgray';
                }
                // move node down in hierarchy > to level B children
                children = _moveNodeDown(children, data[i]['catB']);
                // add catC to the catB children array
                var catCNode = { "name": data[i]['catC'], "id": id, "code": data[i]['catA'], "size": size, "film": data[i]['film'], "foto": data[i]['foto'], "input": data[i]['input'], "children": [] };
                children.push(catCNode);
                var categoryItem = categories.filter(function (categorie) { return categorie.naam === data[i]['catA']; });
                colors[data[i]['catC']] = data[i]['kleur'] ? data[i]['kleur'] : categoryItem[0]['kleur'] || 'lightgray';
            }
        }
        return root;
    }
    function _moveNodeDown(children, categoryName) {
        for (var k = 0; k < children.length; k++) {
            if (children[k]["name"] == categoryName) {
                return children[k]["children"];
            }
        }
        return children;
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (d3_1) {
                d3 = d3_1;
            },
            function (categories_1_1) {
                categories_1 = categories_1_1;
            }],
        execute: function() {
            SunburstComponent = (function () {
                function SunburstComponent(renderer, el) {
                    var _this = this;
                    this.renderer = renderer;
                    this.el = el;
                    this.data = [];
                    this.width = 400;
                    this.height = 400;
                    this.onClick = function () { };
                    this.onHover = function () { };
                    this.createChart = function (chart) {
                        _this.radius = Math.min(_this.width, _this.height) / 2;
                        _this.translation = "translate(" + _this.width / 2 + "," + _this.height / 2 + ")";
                        var totalSize = 0; // total size of all segments
                        var colors = {};
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
                        var json;
                        if (_this.data.length < 1) {
                            json = buildHierarchy([{ 'ID': 1, 'catA': 'Algemene financiering', 'totaal': 100 }], colors, categories_1.CATEGORIES); // create an empty gray graph
                        }
                        else {
                            json = buildHierarchy(_this.data, colors, categories_1.CATEGORIES);
                        }
                        createVisualization(json, _this.onClick, _this.onHover, partition, arc, colors, totalSize, chart);
                    };
                    console.log(this.data.length);
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
                    __metadata('design:type', Object)
                ], SunburstComponent.prototype, "data", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], SunburstComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], SunburstComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], SunburstComponent.prototype, "onClick", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], SunburstComponent.prototype, "onHover", void 0);
                SunburstComponent = __decorate([
                    core_1.Component({
                        selector: 'sunburst',
                        template: "\n      <div id=\"chart\" [style]=\"'width:' + width + 'px'\">\n        <h5 id=\"explanation\" style=\"visibility: hidden;\">\n          <img id=\"centerimg\" src=\"\"/>\n          <span id=\"percentage\"></span><br/>\n          <span id=\"category\"></span>\n        </h5>\n        <h5 id=\"explanation2\">\n          <img *ngIf=\"data.length > 0\"  src=\"/app/images/icons/clickPointer.png\">\n           <p *ngIf=\"data.length > 0\"> Klik op een categorie om de acties van deze categorie te bekijken.</p>\n           <p *ngIf=\"data.length < 1\">Geen grafiekgegevens beschikbaar.</p>\n        </h5>\n      </div>\n    ",
                        providers: [],
                        styles: ["\n\n    .noData p{\n        padding-top: 40%;\n        text-align: center;\n    }\n\n    #chart {\n        position: relative;\n        text-align: center;\n        margin: 0 auto;\n    }\n\n    #explanation {\n        position: absolute;\n        margin: auto;\n        position: absolute;\n        top: 0; left: 0; bottom: 0; right: 0;\n        width: 50%;\n        height: 50%;\n        border-radius: 50%;\n        color: black;\n        display: flex;\n        justify-content:center;\n        align-content:center;\n        flex-direction:column; /* column | row */\n        z-index: 1;\n    }\n\n    #explanation2 {\n        position: absolute;\n        margin: auto;\n        position: absolute;\n        top: 0; left: 0; bottom: 0; right: 0;\n        width: 35%;\n        height: 180px;\n        color: #666;\n        display: flex;\n        justify-content:center;\n        align-content:center;\n        flex-direction:column; /* column | row */\n    }\n\n    #explanation2 img{\n     width: 50px;\n     margin: 0 auto;\n     display: inline-block;\n    }\n\n    #centerimg {\n        position: absolute;\n        border-radius: 50%;\n        width: 90%;\n        height: 90%;\n        top: 5%;\n        left: 5%;\n        z-index: 0;\n        opacity: 0.5;\n    }\n\n    #percentage{\n          font-size: 2.5em;\n          z-index: 1;\n    }\n\n    #category {\n        z-index: 1\n    }\n\n ",]
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