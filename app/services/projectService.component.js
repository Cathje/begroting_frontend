System.register(['angular2/core', 'angular2/http', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, http_1;
    var ProjectService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            ProjectService = (function () {
                function ProjectService(http) {
                    this.http = http;
                    this._url = 'http://begroting-webapi.azurewebsites.net/api/Begroting';
                    this._url2 = 'http://begroting-webapi.azurewebsites.net/api/Project';
                }
                // private _url = 'http://localhost:52597/api/Begroting';
                //private _url2 = 'http://localhost:52597/api/Project';
                ProjectService.prototype.getInspraakitems = function (jaar, naam) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'));
                    return this.http.get(this._url2 + "/itemsGET" + "?jaar=" + jaar + "&naam=" + naam, { headers: headers })
                        .map(this.extractData);
                };
                ProjectService.prototype.postProject = function (p) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'));
                    return this.http.post(this._url2 + "/postProject", JSON.stringify({ projectScenario: p.projectScenario, vraag: p.vraag,
                        titel: p.titel, extraInfo: p.extraInfo, bedrag: p.bedrag, minBedrag: p.minBedrag, maxBedrag: p.maxBedrag, cats: p.cats, boekjaar: p.boekjaar, gemeente: p.gemeente,
                        isActief: p.isActief, afbeeldingen: p.afbeelding }), { headers: headers }).map(this.extractData);
                };
                ProjectService.prototype.putProject = function (p) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'));
                    return this.http.put(this._url2 + "/updateProject/" + p.id, JSON.stringify({ projectScenario: p.projectScenario, vraag: p.vraag,
                        titel: p.titel, extraInfo: p.extraInfo, bedrag: p.bedrag, minBedrag: p.minBedrag, maxBedrag: p.maxBedrag, cats: p.cats, boekjaar: p.boekjaar, gemeente: p.gemeente,
                        isActief: p.isActief, afbeeldingen: p.afbeelding }), { headers: headers }).map(this.extractData);
                };
                ProjectService.prototype.postBegrotingsVoorstel = function (projectId, voorstel) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'));
                    return this.http.post(this._url2 + "/postVoorstel/" + projectId, JSON.stringify(voorstel), { headers: headers }).map(this.extractData);
                };
                ProjectService.prototype.getProject = function (jaar, naam) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'));
                    return this.http.get(this._url2 + "/projectGET" + "?jaar=" + jaar + "&naam=" + naam, { headers: headers })
                        .map(this.extractData);
                };
                ProjectService.prototype.putVoorstelStatus = function (voorstelId, status) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'));
                    return this.http.put(this._url2 + "/putVoorstelStatus/" + voorstelId, JSON.stringify(status), { headers: headers }).map(this.extractData);
                };
                ProjectService.prototype.putStem = function (voorstelId, email) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'));
                    return this.http.put(this._url2 + "/putStem/" + voorstelId, JSON.stringify(email), { headers: headers }).map(this.extractData);
                };
                ProjectService.prototype.postReactie = function (voorstelId, reactie) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'));
                    return this.http.post(this._url2 + "/postReactie/" + voorstelId, JSON.stringify(reactie), { headers: headers }).map(this.extractData);
                };
                ProjectService.prototype.getProjects = function (naam) {
                    return this.http.get(this._url2 + "?naam=" + naam)
                        .map(this.extractData);
                };
                ProjectService.prototype.extractData = function (res) {
                    if (res.status < 200 || res.status >= 300) {
                        throw new Error('Response status: ' + res.status);
                    }
                    return res.json();
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