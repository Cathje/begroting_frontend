System.register(['angular2/core', 'angular2/router', "../../../services/loginService.component", "../../../models/mainTown", "../../../services/townService.component", "../../../models/inTeLoggenGebruiker"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, loginService_component_1, mainTown_1, townService_component_1, inTeLoggenGebruiker_1;
    var RegisterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (loginService_component_1_1) {
                loginService_component_1 = loginService_component_1_1;
            },
            function (mainTown_1_1) {
                mainTown_1 = mainTown_1_1;
            },
            function (townService_component_1_1) {
                townService_component_1 = townService_component_1_1;
            },
            function (inTeLoggenGebruiker_1_1) {
                inTeLoggenGebruiker_1 = inTeLoggenGebruiker_1_1;
            }],
        execute: function() {
            RegisterComponent = (function () {
                function RegisterComponent(_loginService, _townService, _router) {
                    var _this = this;
                    this._loginService = _loginService;
                    this._townService = _townService;
                    this._router = _router;
                    this.title = 'Register';
                    this.gebruiker = new inTeLoggenGebruiker_1.InTeLoggenGebruiker("", "", "", "", "");
                    this.selectedTown = new mainTown_1.MainTown("Berchem", "2600", 0, 0);
                    this.token = "test";
                    _townService.getTowns()
                        .subscribe(function (towns) { return _this.towns = towns; });
                }
                RegisterComponent.prototype.onSubmit = function () {
                    var _this = this;
                    this.err = "";
                    this._loginService.register(this.gebruiker).subscribe(function (data) { return _this.goToLogin(data); }, function (err) { return _this.err = err; });
                };
                RegisterComponent.prototype.goToLogin = function (data) {
                    if (data != null) {
                        sessionStorage.setItem("newUser", "yes");
                        this._router.navigate(['/', 'App', 'Login']);
                    }
                };
                RegisterComponent.prototype.onSelect = function (event) {
                    // alert(event.target.value)
                    this.gebruiker.gemeente = event.target.value;
                };
                RegisterComponent = __decorate([
                    core_1.Component({
                        selector: 'main-container',
                        template: "\n        <townMenu></townMenu>\n        <h1>Register Pagina</h1>\n\n        <div align=\"center\">\n            \n            <p>Naam: </p>\n            <input type=\"text\" [(ngModel)]=\"gebruiker.Naam\"><br>\n            <p>Paswoord: </p>\n            <input type=\"password\" [(ngModel)]=\"gebruiker.Password\"><br>\n             <p>Bevestig Paswoord: </p>\n            <input type=\"password\" [(ngModel)]=\"gebruiker.bevestigPaswoord\"><br>\n            <p>Email: </p>\n            <input type=\"email\" [(ngModel)]=\"gebruiker.email\"><br>\n             <div class=\" styled-select slate right-align\">\n                    <select class=\"\" (change)=\"onSelect($event)\">\n                        <option>Selecteer een gemeente</option>\n                        <option *ngFor=\"#town of towns\" [value]=\"town.naam\">{{town.naam}} </option>\n                    </select>\n                </div>\n\n            <br>\n\n            <button (click)=\"onSubmit()\">Register</button>\n\n            <div *ngIf=\"err\" class=\"alert alert-danger\">\n                Registreren is niet gelukt!\n            </div>\n\n\n        </div> \n    <br><br><br>\n\n",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [loginService_component_1.LoginService, townService_component_1.TownService
                        ],
                        styles: ["\n\n\n"]
                    }), 
                    __metadata('design:paramtypes', [loginService_component_1.LoginService, townService_component_1.TownService, router_1.Router])
                ], RegisterComponent);
                return RegisterComponent;
            })();
            exports_1("RegisterComponent", RegisterComponent);
        }
    }
});
//# sourceMappingURL=register.component.js.map