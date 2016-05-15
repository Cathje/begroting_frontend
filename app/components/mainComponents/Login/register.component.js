System.register(['angular2/core', 'angular2/router', "../../../services/loginService.component.js", "../../../models/ingelogdeGebruiker.js", "../../../models/mainTown.js", "../../../services/townService.component.js"], function(exports_1) {
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
    var core_1, router_1, loginService_component_js_1, ingelogdeGebruiker_js_1, mainTown_js_1, townService_component_js_1;
    var RegisterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (loginService_component_js_1_1) {
                loginService_component_js_1 = loginService_component_js_1_1;
            },
            function (ingelogdeGebruiker_js_1_1) {
                ingelogdeGebruiker_js_1 = ingelogdeGebruiker_js_1_1;
            },
            function (mainTown_js_1_1) {
                mainTown_js_1 = mainTown_js_1_1;
            },
            function (townService_component_js_1_1) {
                townService_component_js_1 = townService_component_js_1_1;
            }],
        execute: function() {
            RegisterComponent = (function () {
                function RegisterComponent(_loginService, _townService, _router) {
                    var _this = this;
                    this._loginService = _loginService;
                    this._townService = _townService;
                    this._router = _router;
                    this.title = 'Register';
                    this.gebruiker = new ingelogdeGebruiker_js_1.IngelogdeGebruiker("Test", "", "", "", "");
                    this.selectedTown = new mainTown_js_1.MainTown("Berchem", "2600", 0, 0);
                    this.token = "test";
                    _townService.getTowns()
                        .subscribe(function (towns) { return _this.towns = towns; });
                }
                RegisterComponent.prototype.onSubmit = function () {
                    this._loginService.register(this.gebruiker).subscribe();
                    this._router.navigate(['/', 'App', 'Budget', { town: this.gebruiker.gemeente }]);
                };
                RegisterComponent.prototype.onSelect = function (event) {
                    // alert(event.target.value)
                    this.gebruiker.gemeente = event.target.value;
                };
                RegisterComponent = __decorate([
                    core_1.Component({
                        selector: 'main-container',
                        template: "\n        <townMenu></townMenu>\n        <h1>Register Pagina</h1>\n\n        <div align=\"center\">\n            \n            <p>Naam: </p>\n            <input type=\"text\" [(ngModel)]=\"gebruiker.Naam\"><br>\n            <p>Paswoord: </p>\n            <input type=\"text\" [(ngModel)]=\"gebruiker.Password\"><br>\n             <p>Bevestig Paswoord: </p>\n            <input type=\"text\" [(ngModel)]=\"gebruiker.bevestigPaswoord\"><br>\n            <p>Email: </p>\n            <input type=\"email\" [(ngModel)]=\"gebruiker.email\"><br>\n             <div class=\" styled-select slate right-align\">\n                    <select class=\"\" (change)=\"onSelect($event)\">\n                        <option>Selecteer een gemeente</option>\n                        <option *ngFor=\"#town of towns\" [value]=\"town.naam\">{{town.naam}} </option>\n                    </select>\n                </div>\n\n            <br>\n\n            <button (click)=\"onSubmit()\">Register</button>\n\n\n        </div> \n    <br><br><br>\n\n",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [loginService_component_js_1.LoginService, townService_component_js_1.TownService
                        ],
                        styles: ["\n\n\n"]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof loginService_component_js_1.LoginService !== 'undefined' && loginService_component_js_1.LoginService) === 'function' && _a) || Object, (typeof (_b = typeof townService_component_js_1.TownService !== 'undefined' && townService_component_js_1.TownService) === 'function' && _b) || Object, router_1.Router])
                ], RegisterComponent);
                return RegisterComponent;
                var _a, _b;
            })();
            exports_1("RegisterComponent", RegisterComponent);
        }
    }
});
//# sourceMappingURL=register.component.js.map