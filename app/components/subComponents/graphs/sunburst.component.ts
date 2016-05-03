import {Component, Directive, ViewChild, ElementRef, Renderer, Input} from 'angular2/core';
/// <reference path="../../../../typings/browser/definitions/d3/index.d.ts" />
import * as d3 from 'd3';

@Component({ //invoke with metadata object
    selector: 'sunburst',
    template: `
      <div id="chart">
        <svg id="chartsvg" [attr.width]="width" [attr.height]="height">
        <g id="container" [attr.transform]="translation">
        <circle [attr.r]="radius" opacity="0"></circle>
        </g>
        </svg>
        <div id="explanation" style="visibility: hidden;">
          <span id="percentage"></span><br/>
          van het totaal budget gaat naar <span id="category"></span>
        </div>
        <div id="explanation2">
          <span>Welke proportie van de begroting gaat naar welke categorie?</span>
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
  top: 190px;
  left: calc(50% - 70px);
  width: 140px;
  text-align: center;
  color: #666;
  z-index: -1;
}

#explanation2 {
  position: absolute;
  top: 190px;
  left: calc(50% - 70px);
  width: 140px;
  text-align: center;
  color: #666;
  z-index: -1;
    font-size: 1.4em;

}

#percentage{
  font-size: 2.5em;
}
 `,]
})

export class SunburstComponent {
    @Input() data: [[string, string]];
    @Input() width: number;
    @Input() height: number;
    @Input() onClick: string;
    radius: number;
    translation: string;

    constructor(public renderer: Renderer, public el: ElementRef){ }

    ngOnInit() {
        this.radius = Math.min(this.width, this.height) / 2;
        this.translation = "translate(" + this.width / 2 + "," + this.height / 2 + ")";
        let totalSize = 0; // total size of all segments
        const colors = {};

        //TODO: refactor as much code as possible from javascript to html components
        let partition = d3.layout.partition()
            .size([2 * Math.PI, this.radius * this.radius])
            .value(function(d: any) { return d.size; });


        let arc = d3.svg.arc()
            .startAngle(function(d: any) { return d.x; })
            .endAngle(function(d: any) { return d.x + d.dx; })
            .innerRadius(function(d: any) { return Math.sqrt(d.y); })
            .outerRadius(function(d: any) { return Math.sqrt(d.y + d.dy); });

            let json: Object = buildHierarchy(this.data);

            createVisualization(json, this.onClick);


        // Main function to draw and set up the visualization, once we have the data.
        function createVisualization(json: Object, callbackFunction: any) {

            // For efficiency, filter nodes to keep only those large enough to see.
            let nodes: any = partition.nodes(json)
                .filter(function(d : any) {
                    return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
                });

            let path = d3.select("#container").data([json]).selectAll("path")
                .data(nodes)
                .enter().append("svg:path")
                .attr("display", function(d: any) { return d.depth ? null : "none"; })
                .attr("d", arc)
                .attr("fill-rule", "evenodd")
                .style("fill", function(d : any) { return colors[d.name]; })
                .style("opacity", 1)
                .on("mouseover", mouseover)
                .on("mousedown", (d) => mouseclick(d, callbackFunction));

            // Add the mouseleave handler to the bounding circle.
            d3.select("#container").on("mouseleave", mouseleave);

            // Get total size of the tree = value of root node from partition.
            totalSize = path.node().__data__.value;
        };

        // Fade all but the current sequence
        function mouseover(d: any) {

            let percentage = (100 * d.value / totalSize).toPrecision(3);
            let percentageString = percentage + "%";
            if (parseFloat(percentage) < 0.1) {
                percentageString = "< 0.1%";
            }

            d3.select("#percentage")
                .text(percentageString);

            d3.select("#explanation")
                .style("visibility", "");

            d3.select("#explanation2")
                .style("visibility", "hidden");

            d3.select("#category").text(d.name);

            var sequenceArray = getAncestors(d);

            // Fade all the segments.
            d3.selectAll("path")
                .style("opacity", 0.3);

            // Then highlight only those that are an ancestor of the current segment.
            d3.select("#container").selectAll("path")
                .filter(function(node) {
                    return (sequenceArray.indexOf(node) >= 0);
                })
                .style("opacity", 1);
        }

        // Restore everything to full opacity when moving off the visualization.
        function mouseleave(d : any) {

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
            d3.select("#explanation2")
                .style("visibility", "");
        }

        function mouseclick(clickedObject : any, callbackFunction : any) {
            console.log(clickedObject);
            callbackFunction(clickedObject.name);
        }

// Given a node in a partition layout, return an array of all of its ancestor
// nodes, highest first, but excluding the root.
        function getAncestors(node: any) {
            let path: Array<Object> = [];
            let current = node;
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
        function buildHierarchy(data: [Object]) {
            let root = {"name": "root", "children": [Object]};
            for (let i = 0; i < data.length; i++) {
                let size = +data[i]['uitgave'];
                if (isNaN(size)) { // e.g. if this is a header row
                    continue;
                }

                let currentNode : Object = root;
                Object.keys(data[i]).map((value) => {
                    let children = currentNode["children"];
                    let nodeName : string;
                    let childNode: Object;
                    if(value === 'naamCatx' || value === 'naamCaty'){
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
                            childNode = {"name": nodeName, "children": []};
                            children.push(childNode);
                            colors[nodeName] = get_random_color();
                        }
                        currentNode = childNode;
                    } else if(value === 'naamCatz'){
                        nodeName = data[i][value];
                        // Reached the end of the sequence; create a leaf node.
                        childNode = {"name": nodeName, "size": size};
                        colors[nodeName] = get_random_color();
                        children.push(childNode);
                    }
                });
            }
            console.log(colors);
            return root;
        };

        function rand(min: number, max: number) {
            return parseInt(Math.random() * (max-min+1), 10) + min;
        }

        function get_random_color() {
            var h = rand(180, 190);
            var s = rand(60, 65);
            var l = rand(20, 70);
            return 'hsl(' + h + ',' + s + '%,' + l + '%)';
        }

    }

}
