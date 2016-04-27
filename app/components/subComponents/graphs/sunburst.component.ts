import {Component, Directive, ViewChild, ElementRef, Renderer, Input} from 'angular2/core';
import * as d3 from 'd3';
import {Circle} from "~d3/index";
import {Arc} from "~d3/index";
import {Pack} from "~d3/index";
import {Path} from "~d3/index";
import {ObjectConstructor} from "../../../../../../../../../../../../../Applications/WebStorm.app/Contents/plugins/JavaScriptLanguage/typescriptCompiler/external/lib";

@Component({ //invoke with metadata object
    selector: 'sunburst',
    template: `
      <div id="chart">
        <svg id="chartsvg" [attr.width]="width" [attr.height]="height">
        <g id="container">
        <circle [attr.r]="radius"></circle>
        </g>
        </svg>
        <div id="explanation" style="visibility: hidden;">
          <span id="percentage"></span><br/>
          van het totaal budget gaat naar <span id="category"></span>
        </div>
      </div>

    `,
    providers: [],
    styles:[`
    #sequence {
  width: 600px;
  height: 70px;
}

#sequence text, #legend text {
  font-weight: 600;
  fill: #fff;
}

#chart {
  position: relative;
  text-align: center;
}

#chart path {
  stroke: #fff;
}

#explanation {
  position: absolute;
  top: 240px;
  left: calc(50% - 70px);
  width: 140px;
  text-align: center;
  color: #666;
  z-index: -1;
}

#percentage {
  font-size: 2.5em;
}
 `,]
})

export class SunburstComponent {
    @Input() data: [[string, string]];
    @Input() width: number;
    @Input() height: number;

    constructor(public renderer: Renderer, public el: ElementRef){ }

    ngOnInit() {
        let radius = Math.min(this.width, this.height) / 2,
            totalSize = 0; // total size of all segments

        // TODO: map the right categories to the right color (from dark to light in same branch)
        const colors = {
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
        let container = d3.select("#container")
            .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");

        var partition = d3.layout.partition()
            .size([2 * Math.PI, radius * radius])
            .value(function(d: Circle) { return d.size; });


        var arc = d3.svg.arc()
            .startAngle(function(d: Arc) { return d.x; })
            .endAngle(function(d: Arc) { return d.x + d.dx; })
            .innerRadius(function(d: Arc) { return Math.sqrt(d.y); })
            .outerRadius(function(d: Arc) { return Math.sqrt(d.y + d.dy); });

            var json: Object = buildHierarchy(this.data);

            createVisualization(json);


        // Main function to draw and set up the visualization, once we have the data.
        function createVisualization(json: Object) {

            // Bounding circle underneath the sunburst, to make it easier to detect
            // when the mouse leaves the parent g.
            container.append("svg:circle")
                .attr("r", radius)
                .style("opacity", 0);

            // For efficiency, filter nodes to keep only those large enough to see.
            var nodes = partition.nodes(json)
                .filter(function(d) {
                    return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
                });

            var path = container.data([json]).selectAll("path")
                .data(nodes)
                .enter().append("svg:path")
                .attr("display", function(d: Path) { return d.depth ? null : "none"; })
                .attr("d", arc)
                .attr("fill-rule", "evenodd")
                .style("fill", function(d) { return colors[d.name]; })
                .style("opacity", 1)
                .on("mouseover", mouseover);

            // Add the mouseleave handler to the bounding circle.
            d3.select("#container").on("mouseleave", mouseleave);

            // Get total size of the tree = value of root node from partition.
            totalSize = path.node().__data__.value;
        };

        // Fade all but the current sequence
        function mouseover(d) {

            var percentage = (100 * d.value / totalSize).toPrecision(3);
            var percentageString = percentage + "%";
            if (percentage < 0.1) {
                percentageString = "< 0.1%";
            }

            d3.select("#percentage")
                .text(percentageString);

            d3.select("#explanation")
                .style("visibility", "");

            d3.select("#category").text(d.name);

            var sequenceArray = getAncestors(d);

            // Fade all the segments.
            d3.selectAll("path")
                .style("opacity", 0.3);

            // Then highlight only those that are an ancestor of the current segment.
            container.selectAll("path")
                .filter(function(node) {
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
                .each("end", function() {
                    d3.select(this).on("mouseover", mouseover);
                });
            d3.select("#explanation")
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
            var root = {"name": "root", "children": []};
            for (var i = 0; i < csv.length; i++) {
                var sequence = csv[i][0];
                var size = +csv[i][1];
                if (isNaN(size)) { // e.g. if this is a header row
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
                            childNode = {"name": nodeName, "children": []};
                            children.push(childNode);
                        }
                        currentNode = childNode;
                    } else {
                        // Reached the end of the sequence; create a leaf node.
                        childNode = {"name": nodeName, "size": size};
                        children.push(childNode);
                    }
                }
            }
            return root;
        };

    }

}
