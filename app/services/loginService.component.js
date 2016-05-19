System.register(['angular2/core', 'angular2/http', 'rxjs/Rx'], function(exports_1) {
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
                    //private _url = 'http://begroting-webapi.azurewebsites.net/api/Account/Register';
                    this._url = 'http://localhost:52597/api/Account/Register';
                    //private _url2 = 'http://begroting-webapi.azurewebsites.net/token';
                    this._url2 = 'http://localhost:52597/token';
                }
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
                    return this.http.post(this._url, JSON.stringify(gebruiker), { headers: header }).map(function (res) { return res.json(); });
                };
                LoginService.prototype.extractData = function (res) {
                    if (res.status < 200 || res.status >= 300) {
                        throw new Error('Response status: ' + res.status);
                    }
                    var data = res.text();
                    return data;
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