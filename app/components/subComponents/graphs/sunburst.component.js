System.register(['angular2/core', 'd3'], function(exports_1) {
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
    var SunburstComponent;
    function addHeadCategoryCodeToData(data) {
        for (var i = 0; i < data.length; i++) {
            data[i]['code'] = getMainCategoryCode(data[i]['catA']);
        }
        return data;
    }
    function getMainCategoryCode(category) {
        switch (category) {
            case 'Algemeen bestuur': return "01";
            case 'Zich verplaatsen en mobiliteit': return "02";
            case 'Natuur en milieubeheer': return "03";
            case 'Veiligheidszorg': return "04";
            case 'Ondernemen en werken': return "05";
            case 'Wonen en ruimtelijke ordening': return "06";
            case 'Cultuur en vrije tijd': return "07";
            case 'Leren en onderwijs': return "08";
            case 'Zorg en opvang': return "09";
            case 'Algemene financiering': return "00";
            default: return "00";
        }
    }
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
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .attr("data-toggle", "modal")
            .attr("data-target", "#actions")
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
        chart.select("#centerimg")
            .attr("src", "/app/images/categories/" + d.code + ".jpg");
        var sequenceArray = getAncestors(d);
        ;
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
            var currentNode = root;
            //TOP LEVEL CAT A
            if (!data[i].hasOwnProperty('catB') && !data[i].hasOwnProperty('catC')) {
                var size = +Math.abs(data[i]['totaal']);
                var nodeName = data[i]['catA'];
                var catA = { "name": nodeName, "id": data[i]['ID'], "code": data[i]['code'], "size": size, "children": [] };
                colors[nodeName] = get_random_color(data[i]['code']);
                root["children"].push(catA);
            }
            else if (!data[i].hasOwnProperty('catC')) {
                var children = root["children"];
                var id = data[i]['ID'];
                // check if Cat A already exists
                var catA = children.filter(function (obj) { return obj["name"] == data[i]['catA']; });
                // If we don't already have a Cat A for this branch, create it.
                if (Object.keys(catA).length === 0) {
                    var catANode = { "name": data[i]['catA'], "id": id, "code": data[i]['code'], "size": size, "children": [] };
                    children.push(catANode);
                    colors[data[i]['catA']] = get_random_color(data[i]['code']);
                }
                // move node down in hierarchy > to level A children
                children = _moveNodeDown(children, data[i]['catA']);
                // add catB to the catA children array
                var catBNode = { "name": data[i]['catB'], "id": id, "code": data[i]['code'], "size": size, "children": [] };
                colors[data[i]['catB']] = get_random_color(data[i]['code']);
                children.push(catBNode);
            }
            else {
                var children = root["children"]; // root level children
                var id = data[i]['ID'];
                // check if Cat A already exists
                var catA = children.filter(function (obj) { return obj["name"] == data[i]['catA']; });
                // If we don't already have a Cat A for this branch, create it.
                if (Object.keys(catA).length === 0) {
                    var catANode = { "name": data[i]['catA'], "id": id, "code": data[i]['code'], "size": size, "children": [] };
                    children.push(catANode);
                    colors[data[i]['catA']] = get_random_color(data[i]['code']);
                }
                // move node down in hierarchy > to level A children
                children = _moveNodeDown(children, data[i]['catA']);
                // check if Cat B already exists
                var catB = children.filter(function (obj) { return obj["name"] == data[i]['catA']; });
                // If we don't already have a Cat B for this branch, create it.
                if (Object.keys(catB).length === 0) {
                    var catBNode = { "name": data[i]['catB'], "id": id, "code": data[i]['code'], "size": size, "children": [] };
                    children.push(catBNode);
                    colors[data[i]['catB']] = get_random_color(data[i]['code']);
                }
                // move node down in hierarchy > to level B children
                children = _moveNodeDown(children, data[i]['catB']);
                // add catC to the catB children array
                var catCNode = { "name": data[i]['catC'], "id": id, "code": data[i]['code'], "size": size, "children": [] };
                children.push(catCNode);
                colors[data[i]['catC']] = get_random_color(data[i]['code']);
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
    function _createCategory() {
    }
    function rand(min, max) {
        return Math.random() * (max - min + 1) + min;
    }
    function get_random_color(categoryCode) {
        //TODO: niet hard coded mappen, maar ahv category string
        switch (categoryCode) {
            case '00': return "#999999"; // grijs* financien
            case '01': return "#ffdf50"; // geel* financien
            case '02': return "#f7bdc7"; //pink
            case '03': return "#d0d257"; //green* natuur
            case 'O4': return "#ff8e6c"; //orange* veiligheid
            case '05': return "#00cad2"; //darkblue* ondernemen
            case '06': return "#80d9be"; //darkgreen* milieu
            case '07': return "#ff0000"; // red* sport
            case '08': return "#efb3e9"; //purple* onderwijs
            case '09': return "#fa7fb8"; // pink* zorg
            default: return "#ffff99"; // lightgreen
        }
        // als we kleurtjes willen met gradaties
        /*
        var h;
        var s;
        var l;
    
        switch(categoryCode) {
            case '00': h = 0;s = 1 ;l =rand(30, 80);break; // grijs* financien
            case '01': h =rand(20, 60);s = 100 ;l =rand(30, 80);break; // geel* financien
            case '02': h = 300;s = 50 ;l =rand(50, 100);break; //pink
            case '03': h = 80;s = 75 ;l =rand(70, 100);break; //lightgreen* natuur
            case 'O4': h = 20;s = 75 ;l =rand(70, 100);break; //orange* veiligheid
            case '05': h = 200;s = 75 ;l =rand(50, 100);break; //darkblue* ondernemen
            case '06': h = 160;s = 75 ;l =rand(40, 80);break; //darkgreen* milieu
            case '07': h = 0;s = 80 ;l =rand(70, 100);break; // red* sport
            case '08': h = 270;s = 75 ;l =rand(40, 100);break; //purple* onderwijs
            case '09': h = 300;s = 80 ;l =rand(70, 90);break; // pink* zorg
            default: h = 258;s = 100 ;l =rand(80, 100);break; // darkblue
        }
        return 'hsl(' + h + ',' + s + '%,' + l + '%)';
        */
        // als we enkel blauwtinten willen
        /*
     var h = rand(180, 190);
     var s = rand(60, 65);
     var l = rand(20, 70);
     return 'hsl(' + h + ',' + s + '%,' + l + '%)';
    */
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
                    this.width = 400;
                    this.height = 400;
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
                        var formattedData = addHeadCategoryCodeToData(_this.data);
                        var json = buildHierarchy(formattedData, colors);
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
                    __metadata('design:type', String)
                ], SunburstComponent.prototype, "onClick", void 0);
                SunburstComponent = __decorate([
                    core_1.Component({
                        selector: 'sunburst',
                        template: "\n      <div id=\"chart\" [ngClass]=\"{hide: data.length < 1}\" [style]=\"'width:' + width + 'px'\">\n        <h5 id=\"explanation\" style=\"visibility: hidden;\">\n          <img id=\"centerimg\" src=\"/app/images/categories/01.jpg\"/>\n          <span id=\"percentage\"></span><br/>\n          <span id=\"category\"></span>\n        </h5>\n        <h5 id=\"explanation2\">\n          <img  src=\"/app/images/icons/clickPointer.png\">\n           <p > Klik op een categorie om de acties van deze categorie te bekijken.</p>\n        </h5>\n      </div>\n\n      <div [style]=\"'height:' + height + 'px'\" class=\"noData\" [ngClass]=\"{hide: data.length > 0}\">\n        <p>Geen grafiekgegevens beschikbaar.</p>\n      </div>\n\n    ",
                        providers: [],
                        styles: ["\n\n    .noData p{\n        padding-top: 40%;\n        text-align: center;\n    }\n\n    #chart {\n        position: relative;\n        text-align: center;\n        margin: 0 auto;\n    }\n\n    #explanation {\n        position: absolute;\n        margin: auto;\n        position: absolute;\n        top: 0; left: 0; bottom: 0; right: 0;\n        width: 50%;\n        height: 50%;\n        border-radius: 50%;\n        color: black;\n        display: flex;\n        justify-content:center;\n        align-content:center;\n        flex-direction:column; /* column | row */\n        z-index: 1;\n    }\n\n    #explanation2 {\n        position: absolute;\n        margin: auto;\n        position: absolute;\n        top: 0; left: 0; bottom: 0; right: 0;\n        width: 35%;\n        height: 180px;\n        color: #666;\n        display: flex;\n        justify-content:center;\n        align-content:center;\n        flex-direction:column; /* column | row */\n    }\n\n    #explanation2 img{\n     width: 50px;\n     margin: 0 auto;\n     display: inline-block;\n    }\n\n    #centerimg {\n        position: absolute;\n        border-radius: 50%;\n        width: 90%;\n        height: 90%;\n        top: 5%;\n        left: 5%;\n        z-index: 0;\n        opacity: 0.5;\n    }\n\n    #percentage{\n          font-size: 2.5em;\n          z-index: 1;\n    }\n\n    #category {\n        z-index: 1\n    }\n ",]
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