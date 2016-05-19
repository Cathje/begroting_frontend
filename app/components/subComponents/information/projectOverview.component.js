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
                    //  projects = this._projectService.getProjects();
                    this.selectedTown = { 'name': 'Berchem' };
                }
                ProjectOverviewComponent = __decorate([
                    core_1.Component({
                        selector: 'project-overview',
                        template: "<div class=\"container\">\n                    <div class=\"polaroid\" *ngFor=\"#project of projects\">\n                    <div class=\"img-container\">\n                         <img src=\"/app/images/categories/{{project.categoryNumber}}.jpg\"/>\n                    </div>\n                    <p>{{project.town}}</p>\n                    <p>{{project.name}}</p>\n                </div>\n                </div>\n                ",
                        providers: [projectService_component_1.ProjectService],
                        styles: ["img:hover{\n    transform: scale(1.2);\n    transition: all 0.25s ease-in;\n\n}\n\n    .container{\n    width: 100%;\n    background-color: #2ac7d2;\n    color:white;\n    text-align: center;\n    padding-bottom: 20px;\n}\n\n\n.polaroid {\n    background-color: white;\n    color:black;\n    padding: 10px;\n    width: 250px;\n    display: inline-block;\n    text-align: center;\n    margin: 10px;\n    box-shadow: 3px 3px 3px grey;\n}\n\n.polaroid p:nth-child(2) {\n    font-weight: bold;\n    margin-bottom: 0;\n    margin-top: 5px;\n}\n\n.polaroid img {\n    width: 100%;\n    box-shadow: inset 3px 3px 3px grey;\n}\n\n.polaroid .img-container{\n    overflow:hidden;\n    width: 100%;\n    height:150px;\n}"]
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