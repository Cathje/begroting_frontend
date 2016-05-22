System.register(['angular2/core', 'angular2/router', "../../subComponents/input/townSelector.component", "../../../services/townService.component", "../../../services/loginService.component", "../../../models/mainTown", "../../../pipes/keysPipe", "../../../models/rolType"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, townSelector_component_1, townService_component_1, loginService_component_1, mainTown_1, keysPipe_1, rolType_1;
    var OverviewUsersComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (townSelector_component_1_1) {
                townSelector_component_1 = townSelector_component_1_1;
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
            function (keysPipe_1_1) {
                keysPipe_1 = keysPipe_1_1;
            },
            function (rolType_1_1) {
                rolType_1 = rolType_1_1;
            }],
        execute: function() {
            OverviewUsersComponent = (function () {
                function OverviewUsersComponent(_routeParams, _townService, _loginService, _router, params, injector) {
                    var _this = this;
                    this._routeParams = _routeParams;
                    this._townService = _townService;
                    this._loginService = _loginService;
                    this._router = _router;
                    this.mainTown = new mainTown_1.MainTown("", "", 0, 0);
                    this.rolTypes = rolType_1.rolType;
                    this.gebruikers = [];
                    this.gebruikersOrigineel = [];
                    _townService.getTown(injector.parent.parent.get(router_1.RouteParams).get('town'))
                        .subscribe(function (town) { return _this.mainTown = town; }, function (err) { return _this.errorMessage = err; });
                    _loginService.getGebruikers(injector.parent.parent.get(router_1.RouteParams).get('town')).subscribe(function (gebrs) { return _this.gebruikers = gebrs; }, function (err) { return _this.errorMessage = err; });
                }
                OverviewUsersComponent.prototype.onSelectRolType = function (event, i) {
                    this.gebruikers[i].rolType = event.target.value;
                };
                OverviewUsersComponent.prototype.submit = function () {
                    this._loginService.putGebruikers().subscribe(); // nog aan te passen
                    this._router.navigate(['/', 'App', 'Budget', { town: this.mainTown.naam }]);
                };
                OverviewUsersComponent = __decorate([
                    core_1.Component({
                        selector: 'overview-users-container',
                        template: "\n    <p *ngIf=\"errorMessage\">Geen gebruikers gevonden voor deze gemeente</p>\n    <section class=\"container\" *ngIf=\"!errorMessage\">\n    <h1>Overzicht gebruikers</h1>\n    <section class=\"col-xs-12\">\n        <div class=\"section-content\">\n        <p *ngIf=\"!gebruikers\"><i>Er zijn geen gebruikers gevonden</i></p>\n\n        <table class=\"table table-striped\">\n            <thead>\n            <tr>\n                <th>Naam</th>\n                <th>E-mail</th>\n                <th>Rol</th>\n                <th>Actief?</th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr *ngFor=\"#gebruiker of gebruikers #i=index\">\n                <td>{{gebruiker.naam}}</td>\n                <td>{{gebruiker.email}}</td>\n                <td>\n                <select (change)=\"onSelectRolType($event, i)\">\n                    <option *ngFor=\"#rol of rolTypes | keys\" [value]=\"rol.key\">{{rol.value}}</option>\n                </select>\n                </td>\n                <td>\n                <input type=\"checkbox\" [ngModel]=gebruiker.isActief checked={{gebruiker.isActief}}>\n                </td>\n            </tr>\n            </tbody>\n        </table>\n\n\n        </div>\n    </section>\n\n        <button class=\"btn btn-primary pull-right\" (click)=\"submit()\">opslaan</button>\n</section>\n",
                        providers: [townService_component_1.TownService, loginService_component_1.LoginService],
                        pipes: [keysPipe_1.KeysPipe],
                        directives: [router_1.ROUTER_DIRECTIVES, townSelector_component_1.TownSelectorComponent],
                        styles: ["\n\n    label{\n        text-align: left;\n        width: 120px;\n        background-color:white;\n    }\n    section div {\n        padding: 5px;\n        box-sizing: border-box;\n    }\n\n    .input-group {\n        float: left;\n        box-sizing: border-box;\n    }\n\n    li {\n        list-style: none;\n        margin-bottom: 10px;\n    }\n\n    .form-inline:nth-child(2) {\n        border-top: 1px dashed lightgray;\n    }\n\n    section .section-content {\n        border: 1px solid lightgray;\n        margin-bottom: 20px;\n        padding: 20px;\n        overflow: auto;\n    }\n\n    textarea {\n        width: 100% !important;\n    }\n\n    "]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, townService_component_1.TownService, loginService_component_1.LoginService, router_1.Router, router_1.RouteParams, core_1.Injector])
                ], OverviewUsersComponent);
                return OverviewUsersComponent;
            })();
            exports_1("OverviewUsersComponent", OverviewUsersComponent);
        }
    }
});
//# sourceMappingURL=overviewUsers.component.js.map