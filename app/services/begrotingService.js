/**
 * Created by nadya on 30/04/2016.
 */
System.register(['angular2/core', 'angular2/http', 'rxjs/Rx'], function(exports_1) {
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
    var BegrotingService;
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
            BegrotingService = (function () {
                function BegrotingService(http) {
                    this.http = http;
                    this._url = 'http://begroting-webapi.azurewebsites.net/api/Begroting';
                }
                //private _url = 'http://localhost:52597/api/Begroting';
                BegrotingService.prototype.getGemeenteCategorieen = function (jaar, naam) {
                    return this.http.get(this._url + "?jaar=" + jaar + "&naam=" + naam)
                        .map(this.extractData);
                };
                BegrotingService.prototype.getClusters = function (jaar, naam) {
                    return this.http.get(this._url + "/getClusterAverages" + "?jaar" + jaar + "$gemeenteNaam" + naam)
                        .map(this.extractData);
                };
                BegrotingService.prototype.getBegrotingen = function (naam) {
                    return this.http.get(this._url + "/getBegrotingen?naam=" + naam)
                        .map(this.extractData);
                };
                BegrotingService.prototype.getActies = function (id) {
                    return this.http.get(this._url + "?id=" + id)
                        .map(this.extractData);
                };
                BegrotingService.prototype.putCategorieInput = function (gemcats) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'));
                    return this.http.put(this._url + "/changeCatInput", JSON.stringify(gemcats), { headers: headers }).map(this.extractData);
                };
                BegrotingService.prototype.extractData = function (res) {
                    if (res.status < 200 || res.status >= 300) {
                        throw new Error('Response status: ' + res.status);
                    }
                    return res.json();
                };
                BegrotingService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], BegrotingService);
                return BegrotingService;
            })();
            exports_1("BegrotingService", BegrotingService);
        }
    }
});
//# sourceMappingURL=begrotingService.js.map