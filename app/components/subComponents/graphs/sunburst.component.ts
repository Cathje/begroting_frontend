import {Component, Directive, ViewChild, ElementRef, Renderer, Input} from 'angular2/core';
/// <reference path="../../../../typings/browser/definitions/d3/index.d.ts" />
import * as d3 from 'd3';
import {SimpleChange} from "../../../../node_modules/angular2/src/core/change_detection/change_detection_util";

@Component({ //invoke with metadata object
    selector: 'sunburst',
    template: `
      <div id="chart">
        <h4 id="explanation" style="visibility: hidden;">
          <span id="percentage"></span><br/>
          van het totaal budget gaat naar <span id="category"></span>
        </h4>
        <h4 id="explanation2">
          <span>Welke proportie van de begroting gaat naar welke categorie?</span>
        </h4>
      </div>

    `,
    providers: [],
    styles:[`
#chart {
  position: relative;
  text-align: center;
}

#chart path {
  stroke: #fff;
}

#explanation {
  position: absolute;
  margin: auto;
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  width: 37%;
  height: 180px;
  color: #666;
      display: flex;
    justify-content:center;
    align-content:center;
    flex-direction:column; /* column | row */

}

#explanation2 {
  position: absolute;
  margin: auto;
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  width: 37%;
  height: 180px;
  color: #666;
      display: flex;
    justify-content:center;
    align-content:center;
    flex-direction:column; /* column | row */
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

    };

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
        var chart = d3.select(this.el.nativeElement).select("#chart");
        chart.select('#chartsvg').remove();
        this.createChart(chart);
    }


    createChart = (chart: any) => {
        this.radius = Math.min(this.width, this.height) / 2;
        this.translation = "translate(" + this.width / 2 + "," + this.height / 2 + ")";
        let totalSize = 0; // total size of all segments
        const colors = {};

        //TODO: refactor as much code as possible from javascript to html components
        let partition = d3.layout.partition()
            .size([2 * Math.PI, this.radius * this.radius])
            .value(function(d: any) { return d.size; });

        let svg = chart.append("svg:svg")
            .attr("id", 'chartsvg')
            .attr("width", this.width)
            .attr("height", this.height)
            .append("svg:g")
            .attr("id", "container")
            .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");

        svg.append("svg:circle")
            .attr("r", this.radius)
            .style("opacity", 0);

        let arc = d3.svg.arc()
            .startAngle(function(d: any) { return d.x; })
            .endAngle(function(d: any) { return d.x + d.dx; })
            .innerRadius(function(d: any) { return Math.sqrt(d.y); })
            .outerRadius(function(d: any) { return Math.sqrt(d.y + d.dy); });

        let json: Object = buildHierarchy(this.data, colors);

        createVisualization(json, this.onClick, partition, arc, colors, totalSize, chart);
    }
}


// Main function to draw and set up the visualization, once we have the data.
function createVisualization(json: Object, callbackFunction: any, partition: any, arc: any, colors: Object, totalSize: any, chart: any) {

    // For efficiency, filter nodes to keep only those large enough to see.
    let nodes: any = partition.nodes(json)
        .filter(function(d : any) {
            return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
        });

    let path = chart.select("#container").data([json]).selectAll("path")
        .data(nodes)
        .enter().append("svg:path")
        .attr("display", function(d: any) { return d.depth ? null : "none"; })
        .attr("d", arc)
        .attr("fill-rule", "evenodd")
        .style("fill", function(d : any) { return colors[d.name]; })
        .style("opacity", 1)
        .on("mouseover", (d: any) => mouseover(d, totalSize, chart))
        .on("mousedown", (d: any) => mouseclick(d, callbackFunction));

    // Add the mouseleave handler to the bounding circle.
    chart.select("#container").on("mouseleave", (d: any) => mouseleave( d, chart));

    // Get total size of the tree = value of root node from partition.
    totalSize = path.node().__data__.value;
};

// Fade all but the current sequence
function mouseover(d: any, totalSize: any, chart:any) {
    let percentage = (100 * d.value / totalSize).toPrecision(3);
    let percentageString = percentage + "%";
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
        .filter(function(node: any) {
            return (sequenceArray.indexOf(node) >= 0);
        })
        .style("opacity", 1);
}

// Restore everything to full opacity when moving off the visualization.
function mouseleave(d : any, chart: any) {


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

function mouseclick(clickedObject : any, callbackFunction : any) {
    callbackFunction(clickedObject.id);
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
function buildHierarchy(data: [Object], colors: Object) {
    var root = {"name": "root", "children": [Object]};
    for (var i = 0; i < data.length; i++) {
        var size = +data[i]['totaal'];
        if (isNaN(size)) { // e.g. if this is a header row
            continue;
        }

        var currentNode : Object = root;
        Object.keys(data[i]).map((value) => {
            let children = currentNode["children"];
            let nodeName : string;
            let id: number;
            let childNode: Object;
            if(value === 'naamCatx' || value === 'naamCaty'){
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
                    childNode = {"name": nodeName, "id": id, "children": []};
                    children.push(childNode);
                    colors[nodeName] = get_random_color();
                }
                currentNode = childNode;
            } else if(value === 'naamCatz'){
                nodeName = data[i][value];
                id = data[i]['ID'];
                // Reached the end of the sequence; create a leaf node.
                childNode = {"name": nodeName, "id": id, "size": size};
                colors[nodeName] = get_random_color();
                children.push(childNode);
            }
        });
    }
    return root;
};

function rand(min: number, max: number) {
    return Math.random() * (max-min+1) + min;
}

function get_random_color() {
    var h = rand(180, 190);
    var s = rand(60, 65);
    var l = rand(20, 70);
    return 'hsl(' + h + ',' + s + '%,' + l + '%)';
}

