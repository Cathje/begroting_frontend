System.register(['angular2/core', './../mockData/mock-projects.js'], function(exports_1) {
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
    var core_1, mock_projects_js_1;
    var ProjectService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (mock_projects_js_1_1) {
                mock_projects_js_1 = mock_projects_js_1_1;
            }],
        execute: function() {
            ProjectService = (function () {
                function ProjectService() {
                }
                ProjectService.prototype.getProjects = function () {
                    return mock_projects_js_1.PROJECTS;
                };
                ProjectService.prototype.getProject = function (number) {
                    return mock_projects_js_1.PROJECTS[number];
                };
                ProjectService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ProjectService);
                return ProjectService;
            })();
            exports_1("ProjectService", ProjectService);
        }
    }
});
//# sourceMappingURL=projectService.component.js.map