import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {ProjectService} from './../../../services/projectService.component';


@Component({ //invoke with metadata object
    selector: 'project-overview',
    template: `<div class="polaroid" *ngFor="#project of projects">
                    <div class="img-container">
                         <img src="./app/images/categories/{{project.categoryNumber}}.jpg"/>
                    </div>
                    <p>{{project.town}}</p>
                    <p>{{project.name}}</p>
                </div>
                `,
    providers: [ProjectService]
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
