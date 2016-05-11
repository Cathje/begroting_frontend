System.register(['angular2/core', 'angular2/http', 'rxjs/Rx', "../mockData/mock-projects"], function(exports_1, context_1) {
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
    var core_1, http_1, mock_projects_1;
    var ProjectService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (mock_projects_1_1) {
                mock_projects_1 = mock_projects_1_1;
            }],
        execute: function() {
            ProjectService = (function () {
                function ProjectService(http) {
                    this.http = http;
                    //private _url = 'http://begroting-webapi.azurewebsites.net/api/Begroting';
                    //private _url2 = 'http://begroting-webapi.azurewebsites.net/api/Project';
                    this._url = 'http://localhost:52597/api/Begroting';
                    this._url2 = 'http://localhost:52597/api/Project';
                }
                ProjectService.prototype.getInspraakcategorieen = function (jaar, naam) {
                    return this.http.get(this._url + "?jaar=" + jaar + "&naam=" + naam)
                        .map(function (res) { return res.json(); });
                };
                ProjectService.prototype.putProject = function (p, cats) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this.http.post(this._url2, JSON.stringify({ projectScenario: p.projectScenario, vraag: p.vraag,
                        titel: p.titel, extraInfo: p.extraInfo, bedrag: p.bedrag, minBedrag: p.minBedrag, maxBedrag: p.maxBedrag, cats: cats }), { headers: headers }).map(function (res) { return res.json(); });
                };
                ProjectService.prototype.getProjects = function () {
                    return mock_projects_1.PROJECTS;
                };
                ProjectService.prototype.getProject = function (number) {
                    return mock_projects_1.PROJECTS[number];
                };
                ProjectService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], ProjectService);
                return ProjectService;
            }());
            exports_1("ProjectService", ProjectService);
        }
    }
});
//# sourceMappingURL=projectService.component.js.map