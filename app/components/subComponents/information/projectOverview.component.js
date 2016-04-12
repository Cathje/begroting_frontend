System.register(['angular2/core', 'angular2/router', './../../../services/projectService.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
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
            })();
            exports_1("ProjectOverviewComponent", ProjectOverviewComponent);
        }
    }
});
//# sourceMappingURL=projectOverview.component.js.map