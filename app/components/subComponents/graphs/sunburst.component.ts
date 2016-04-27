import {Component, Directive, ViewChild, ElementRef, Renderer, Input} from 'angular2/core';

@Component({ //invoke with metadata object
    selector: 'sunburst',
    template: `
      <div id="chart">
        <svg id="chartsvg" [attr.width]="width" [attr.height]="height">
        <g id="container"></g>
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
            b = {w: 75, h: 30, s: 3, t: 10},
            totalSize = 0; // total size of all segments

        // Mapping of category names to colors.
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

        var vis = d3.select("#container")
            .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");

        var partition = d3.layout.partition()
            .size([2 * Math.PI, radius * radius])
            .value(function(d) { return d.size; });

        var arc = d3.svg.arc()
            .startAngle(function(d) { return d.x; })
            .endAngle(function(d) { return d.x + d.dx; })
            .innerRadius(function(d) { return Math.sqrt(d.y); })
            .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

            var json = buildHierarchy(this.data);

            createVisualization(json);


// Main function to draw and set up the visualization, once we have the data.
        function createVisualization(json) {

            // Bounding circle underneath the sunburst, to make it easier to detect
            // when the mouse leaves the parent g.
            vis.append("svg:circle")
                .attr("r", radius)
                .style("opacity", 0);

            // For efficiency, filter nodes to keep only those large enough to see.
            var nodes = partition.nodes(json)
                .filter(function(d) {
                    return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
                });

            var path = vis.data([json]).selectAll("path")
                .data(nodes)
                .enter().append("svg:path")
                .attr("display", function(d) { return d.depth ? null : "none"; })
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

// Fade all but the current sequence, and show it in the breadcrumb trail.
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
            updateBreadcrumbs(sequenceArray, percentageString);

            // Fade all the segments.
            d3.selectAll("path")
                .style("opacity", 0.3);

            // Then highlight only those that are an ancestor of the current segment.
            vis.selectAll("path")
                .filter(function(node) {
                    return (sequenceArray.indexOf(node) >= 0);
                })
                .style("opacity", 1);
        }

// Restore everything to full opacity when moving off the visualization.
        function mouseleave(d) {

            // Hide the breadcrumb trail
            d3.select("#trail")
                .style("visibility", "hidden");

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



// Generate a string that describes the points of a breadcrumb polygon.
        function breadcrumbPoints(d, i) {
            var points = [];
            points.push("0,0");
            points.push(b.w + ",0");
            points.push(b.w + b.t + "," + (b.h / 2));
            points.push(b.w + "," + b.h);
            points.push("0," + b.h);
            if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
                points.push(b.t + "," + (b.h / 2));
            }
            return points.join(" ");
        }

// Update the breadcrumb trail to show the current sequence and percentage.
        function updateBreadcrumbs(nodeArray, percentageString) {

            // Data join; key function combines name and depth (= position in sequence).
            var g = d3.select("#trail")
                .selectAll("g")
                .data(nodeArray, function(d) { return d.name + d.depth; });

            // Add breadcrumb and label for entering nodes.
            var entering = g.enter().append("svg:g");

            entering.append("svg:polygon")
                .attr("points", breadcrumbPoints)
                .style("fill", function(d) { return colors[d.name]; });

            entering.append("svg:text")
                .attr("x", (b.w + b.t) / 2)
                .attr("y", b.h / 2)
                .attr("dy", "0.35em")
                .attr("text-anchor", "middle")
                .text(function(d) { return d.name; });

            // Set position for entering and updating nodes.
            g.attr("transform", function(d, i) {
                return "translate(" + i * (b.w + b.s) + ", 0)";
            });

            // Remove exiting nodes.
            g.exit().remove();

            // Now move and update the percentage at the end.
            d3.select("#trail").select("#endlabel")
                .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
                .attr("y", b.h / 2)
                .attr("dy", "0.35em")
                .attr("text-anchor", "middle")
                .text(percentageString);

            // Make the breadcrumb trail visible, if it's hidden.
            d3.select("#trail")
                .style("visibility", "");

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
