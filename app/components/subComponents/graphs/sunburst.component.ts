import {Component, Directive, ViewChild, ElementRef, Renderer, Input} from 'angular2/core';
/// <reference path="../../../../typings/browser/definitions/d3/index.d.ts" />
import * as d3 from 'd3';
import {SimpleChange} from "../../../../node_modules/angular2/src/core/change_detection/change_detection_util";

@Component({ //invoke with metadata object
    selector: 'sunburst',
    template: `
      <div id="chart" [ngClass]="{hide: data.length < 1}" [style]="'width:' + width + 'px'">
        <h5 id="explanation" style="visibility: hidden;">
          <img id="centerimg" src="/app/images/categories/01.jpg"/>
          <span id="percentage"></span><br/>
          <span id="category"></span>
        </h5>
        <h5 id="explanation2">
          <img  src="/app/images/icons/clickPointer.png">
           <p > Klik op een categorie om de acties van deze categorie te bekijken.</p>
        </h5>
      </div>
      <div [style]="'height:' + height + 'px'" class="noData" [ngClass]="{hide: data.length > 0}">
        <p>Geen grafiekgegevens beschikbaar.</p>
      </div>

    `,
    providers: [],
    styles:[`

    .noData p{
        padding-top: 40%;
        text-align: center;
    }

    #chart {
        position: relative;
        text-align: center;
        margin: 0 auto;
    }

    #explanation {
        position: absolute;
        margin: auto;
        position: absolute;
        top: 0; left: 0; bottom: 0; right: 0;
        width: 50%;
        height: 50%;
        border-radius: 50%;
        color: black;
        display: flex;
        justify-content:center;
        align-content:center;
        flex-direction:column; /* column | row */
        z-index: 1;
    }

    #explanation2 {
        position: absolute;
        margin: auto;
        position: absolute;
        top: 0; left: 0; bottom: 0; right: 0;
        width: 35%;
        height: 180px;
        color: #666;
        display: flex;
        justify-content:center;
        align-content:center;
        flex-direction:column; /* column | row */
    }

    #explanation2 img{
     width: 50px;
     margin: 0 auto;
     display: inline-block;
    }

    #centerimg {
        position: absolute;
        border-radius: 50%;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 0;
        opacity: 0.5;
    }

    #percentage{
          font-size: 2.5em;
          z-index: 1;
    }

    #category {
        z-index: 1
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

    constructor(public renderer: Renderer, public el: ElementRef){
    }

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

        let formattedData = addHeadCategoryCodeToData(this.data);

        let json: Object = buildHierarchy(formattedData, colors);

        createVisualization(json, this.onClick, partition, arc, colors, totalSize, chart);
    }
}

function addHeadCategoryCodeToData(data: [Object]){
    let categories = []
    for (var i = 0; i < data.length; i++) {
        if(data[i].hasOwnProperty('naamCatx')){
            data[i]['code'] = getMainCategoryCode(data[i]['naamCatx']);
        } else if(data[i].hasOwnProperty('naamCaty')){
            data[i]['code'] = getMainCategoryCode(data[i]['naamCaty']);
        } else {
            data[i]['code'] = getMainCategoryCode(data[i]['naamCatz']);
        }
    }
    return data;

}

function getMainCategoryCode(category: string){
    switch(category) {
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
        .attr("stroke", "white")
        .attr("stroke-width", 1)
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

    chart.select("#centerimg")
            .attr("src","/app/images/categories/"+d.code+".jpg" );

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
        var size = + Math.abs(data[i]['totaal']);
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
                    childNode = {"name": nodeName, "id": id, "code": data[i]['code'], "children": []};
                    children.push(childNode);
                    colors[nodeName] = get_random_color(data[i]['code']);
                }
                currentNode = childNode;
            } else if(value === 'naamCatz'){
                nodeName = data[i][value];
                id = data[i]['ID'];
                // Reached the end of the sequence; create a leaf node.
                childNode = {"name": nodeName, "id": id,"code": data[i]['code'], "size": size};
                colors[nodeName] = get_random_color(data[i]['code']);
                children.push(childNode);
            }
        });
    }
    return root;
};

function rand(min: number, max: number) {
    return Math.random() * (max-min+1) + min;
}

function get_random_color(categoryCode: string) {
    var h;
    var s;
    var l;

    switch(categoryCode) {
        case '00': h = 0;s = 1 ;l =rand(30, 80);break; // grijs* financien
        case '01': h = =rand(20, 60);s = 100 ;l =rand(30, 80);break; // geel* financien
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
}

