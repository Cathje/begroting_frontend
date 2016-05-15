System.register(['angular2/core', 'angular2/http', 'rxjs/observable.js', 'rxjs/Rx', "../mockData/mock-towns.js", "../mockData/mock-catDTO.js"], function(exports_1, context_1) {
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
    var core_1, http_1, observable_js_1, mock_towns_js_1, mock_catDTO_js_1;
    var TownService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (observable_js_1_1) {
                observable_js_1 = observable_js_1_1;
            },
            function (_1) {},
            function (mock_towns_js_1_1) {
                mock_towns_js_1 = mock_towns_js_1_1;
            },
            function (mock_catDTO_js_1_1) {
                mock_catDTO_js_1 = mock_catDTO_js_1_1;
            }],
        execute: function() {
            TownService = (function () {
                function TownService(http) {
                    this.http = http;
                    this._url = 'http://begroting-webapi.azurewebsites.net/api/Gemeente';
                }
                //private _url = 'http://localhost:52597/api/Gemeente';
                TownService.prototype.getTowns = function () {
                    return this.http.get(this._url)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                //ophalen van 1 hoofdGemeente
                TownService.prototype.getTown = function (naam) {
                    return this.http.get(this._url + "?naam=" + naam)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                TownService.prototype.putTown = function (maintown) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this.http.put(this._url, JSON.stringify(maintown), { headers: headers }).map(function (res) { return res.json(); });
                };
                TownService.prototype.deleteBestuurslid = function (id) {
                    return this.http.delete(this._url + "?id=" + id)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                TownService.prototype.handleError = function (error) {
                    console.error(error);
                    return observable_js_1.Observable.throw(error.json().error || 'server error');
                };
                TownService.prototype.getTownsHC = function () {
                    return mock_towns_js_1.TOWNS;
                };
                TownService.prototype.getTownHC = function (name) {
                    for (var i = 0; i < mock_towns_js_1.TOWNS.length; i++) {
                        if (mock_towns_js_1.TOWNS[i].naam == name) {
                            return mock_towns_js_1.TOWNS[i];
                        }
                    }
                };
                TownService.prototype.getCatDataHC = function () {
                    return mock_catDTO_js_1.CATS;
                };
                TownService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], TownService);
                return TownService;
            }());
            exports_1("TownService", TownService);
        }
    }
});
//# sourceMappingURL=townService.component.js.map