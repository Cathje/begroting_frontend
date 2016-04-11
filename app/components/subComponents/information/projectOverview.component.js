System.register(['angular2/core', 'angular2/router', './../../../services/projectService.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, projectService_component_1;
    var ProjectOverviewComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (projectService_component_1_1) {
                projectService_component_1 = projectService_component_1_1;
            }],
        execute: function() {
            ProjectOverviewComponent = (function () {
                function ProjectOverviewComponent(_router, _projectService) {
                    this._router = _router;
                    this._projectService = _projectService;
                    this.title = 'Overzicht projecten';
                    this.projects = this._projectService.getProjects();
                    this.selectedTown = { 'name': 'Berchem' };
                }
                ProjectOverviewComponent = __decorate([
                    core_1.Component({
                        selector: 'project-overview',
                        template: "<h3>{{title}}</h3>\n                <table class=\"table table-striped\">\n                    <tr *ngFor=\"#project of projects\" >\n                        <td><a href=\"./home/{{project.town}}/{{project.projectNumber}}\">{{project.name}}</a></td>\n                        <td>{{project.projectDescription}}</td>\n                        <td>{{project.town}}</td>\n                    </tr>\n                </table>\n\n                ",
                        providers: [projectService_component_1.ProjectService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, projectService_component_1.ProjectService])
                ], ProjectOverviewComponent);
                return ProjectOverviewComponent;
            }());
            exports_1("ProjectOverviewComponent", ProjectOverviewComponent);
        }
    }
});
//# sourceMappingURL=projectOverview.component.js.map