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
    var LoginService;
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
            LoginService = (function () {
                function LoginService(http) {
                    this.http = http;
                    this._url = 'http://begroting-webapi.azurewebsites.net/api/Account';
                    //private _url = 'http://localhost:52597/api/Account';
                    this._url2 = 'http://begroting-webapi.azurewebsites.net/token';
                }
                //private _url2 = 'http://localhost:52597/token';
                LoginService.prototype.login = function (email, password) {
                    return this.http.post(this._url2, "grant_type=password&username=" + email + "&password=" + password, {
                        headers: new http_1.Headers({
                            'Content-Type': 'application/x-www-form-urlencoded'
                        })
                    })
                        .map(this.extractData);
                };
                LoginService.prototype.register = function (gebruiker) {
                    var header = new http_1.Headers();
                    header.append("Content-Type", "application/json");
                    return this.http.post(this._url + "/Register", JSON.stringify(gebruiker), { headers: header }).map(this.extractData);
                };
                LoginService.prototype.extractData = function (res) {
                    if (res.status < 200 || res.status >= 300) {
                        throw new Error('Response status: ' + res.status);
                    }
                    var data = res.text();
                    return data;
                };
                LoginService.prototype.extractDataAsJson = function (res) {
                    if (res.status < 200 || res.status >= 300) {
                        throw new Error('Response status: ' + res.status);
                    }
                    var data = res.json();
                    return data;
                };
                LoginService.prototype.getGebruikers = function (gemeente) {
                    return this.http.get(this._url + "/GetGebruikers?gemeente=" + gemeente)
                        .map(this.extractDataAsJson);
                };
                LoginService.prototype.putGebruikers = function (gebruikers) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this.http.put(this._url, JSON.stringify(gebruikers), { headers: headers }).map(this.extractDataAsJson);
                };
                LoginService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], LoginService);
                return LoginService;
            })();
            exports_1("LoginService", LoginService);
        }
    }
});
//# sourceMappingURL=loginService.component.js.map