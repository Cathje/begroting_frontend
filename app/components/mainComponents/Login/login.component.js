System.register(['angular2/core', 'angular2/router', "../../../services/townService.component", "../../../services/loginService.component", "../../../models/mainTown", "../../../models/inTeLoggenGebruiker"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, townService_component_1, loginService_component_1, mainTown_1, inTeLoggenGebruiker_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (townService_component_1_1) {
                townService_component_1 = townService_component_1_1;
            },
            function (loginService_component_1_1) {
                loginService_component_1 = loginService_component_1_1;
            },
            function (mainTown_1_1) {
                mainTown_1 = mainTown_1_1;
            },
            function (inTeLoggenGebruiker_1_1) {
                inTeLoggenGebruiker_1 = inTeLoggenGebruiker_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(_loginService, _townService, _router) {
                    var _this = this;
                    this._loginService = _loginService;
                    this._townService = _townService;
                    this._router = _router;
                    this.title = 'Login';
                    this.inTeLoggenGebruiker = new inTeLoggenGebruiker_1.InTeLoggenGebruiker("", "", "", "", "");
                    this.selectedTown = new mainTown_1.MainTown("Berchem", "2600", 0, 0);
                    this.token = "";
                    _townService.getTowns()
                        .subscribe(function (towns) { return _this.towns = towns; });
                    this.newUser = sessionStorage.getItem("newUser");
                    if (this.newUser) {
                        sessionStorage.removeItem("newUser");
                    }
                }
                LoginComponent.prototype.onSubmit = function () {
                    var _this = this;
                    this.err = "";
                    this.newUser = "";
                    this._loginService.login(this.inTeLoggenGebruiker.email, this.inTeLoggenGebruiker.Password).subscribe(function (data) { return _this.goToHome(data); }, function (err) { return _this.err = err; });
                };
                LoginComponent.prototype.goToHome = function (data) {
                    if (data != null) {
                        this.t = JSON.parse(data);
                        sessionStorage.setItem('access_token', this.t.access_token);
                        sessionStorage.setItem('gemeente', this.t.gemeente);
                        sessionStorage.setItem('role', this.t.role);
                        sessionStorage.setItem('user', this.t.userName);
                        sessionStorage.setItem('token', data);
                        sessionStorage.setItem('naam', this.t.naam);
                        this._router.navigate(['/', 'App', { town: this.t.gemeente }, 'Budget']);
                    }
                };
                LoginComponent.prototype.onSelect = function (event) {
                    // alert(event.target.value)
                    this.inTeLoggenGebruiker.gemeente = event.target.value;
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'main-container',
                        template: "\n        <townMenu></townMenu>\n\n        <div *ngIf=\"newUser\" class=\"alert alert-info\" style=\"text-align: center; margin: 5em\">\n             U heeft zich correct geregistreerd. U kan nu aanmelden met uw emailadres en uw wachtwoord.\n        </div>\n        <div class=\"col-md-6\" align=\"center\">\n            <h2 class=\"form-login-heading\">Login</h2>\n            <input type=\"email\" [(ngModel)]=\"inTeLoggenGebruiker.email\" class=\"form-control\" placeholder=\"Email\" required autofocus><br>\n            <input type=\"password\" [(ngModel)]=\"inTeLoggenGebruiker.Password\" class=\"form-control\" placeholder=\"Wachtwoord\" required><br>\n\n            <br>\n\n            <button (click)=\"onSubmit()\" class=\"btn btn-md btn-info btn-block\">login</button>\n\n\n            <div *ngIf=\"err\" class=\"alert alert-danger\">\n                oeps login is niet gelukt. Controleer email en paswoord\n            </div>\n\n\n\n           \n        </div>\n\n        <div class=\"col-md-6\" align=\"center\">\n            <h2 class=\"form-login-heading\">Social Logins</h2>\n            <button class=\"btn btn-large btn-facebook btn-block\" type=\"button\" (click)=\"authExternalProvider('Facebook')\"><i class=\"fa fa-facebook\"></i> | Connect with Facebook</button>\n            <button class=\"btn btn-large btn-google-plus btn-block\" type=\"button\" (click)=\"authExternalProvider('Google')\"><i class=\"fa fa-google-plus\"></i> | Connect with Google+</button>\n\n        </div>\n\n\n",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [loginService_component_1.LoginService, townService_component_1.TownService
                        ],
                        styles: ["\n\n    .form-login {\n    max-width: 330px;\n    padding: 0px 15px 5px 15px;\n    margin: 0 auto;\n}\n\n    .form-login .form-login-heading {\n        margin-bottom: 10px;\n    }\n\n    .form-login .form-control {\n        position: relative;\n        height: auto;\n        -webkit-box-sizing: border-box;\n        -moz-box-sizing: border-box;\n        box-sizing: border-box;\n        padding: 10px;\n        font-size: 16px;\n    }\n\n        .form-login .form-control:focus {\n            z-index: 2;\n        }\n\n    .form-login input[type=\"password\"] {\n        margin-top:5px;\n        margin-bottom: 5px;\n        border-top-left-radius: 0;\n        border-top-right-radius: 0;\n    }\n\n\n    .btn-facebook {\n  color: #ffffff;\n  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);\n  background-color: #2b4b90;\n  *background-color: #133783;\n  background-image: -moz-linear-gradient(top, #3b5998, #133783);\n  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#3b5998), to(#133783));\n  background-image: -webkit-linear-gradient(top, #3b5998, #133783);\n  background-image: -o-linear-gradient(top, #3b5998, #133783);\n  background-image: linear-gradient(to bottom, #3b5998, #133783);\n  background-repeat: repeat-x;\n  border-color: #133783 #133783 #091b40;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff3b5998', endColorstr='#ff133783', GradientType=0);\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);\n}\n\n.btn-facebook:hover,\n.btn-facebook:focus,\n.btn-facebook:active,\n.btn-facebook.active,\n.btn-facebook.disabled,\n.btn-facebook[disabled] {\n  color: #ffffff;\n  background-color: #133783;\n  *background-color: #102e6d;\n}\n\n.btn-facebook:active,\n.btn-facebook.active {\n  background-color: #0d2456 9;\n}\n\n    .btn-google-plus {\n  color: #ffffff;\n  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);\n  background-color: #d34332;\n  *background-color: #c53727;\n  background-image: -moz-linear-gradient(top, #dd4b39, #c53727);\n  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#dd4b39), to(#c53727));\n  background-image: -webkit-linear-gradient(top, #dd4b39, #c53727);\n  background-image: -o-linear-gradient(top, #dd4b39, #c53727);\n  background-image: linear-gradient(to bottom, #dd4b39, #c53727);\n  background-repeat: repeat-x;\n  border-color: #c53727 #c53727 #85251a;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffdd4b39', endColorstr='#ffc53727', GradientType=0);\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);\n}\n\n.btn-google-plus:hover,\n.btn-google-plus:focus,\n.btn-google-plus:active,\n.btn-google-plus.active,\n.btn-google-plus.disabled,\n.btn-google-plus[disabled] {\n  color: #ffffff;\n  background-color: #c53727;\n  *background-color: #b03123;\n}\n\n.btn-google-plus:active,\n.btn-google-plus.active {\n  background-color: #9a2b1f 9;\n}\n\n\n"]
                    }), 
                    __metadata('design:paramtypes', [loginService_component_1.LoginService, townService_component_1.TownService, router_1.Router])
                ], LoginComponent);
                return LoginComponent;
            })();
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map