System.register(['angular2/core', 'angular2/http', 'rxjs/Rx', "angular2/http"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, http_2;
    var LoginService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (http_2_1) {
                http_2 = http_2_1;
            }],
        execute: function() {
            LoginService = (function () {
                function LoginService(http) {
                    this.http = http;
                    this._url = 'http://begroting-webapi.azurewebsites.net/api/Account/Register';
                    //private _url = 'http://localhost:52597/api/Account/Register';
                    this._url2 = 'http://begroting-webapi.azurewebsites.net/token';
                    this.token = localStorage.getItem('token');
                }
                //private _url2 = 'http://localhost:52597/token';
                //@TODO test nog te verwijderen
                // private _url = 'http://ngauthenticationapi.azurewebsites.net/token';
                LoginService.prototype.login = function (email, password) {
                    var _this = this;
                    return this.http.post(this._url2, "grant_type=password&username=" + email + "&password=" + password, {
                        headers: new http_2.Headers({
                            'Content-Type': 'application/x-www-form-urlencoded'
                        })
                    })
                        .map(function (res) {
                        var data = res.text;
                        _this.token = data.access_token;
                        localStorage.setItem('token', _this.token);
                    });
                };
                LoginService.prototype.register = function (gebruiker) {
                    var header = new http_2.Headers();
                    header.append("Content-Type", "application/json");
                    return this.http.post(this._url, JSON.stringify(gebruiker), { headers: header }).map(function (res) { return res.json(); });
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