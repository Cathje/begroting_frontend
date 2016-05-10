System.register(['angular2/core', './../../services/projectService.component.js', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, projectService_component_js_1, router_1;
    var ProjectComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (projectService_component_js_1_1) {
                projectService_component_js_1 = projectService_component_js_1_1;
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
                    //var number = this._routeParams.get('projectNumber');
                    //this.name = this._projectService.getProject(number).name;
                };
                ProjectComponent = __decorate([
                    core_1.Component({
                        selector: 'project-container',
                        template: "<h2>Project {{name}}</h2>",
                        providers: [projectService_component_js_1.ProjectService],
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof projectService_component_js_1.ProjectService !== 'undefined' && projectService_component_js_1.ProjectService) === 'function' && _a) || Object, router_1.RouteParams])
                ], ProjectComponent);
                return ProjectComponent;
                var _a;
            }());
            exports_1("ProjectComponent", ProjectComponent);
        }
    }
});
//# sourceMappingURL=project.component.js.map