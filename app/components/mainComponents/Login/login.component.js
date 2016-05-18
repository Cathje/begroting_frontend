System.register(['angular2/core', 'angular2/router', "../../../services/townService.component", "../../../services/loginService.component", "../../../models/ingelogdeGebruiker", "../../../models/mainTown"], function(exports_1) {
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
    var core_1, router_1, townService_component_1, loginService_component_1, ingelogdeGebruiker_1, mainTown_1;
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
            function (ingelogdeGebruiker_1_1) {
                ingelogdeGebruiker_1 = ingelogdeGebruiker_1_1;
            },
            function (mainTown_1_1) {
                mainTown_1 = mainTown_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(_loginService, _townService) {
                    var _this = this;
                    this._loginService = _loginService;
                    this._townService = _townService;
                    this.title = 'Login';
                    this.gebruiker = new ingelogdeGebruiker_1.IngelogdeGebruiker("Test", "", "", "", "");
                    this.selectedTown = new mainTown_1.MainTown("Berchem", "2600", 0, 0);
                    this.token = "test";
                    _townService.getTowns()
                        .subscribe(function (towns) { return _this.towns = towns; });
                }
                LoginComponent.prototype.onSubmit = function () {
                    this._loginService.login(this.gebruiker.email, this.gebruiker.Password).subscribe();
                };
                LoginComponent.prototype.onSelect = function (event) {
                    // alert(event.target.value)
                    this.gebruiker.gemeente = event.target.value;
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'main-container',
                        template: "\n        <townMenu></townMenu>\n        <div class=\"col-md-6\" align=\"center\">\n            <h2 class=\"form-login-heading\">Login</h2>\n            \n\n            <input type=\"email\" [(ngModel)]=\"gebruiker.email\" class=\"form-control\" placeholder=\"Email\" required autofocus><br>\n            <input type=\"text\" [(ngModel)]=\"gebruiker.Password\" class=\"form-control\" placeholder=\"Wachtwoord\" required><br>\n\n            <br>\n\n            <button (click)=\"onSubmit()\" class=\"btn btn-md btn-info btn-block\">login</button>\n\n            <!--\n            <div class=\"alert alert-danger\">\n                {{data}}\n            </div>\n            -->\n\n        </div>\n\n        <div class=\"col-md-6\" align=\"center\">\n            <h2 class=\"form-login-heading\">Social Logins</h2>\n            <p>Or you can login using one of the social logins below</p>\n\n            <button class=\"btn btn-large btn-facebook btn-block\" type=\"button\" (click)=\"authExternalProvider('Facebook')\"><i class=\"fa fa-facebook\"></i> | Connect with Facebook</button>\n            <button class=\"btn btn-large btn-google-plus btn-block\" type=\"button\" (click)=\"authExternalProvider('Google')\"><i class=\"fa fa-google-plus\"></i> | Connect with Google+</button>\n\n        </div>\n\n\n",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [loginService_component_1.LoginService, townService_component_1.TownService
                        ],
                        styles: ["\n\n    .form-login {\n    max-width: 330px;\n    padding: 0px 15px 5px 15px;\n    margin: 0 auto;\n}\n\n    .form-login .form-login-heading {\n        margin-bottom: 10px;\n    }\n\n    .form-login .form-control {\n        position: relative;\n        height: auto;\n        -webkit-box-sizing: border-box;\n        -moz-box-sizing: border-box;\n        box-sizing: border-box;\n        padding: 10px;\n        font-size: 16px;\n    }\n\n        .form-login .form-control:focus {\n            z-index: 2;\n        }\n\n    .form-login input[type=\"password\"] {\n        margin-top:5px;\n        margin-bottom: 5px;\n        border-top-left-radius: 0;\n        border-top-right-radius: 0;\n    }\n\n\n    .btn-facebook {\n  color: #ffffff;\n  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);\n  background-color: #2b4b90;\n  *background-color: #133783;\n  background-image: -moz-linear-gradient(top, #3b5998, #133783);\n  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#3b5998), to(#133783));\n  background-image: -webkit-linear-gradient(top, #3b5998, #133783);\n  background-image: -o-linear-gradient(top, #3b5998, #133783);\n  background-image: linear-gradient(to bottom, #3b5998, #133783);\n  background-repeat: repeat-x;\n  border-color: #133783 #133783 #091b40;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff3b5998', endColorstr='#ff133783', GradientType=0);\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);\n}\n\n.btn-facebook:hover,\n.btn-facebook:focus,\n.btn-facebook:active,\n.btn-facebook.active,\n.btn-facebook.disabled,\n.btn-facebook[disabled] {\n  color: #ffffff;\n  background-color: #133783;\n  *background-color: #102e6d;\n}\n\n.btn-facebook:active,\n.btn-facebook.active {\n  background-color: #0d2456 9;\n}\n\n    .btn-google-plus {\n  color: #ffffff;\n  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);\n  background-color: #d34332;\n  *background-color: #c53727;\n  background-image: -moz-linear-gradient(top, #dd4b39, #c53727);\n  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#dd4b39), to(#c53727));\n  background-image: -webkit-linear-gradient(top, #dd4b39, #c53727);\n  background-image: -o-linear-gradient(top, #dd4b39, #c53727);\n  background-image: linear-gradient(to bottom, #dd4b39, #c53727);\n  background-repeat: repeat-x;\n  border-color: #c53727 #c53727 #85251a;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffdd4b39', endColorstr='#ffc53727', GradientType=0);\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);\n}\n\n.btn-google-plus:hover,\n.btn-google-plus:focus,\n.btn-google-plus:active,\n.btn-google-plus.active,\n.btn-google-plus.disabled,\n.btn-google-plus[disabled] {\n  color: #ffffff;\n  background-color: #c53727;\n  *background-color: #b03123;\n}\n\n.btn-google-plus:active,\n.btn-google-plus.active {\n  background-color: #9a2b1f 9;\n}\n\n\n"]
                    }), 
                    __metadata('design:paramtypes', [loginService_component_1.LoginService, townService_component_1.TownService])
                ], LoginComponent);
                return LoginComponent;
            })();
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map