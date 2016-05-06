import {Component} from 'angular2/core';
import {ProjectService} from './../../services/projectService.component';
import {RouteParams} from 'angular2/router';

@Component({ //invoke with metadata object
    selector: 'project-container',
    template: `<h2>Project {{name}}</h2>`,
    providers: [ProjectService],
})

export class ProjectComponent {
    title = 'Project';
    name='';
    constructor(
    private _projectService: ProjectService,
    private _routeParams: RouteParams) {
    }

    ngOnInit() {
        var number = this._routeParams.get('projectNumber');
       this.name = this._projectService.getProject(number).name;
    }
}