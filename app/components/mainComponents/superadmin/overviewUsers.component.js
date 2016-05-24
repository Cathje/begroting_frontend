System.register(['angular2/core', 'angular2/router', "../../../services/townService.component", "../../../services/loginService.component", "../../../models/mainTown", "../../../models/ingelogdeGebruiker", "../../../pipes/keysPipe", "../../../models/rolType", '../../../directives/styled'], function(exports_1, context_1) {
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
    var core_1, router_1, townService_component_1, loginService_component_1, mainTown_1, ingelogdeGebruiker_1, keysPipe_1, rolType_1, styled_1;
    var OverviewUsersComponent;
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
            function (ingelogdeGebruiker_1_1) {
                ingelogdeGebruiker_1 = ingelogdeGebruiker_1_1;
            },
            function (keysPipe_1_1) {
                keysPipe_1 = keysPipe_1_1;
            },
            function (rolType_1_1) {
                rolType_1 = rolType_1_1;
            },
            function (styled_1_1) {
                styled_1 = styled_1_1;
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
                    this.gebruikers = [];
                    this.gewijzigdeGebruikers = [];
                    this.filterGebruikers = [];
                    this.g = new ingelogdeGebruiker_1.IngelogdeGebruiker("", "", "", rolType_1.rolType.admin, false);
                    _townService.getTown(injector.parent.parent.get(router_1.RouteParams).get('town'))
                        .subscribe(function (town) { return _this.mainTown = town; }, function (err) { return _this.errorMessage = err; });
                    _loginService.getGebruikers(injector.parent.parent.get(router_1.RouteParams).get('town')).subscribe(function (gebrs) { return _this.gebruikers = gebrs; }, function (err) { return _this.errorMessage = err; });
                    this.rolTypes = rolType_1.rolType;
                }
                OverviewUsersComponent.prototype.onSelectRolType = function (event, i) {
                    var _this = this;
                    this.filterGebruikers = this.gewijzigdeGebruikers.filter(function (g) { return g.userId === _this.gebruikers[i].userId; });
                    this.gebruikers[i].rolType = event.target.value;
                    if (this.filterGebruikers.length == 0) {
                        this.g = new ingelogdeGebruiker_1.IngelogdeGebruiker(this.gebruikers[i].userId, this.gebruikers[i].naam, this.gebruikers[i].gemeente, this.gebruikers[i].rolType, this.gebruikers[i].isActief);
                        this.gewijzigdeGebruikers.push(this.g);
                    }
                    else {
                        this.filterGebruikers[0].rolType = event.target.value;
                    }
                };
                OverviewUsersComponent.prototype.onChange = function (event, i) {
                    var _this = this;
                    this.filterGebruikers = this.gewijzigdeGebruikers.filter(function (g) { return g.userId === _this.gebruikers[i].userId; });
                    this.gebruikers[i].isActief = event.target.checked;
                    if (this.filterGebruikers.length == 0) {
                        this.gewijzigdeGebruikers.push(new ingelogdeGebruiker_1.IngelogdeGebruiker(this.gebruikers[i].userId, this.gebruikers[i].naam, this.gebruikers[i].gemeente, this.gebruikers[i].rolType, this.gebruikers[i].isActief));
                    }
                    else {
                        this.filterGebruikers[0].isActief = event.target.checked;
                    }
                };
                OverviewUsersComponent.prototype.submit = function () {
                    var _this = this;
                    this._loginService.putGebruikers(this.gewijzigdeGebruikers).subscribe(function (d) { return _this.data = d; }, function (err) { return _this.errorMessage = err; });
                    this._router.navigate(['/', 'App', 'Budget', { town: this.mainTown.naam }]);
                };
                OverviewUsersComponent = __decorate([
                    core_1.Component({
                        selector: 'overview-users-container',
                        template: "\n    <p class=\"alert alert-danger\" *ngIf=\"errorMessage\">Geen gebruikers gevonden voor deze gemeente</p>\n    <section class=\"container\">\n    <h1>Overzicht gebruikers</h1>\n    <section class=\"col-xs-12\">\n        <div class=\"section-content\">\n        <table class=\"table table-striped\">\n            <thead>\n            <tr>\n                <th>Naam</th>\n                <th>E-mail</th>\n                <th>Huidige Rol</th>\n                <th>Nieuwe Rol</th>\n                <th>Actief?</th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr *ngFor=\"#gebruiker of gebruikers #i=index\">\n                <td>{{gebruiker.naam}}</td>\n                <td>{{gebruiker.userId}}</td>\n                <td>{{rolTypes[gebruiker.rolType]}}</td>\n                <td>\n                <select (change)=\"onSelectRolType($event, i)\">\n                    <option selected disabled></option>\n                    <option *ngFor=\"#rol of rolTypes | keys\" [value]=\"rol.key\">{{rol.value}}</option>\n                </select>\n                </td>\n                <td>\n                <input type=\"checkbox\" [ngModel]=gebruiker.isActief (change)=\"onChange($event, i)\">\n                </td>\n            </tr>\n            </tbody>\n        </table>\n\n\n        </div>\n    </section>\n\n        <button class=\"btn btn-primary pull-right\" (click)=\"submit()\" styled>opslaan</button>\n</section>\n",
                        providers: [townService_component_1.TownService, loginService_component_1.LoginService],
                        pipes: [keysPipe_1.KeysPipe],
                        directives: [router_1.ROUTER_DIRECTIVES, styled_1.StyledDirective],
                        styles: ["\n\n    label{\n        text-align: left;\n        width: 120px;\n        background-color:white;\n    }\n    section div {\n        padding: 5px;\n        box-sizing: border-box;\n    }\n\n    .input-group {\n        float: left;\n        box-sizing: border-box;\n    }\n\n    li {\n        list-style: none;\n        margin-bottom: 10px;\n    }\n\n    .form-inline:nth-child(2) {\n        border-top: 1px dashed lightgray;\n    }\n\n    section .section-content {\n        border: 1px solid lightgray;\n        margin-bottom: 20px;\n        padding: 20px;\n        overflow: auto;\n    }\n\n    textarea {\n        width: 100% !important;\n    }\n\n    "]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, townService_component_1.TownService, loginService_component_1.LoginService, router_1.Router, router_1.RouteParams, core_1.Injector])
                ], OverviewUsersComponent);
                return OverviewUsersComponent;
            }());
            exports_1("OverviewUsersComponent", OverviewUsersComponent);
        }
    }
});
//# sourceMappingURL=overviewUsers.component.js.map