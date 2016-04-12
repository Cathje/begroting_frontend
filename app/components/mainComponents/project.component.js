System.register(['angular2/core', './../../services/projectService.component', 'angular2/router'], function(exports_1) {
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
    var core_1, projectService_component_1, router_1;
    var ProjectComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (projectService_component_1_1) {
                projectService_component_1 = projectService_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            ProjectComponent = (function () {
                function ProjectComponent(_projectService, _routeParams) {
                    this._projectService = _projectService;
                    this._routeParams = _routeParams;
                    this.title = 'Project';
                    this.name = '';
                }
                ProjectComponent.prototype.ngOnInit = function () {
                    var number = this._routeParams.get('projectNumber');
                    this.name = this._projectService.getProject(number).name;
                };
                ProjectComponent = __decorate([
                    core_1.Component({
                        selector: 'project-container',
                        template: "<h2>Project {{name}}</h2>",
                        providers: [projectService_component_1.ProjectService]
                    }), 
                    __metadata('design:paramtypes', [projectService_component_1.ProjectService, router_1.RouteParams])
                ], ProjectComponent);
                return ProjectComponent;
            })();
            exports_1("ProjectComponent", ProjectComponent);
        }
    }
});
//# sourceMappingURL=project.component.js.map