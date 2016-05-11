import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {ProjectService} from './../../../services/projectService.component.js';


@Component({ //invoke with metadata object
    selector: 'project-overview',
    template: `<div class="container">
                    <div class="polaroid" *ngFor="#project of projects">
                    <div class="img-container">
                         <img src="/app/images/categories/{{project.categoryNumber}}.jpg"/>
                    </div>
                    <p>{{project.town}}</p>
                    <p>{{project.name}}</p>
                </div>
                </div>
                `,
    providers: [ProjectService],
    styles: [`img:hover{
    transform: scale(1.2);
    transition: all 0.25s ease-in;

}

    .container{
    width: 100%;
    background-color: #2ac7d2;
    color:white;
    text-align: center;
    padding-bottom: 20px;
}


.polaroid {
    background-color: white;
    color:black;
    padding: 10px;
    width: 250px;
    display: inline-block;
    text-align: center;
    margin: 10px;
    box-shadow: 3px 3px 3px grey;
}

.polaroid p:nth-child(2) {
    font-weight: bold;
    margin-bottom: 0;
    margin-top: 5px;
}

.polaroid img {
    width: 100%;
    box-shadow: inset 3px 3px 3px grey;
}

.polaroid .img-container{
    overflow:hidden;
    width: 100%;
    height:150px;
}`]
})

export class ProjectOverviewComponent {
    title = 'Overzicht projecten';
    projects = this._projectService.getProjects();
    selectedTown = { 'name':'Berchem' };

    constructor(
        private _router: Router,
        private _projectService: ProjectService) {
    }

}
