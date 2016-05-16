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
    function addHeadCategoryCodeToData(data) {
        var categories = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].hasOwnProperty('naamCatx')) {
                data[i]['code'] = getMainCategoryCode(data[i]['naamCatx']);
            }
            else if (data[i].hasOwnProperty('naamCaty')) {
                data[i]['code'] = getMainCategoryCode(data[i]['naamCaty']);
            }
            else {
                data[i]['code'] = getMainCategoryCode(data[i]['naamCatz']);
            }
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
            default: return "10";
        }
    }
    // Main function to draw and set up the visualization, once we have the data.
    function createVisualization(json, callbackFunction, partition, arc, colors, totalSize, chart) {
        // For efficiency, filter nodes to keep only those large enough to see.
        var nodes = partition.nodes(json)
            .filter(function (d) {
            return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
        });
        console.log('hey');
        var path = chart.select("#container").data([json]).selectAll("path")
            .data(nodes)
            .enter().append("svg:path")
            .attr("display", function (d) { return d.depth ? null : "none"; })
            .attr("d", arc)
            .attr("fill-rule", "evenodd")
            .style("fill", function (d) { return colors[d.name]; })
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .style("opacity", 1);
        //.on("mouseover", (d: any) => mouseover(d, totalSize, chart))
        //.on("mousedown", (d: any) => mouseclick(d, callbackFunction));
        console.log('hey9');
        // Add the mouseleave handler to the bounding circle.
        chart.select("#container").on("mouseleave", function (d) { return mouseleave(d, chart); });
        // Get total size of the tree = value of root node from partition.
        totalSize = path.node().__data__.value;
        console.log('hey3');
    }
    // Fade all but the current sequence
    function mouseover(d, totalSize, chart) {
        console.log('hey0');
        var percentage = (100 * d.value / totalSize).toPrecision(3);
        var percentageString = percentage + "%";
        if (parseFloat(percentage) < 0.1) {
            percentageString = "< 0.1%";
        }
        chart.select("#percentage")
            .text(percentageString);
        console.log('hey6');
        chart.select("#explanation")
            .style("visibility", "");
        chart.select("#explanation2")
            .style("visibility", "hidden");
        console.log('hey4');
        chart.select("#category").text(d.name);
        chart.select("#centerimg")
            .attr("src", "/app/images/categories/" + d.code + ".jpg");
        var sequenceArray = getAncestors(d);
        console.log('hey5');
        console.log('hey');
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
            var size = +Math.abs(data[i]['totaal']);
            if (isNaN(size)) {
                continue;
            }
            var currentNode = root;
            Object.keys(data[i]).map(function (value) {
                var children = currentNode["children"];
                var nodeName;
                var id;
                var childNode;
                if (value === 'naamCatx' || value === 'naamCaty') {
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
                        childNode = { "name": nodeName, "id": id, "code": data[i]['code'], "children": [] };
                        children.push(childNode);
                        colors[nodeName] = get_random_color(data[i]['code']);
                    }
                    currentNode = childNode;
                }
                else if (value === 'naamCatz') {
                    nodeName = data[i][value];
                    id = data[i]['ID'];
                    // Reached the end of the sequence; create a leaf node.
                    childNode = { "name": nodeName, "id": id, "code": data[i]['code'], "size": size };
                    colors[nodeName] = get_random_color(data[i]['code']);
                    children.push(childNode);
                }
            });
        }
        return root;
    }
    function rand(min, max) {
        return Math.random() * (max - min + 1) + min;
    }
    function get_random_color(categoryCode) {
        /*
        switch(categoryCode) {
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
        }*/
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
                        var formattedData = addHeadCategoryCodeToData(_this.data);
                        var json = buildHierarchy(formattedData, colors);
                        createVisualization(json, _this.onClick, partition, arc, colors, totalSize, chart);
                        console.log('hey2');
                    };
                    console.log('333', this.data);
                }
                SunburstComponent.prototype.ngOnInit = function () {
                };
                ;
                SunburstComponent.prototype.ngOnChanges = function (changes) {
                    console.log('555', this.data);
                    var chart = d3.select(this.el.nativeElement).select("#chart");
                    chart.select('#chartsvg').remove();
                    this.createChart(chart);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
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
                        template: "\n      <div id=\"chart\" [ngClass]=\"{hide: data.length < 1}\" [style]=\"'width:' + width + 'px'\">\n        <h5 id=\"explanation\" style=\"visibility: hidden;\">\n          <img id=\"centerimg\" src=\"/app/images/categories/01.jpg\"/>\n          <span id=\"percentage\"></span><br/>\n          <span id=\"category\"></span>\n        </h5>\n        <h5 id=\"explanation2\">\n          <img  src=\"/app/images/icons/clickPointer.png\">\n           <p > Klik op een categorie om de acties van deze categorie te bekijken.</p>\n        </h5>\n      </div>\n      <div [style]=\"'height:' + height + 'px'\" class=\"noData\" [ngClass]=\"{hide: data.length > 0}\">\n        <p>Geen grafiekgegevens beschikbaar.</p>\n      </div>\n\n    ",
                        providers: [],
                        styles: ["\n\n    .noData p{\n        padding-top: 40%;\n        text-align: center;\n    }\n\n    #chart {\n        position: relative;\n        text-align: center;\n        margin: 0 auto;\n    }\n\n    #explanation {\n        position: absolute;\n        margin: auto;\n        position: absolute;\n        top: 0; left: 0; bottom: 0; right: 0;\n        width: 50%;\n        height: 50%;\n        border-radius: 50%;\n        color: black;\n        display: flex;\n        justify-content:center;\n        align-content:center;\n        flex-direction:column; /* column | row */\n        z-index: 1;\n    }\n\n    #explanation2 {\n        position: absolute;\n        margin: auto;\n        position: absolute;\n        top: 0; left: 0; bottom: 0; right: 0;\n        width: 35%;\n        height: 180px;\n        color: #666;\n        display: flex;\n        justify-content:center;\n        align-content:center;\n        flex-direction:column; /* column | row */\n    }\n\n    #explanation2 img{\n     width: 50px;\n     margin: 0 auto;\n     display: inline-block;\n    }\n\n    #centerimg {\n        position: absolute;\n        border-radius: 50%;\n        width: 100%;\n        height: 100%;\n        top: 0;\n        left: 0;\n        z-index: 0;\n        opacity: 0.5;\n    }\n\n    #percentage{\n          font-size: 2.5em;\n          z-index: 1;\n    }\n\n    #category {\n        z-index: 1\n    }\n ",]
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