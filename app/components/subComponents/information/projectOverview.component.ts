import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {ProjectService} from './../../../services/projectService.component';


@Component({ //invoke with metadata object
    selector: 'project-overview',
    template: `<h3>{{title}}</h3>
                <table class="table table-striped">
                    <tr *ngFor="#project of projects" >
                        <td><a href="./home/{{project.town}}/{{project.projectNumber}}">{{project.name}}</a></td>
                        <td>{{project.projectDescription}}</td>
                        <td>{{project.town}}</td>
                    </tr>
                </table>

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
