import {Component, Directive, ViewChild, ElementRef, Renderer, Input} from 'angular2/core';
/// <reference path="../../../../typings/browser/definitions/d3/index.d.ts" />
import * as d3 from 'd3';
import {SimpleChange} from "../../../../node_modules/angular2/src/core/change_detection/change_detection_util";
import {CATEGORIES} from "../../../defaults/categories";

@Component({ //invoke with metadata object
    selector: 'sunburst',
    template: `
      <div id="chart" [style]="'width:' + width + 'px'">
        <h5 id="explanation" style="visibility: hidden;">
          <img id="centerimg" src=""/>
          <span id="percentage"></span><br/>
          <span id="category"></span>
        </h5>
        <h5 id="explanation2">
          <img *ngIf="data.length > 0"  src="/app/images/icons/clickPointer.png">
           <p *ngIf="data.length > 0"> Klik op een categorie om de acties van deze categorie te bekijken.</p>
           <p *ngIf="data.length < 1">Geen grafiekgegevens beschikbaar.</p>
        </h5>
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
        width: 90%;
        height: 90%;
        top: 5%;
        left: 5%;
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
    @Input() data: any = [];
    @Input() width: number = 400;
    @Input() height: number = 400;
    @Input() onClick = function(){};
    @Input() onHover = function(){};
    radius: number;
    translation: string;

    constructor(public renderer: Renderer, public el: ElementRef){
        console.log(this.data.length);
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

        let json: Object;
        if(this.data.length < 1){
            json = buildHierarchy([{'ID': 1, 'catA': 'Algemene financiering', 'totaal': 100}], colors, CATEGORIES); // create an empty gray graph
        }else {
            json= buildHierarchy(this.data, colors, CATEGORIES);
        }

        createVisualization(json, this.onClick, this.onHover, partition, arc, colors, totalSize, chart);

    }
}


// Main function to draw and set up the visualization, once we have the data.
function createVisualization(json: Object, callbackFunction: any, hoverCallbackFunction: any, partition: any, arc: any, colors: Object, totalSize: any, chart: any) {

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
        .attr("data-toggle", "modal")
        .attr("data-target", "#actions")
        .style("opacity", 1)
        .on("mouseover", (d: any) => mouseover(d, totalSize, chart, hoverCallbackFunction))
        .on("mousedown", (d: any) => mouseclick(d, callbackFunction));

    // Add the mouseleave handler to the bounding circle.
    chart.select("#container").on("mouseleave", (d: any) => mouseleave( d, chart, hoverCallbackFunction));

    // Get total size of the tree = value of root node from partition.
    totalSize = path.node().__data__.value;

};

// Fade all but the current sequence
function mouseover(d: any, totalSize: any, chart:any, hoverCallbackFunction: any) {
    hoverCallbackFunction(d);

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
            .attr("src","/app/images/categories/"+d.code.replace(new RegExp(' ', 'g'), '').toLowerCase()+".jpg" );

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
function mouseleave(d : any, chart: any, hoverCallbackFunction: any) {
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


function buildHierarchy(data: [Object], colors: Object, categories: any) {
    var root = {"name": "root", "children": [Object]};

    let levelAList = data.filter((obj) => { return (!obj.hasOwnProperty('catB') && !obj.hasOwnProperty('catC')});
    let levelBList = data.filter((obj) => { return (obj.hasOwnProperty('catB') && !obj.hasOwnProperty('catC')});
    let levelCList = data.filter((obj) => { return (obj.hasOwnProperty('catC')});

    console.log(levelAList, levelBList, levelCList);
    for (var i = 0; i < levelAList.length; i++) {
        var currentNode : Object = root;

        //TOP LEVEL CAT A
            let nodeName : string = levelAList[i]['catA'];
        const size = + Math.abs(levelAList[i]['totaal']);

            let catA : Object = {
                "name": nodeName, "id": levelAList[i]['ID'],"code": levelAList[i]['catA'], "size": size, "film": levelAList[i]['film'], "foto":levelAList[i]['foto'],"input": levelAList[i]['input'], "children": []};
            let categoryItem = categories.filter((categorie: any) => categorie.naam === levelAList[i]['catA']);
            colors[levelAList[i]['catA']] = levelAList[i]['kleur'] ? levelAList[i]['kleur']  : categoryItem[0]['kleur'] || 'lightgray';

            root["children"].push(catA);
        }

        // SECOND LEVEL CAT B
    for (var i = 0; i < levelBList.length; i++) {
            let children = root["children"];
            let id: number = levelBList[i]['ID'];
        const size = + Math.abs(levelBList[i]['totaal']);


        // check if Cat A already exists
            let catA : Object  = children.filter((obj) => {return obj["name"] == levelBList[i]['catA']});

            // If we don't already have a Cat A for this branch, create it.
            if (Object.keys(catA).length === 0) {
                let catANode = {"name": levelBList[i]['catA'], "id": id, "code": levelBList[i]['catA'], "film": levelBList[i]['film'], "foto":levelBList[i]['foto'],"input": levelBList[i]['input'], "size": size, "children": []};
                children.push(catANode);
                let categoryItem = categories.filter((categorie) => categorie.naam === levelBList[i]['catA']);
                colors[levelBList[i]['catA']] = levelBList[i]['kleur'] ? levelBList[i]['kleur']  : categoryItem[0]['kleur'] || 'lightgray';
            }

            // move node down in hierarchy > to level A children
            children = _moveNodeDown(children, levelBList[i]['catA']);

            // add catB to the catA children array
            let catBNode = {"name": levelBList[i]['catB'], "id": id, "code": levelBList[i]['catA'], "film": levelBList[i]['film'], "foto":levelBList[i]['foto'],"input": levelBList[i]['input'],"size": size, "children": []};
            let categoryItem = categories.filter((categorie) => categorie.naam === levelBList[i]['catA']);
            colors[levelBList[i]['catB']] = levelBList[i]['kleur'] ? levelBList[i]['kleur']  : categoryItem[0]['kleur'] || 'lightgray';
            children.push(catBNode);

        }
    for (var i = 0; i < levelCList.length; i++) {
        const size = + Math.abs(levelCList[i]['totaal']);

        let children = root["children"]; // root level children
            let id: number = levelCList[i]['ID'];

            // check if Cat A already exists
            let catA : Object  = children.filter((obj) => {return obj["name"] == levelCList[i]['catA']});

            // If we don't already have a Cat A for this branch, create it.
            if (Object.keys(catA).length === 0) {
                let catANode = {"name": levelCList[i]['catA'], "id": id, "code": levelCList[i]['catA'],"film": levelCList[i]['film'], "foto":levelCList[i]['foto'],"input": levelCList[i]['input'], "size": size, "children": []};
                children.push(catANode);
                let categoryItem = categories.filter((categorie) => categorie.naam === levelCList[i]['catA']);
                colors[levelCList[i]['catA']] = levelCList[i]['kleur'] ? levelCList[i]['kleur']  : categoryItem[0]['kleur'] || 'lightgray';

            }

            // move node down in hierarchy > to level A children
            children = _moveNodeDown(children, levelCList[i]['catA']);


            // check if Cat B already exists
            let catB : Object  = children.filter((obj) => {return obj["name"] == levelCList[i]['catA']});

            // If we don't already have a Cat B for this branch, create it.
            if (Object.keys(catB).length === 0) {
                let catBNode = {"name": levelCList[i]['catB'], "id": id, "code": levelCList[i]['catA'], "size": size,"film": levelCList[i]['film'], "foto":levelCList[i]['foto'],"input": levelCList[i]['input'], "children": []};
                children.push(catBNode);
                let categoryItem = categories.filter((categorie) => categorie.naam === levelCList[i]['catA']);
                colors[levelCList[i]['catB']] = levelCList[i]['kleur'] ? levelCList[i]['kleur']  : categoryItem[0]['kleur'] || 'lightgray';

            }

            // move node down in hierarchy > to level B children
            children = _moveNodeDown(children, levelCList[i]['catB']);

            // add catC to the catB children array

            let catCNode = {"name": levelCList[i]['catC'], "id": id, "code": levelCList[i]['catA'], "size": size, "film": levelCList[i]['film'], "foto":levelCList[i]['foto'],"input": levelCList[i]['input'], "children": []};
            children.push(catCNode);
            let categoryItem = categories.filter((categorie: any) => categorie.naam === levelCList[i]['catA']);
            colors[levelCList[i]['catC']] = levelCList[i]['kleur'] ? levelCList[i]['kleur']  : categoryItem[0]['kleur'] || 'lightgray';


        }
    console.log(root);
    return root;
};

function _moveNodeDown(children: [Object] , categoryName: string) {
    for (var k = 0; k < children.length; k++) {
        if (children[k]["name"] == categoryName) {
            return children[k]["children"];
        }
    }
    return children;
}



